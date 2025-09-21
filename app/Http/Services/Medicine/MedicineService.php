<?php

namespace App\Http\Services\Medicine;

use App\Traits\HttpHelper;
use Exception;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class MedicineService
{
    use HttpHelper;
    public function __construct()
    {
        $this->setBaseUri(env('DELTA_SURYA_API_BASE_URL'));
    }

    public function getAllMedicines()
    {
        try {

            $cachedData = Cache::get("delta_surya_medicines");


            if ($cachedData) {
                return $cachedData;
            }

            $response = $this->performRequest('GET', '/api/v1/medicines', [], [
                'Authorization' => 'Bearer ' . Cache::get('delta_surya_api_token')
            ]);


            // If 401, authenticate and retry
            if ($response->status() === 401) {

                $this->authenticateDeltaSurya();
                $response = $this->performRequest('GET', '/api/v1/medicines', [], [
                    'Authorization' => 'Bearer ' . Cache::get('delta_surya_api_token')
                ]);
            }

            if ($response->status() === 200) {

                // fetch every medicine price and map for last prices
                $medicines = $response->json()['medicines'];
                foreach ($medicines as &$medicine) {
                    $priceResponse = $this->performRequest('GET', '/api/v1/medicines/' . $medicine['id'] . '/prices', [], [
                        'Authorization' => 'Bearer ' . Cache::get('delta_surya_api_token')
                    ]);
                    if ($priceResponse->status() !== 200) {
                        // Handle external API error response
                        $errorMessage = $this->extractErrorMessage($priceResponse, 'Failed to fetch medicine prices');
                        throw new BadRequestException($errorMessage);
                    }
                    $prices = $priceResponse->json()['prices'];
                    $lastPrice = null;
                    if (count($prices) > 0) {
                        $lastPrice = $this->getCurrentPrice($prices);
                    }
                    $medicine['last_price'] = $lastPrice;
                }


                Cache::put('delta_surya_medicines', $medicines, now()->addMinutes(5));
                return $medicines;
            } else {
                // Handle external API error response
                $errorMessage = $this->extractErrorMessage($response, 'Failed to fetch medicines from external API');
                throw new BadRequestException($errorMessage);
            }
        } catch (Exception $th) {
            throw $th;
        }
    }

    /**
     * Get current price based on today's date
     * Logic: Find price that covers current date, or latest price if none covers current date
     */
    private function getCurrentPrice($prices)
    {
        $today = now()->format('Y-m-d');
        $currentPrice = null;
        $latestPrice = null;
        $latestDate = null;

        foreach ($prices as $price) {
            $startDate = $price['start_date']['value'];
            $endDate = $price['end_date']['value'] ?? null;

            // Check if today falls within this price range
            if ($startDate <= $today && ($endDate === null || $endDate >= $today)) {
                $currentPrice = $price['unit_price'];
                break;
            }

            // Keep track of the latest price (fallback)
            if ($latestDate === null || $startDate > $latestDate) {
                $latestDate = $startDate;
                $latestPrice = $price['unit_price'];
            }
        }

        // Return current price if found, otherwise return latest price
        return $currentPrice ?? $latestPrice;
    }


    public function getMedicinePriceById($id)
    {
        try {
            $response = $this->performRequest('GET', '/api/v1/medicines/' . $id . '/prices', [], [
                'Authorization' => 'Bearer ' . Cache::get('delta_surya_api_token')
            ]);


            // If 401, authenticate and retry
            if ($response->status() === 401) {

                $this->authenticateDeltaSurya();
                $response = $this->performRequest('GET', '/api/v1/medicines/' . $id . '/prices', [], [
                    'Authorization' => 'Bearer ' . Cache::get('delta_surya_api_token')
                ]);
            }

            if ($response->status() === 200) {
                $data = $response->json();

                // Add current price to the response
                if (isset($data['prices']) && count($data['prices']) > 0) {
                    $data['current_price'] = $this->getCurrentPrice($data['prices']);
                } else {
                    $data['current_price'] = null;
                }

                return $data;
            } else {
                // Handle external API error response
                $errorMessage = $this->extractErrorMessage($response, 'Failed to fetch medicine prices from external API');
                throw new BadRequestException($errorMessage);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
