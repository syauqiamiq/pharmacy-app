<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Services\Medicine\MedicineService;
use App\Traits\ApiFormatter;
use App\Traits\HttpHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class MedicineController extends Controller
{
    use ApiFormatter;


    private $medicineService;

    public function __construct(MedicineService $medicineService)
    {
        $this->medicineService = $medicineService;
    }
    public function getAllMedicines(Request $request)
    {
        try {


            $result = $this->medicineService->getAllMedicines();

            return $this->successResponse($result, "success", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getMedicinePriceById($id)
    {
        try {
            $result = $this->medicineService->getMedicinePriceById($id);



            return $this->successResponse($result['prices'], "success", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
