<?php

namespace App\Http\Services\Medicine;

use App\Constants\VisitStatusConstant;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\Visit;
use App\Traits\HttpHelper;
use Exception;
use Illuminate\Support\Facades\Auth;
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
                        throw new BadRequestException('Failed to fetch medicine prices');
                    }
                    $prices = $priceResponse->json()['prices'];
                    $lastPrice = null;
                    if (count($prices) > 0) {
                        // Assuming prices are sorted by date in descending order
                        $lastPrice = array_pop($prices)['unit_price'];
                    }
                    $medicine['last_price'] = $lastPrice;
                }


                Cache::put('delta_surya_medicines', $medicines, now()->addMinutes(5));
                return $medicines;
            } else {
                throw new BadRequestException('Failed to fetch medicines');
            }
        } catch (\Throwable $th) {
            throw $th;
        }
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
                return $response->json();
            } else {
                throw new BadRequestException('Failed to fetch medicines');
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
