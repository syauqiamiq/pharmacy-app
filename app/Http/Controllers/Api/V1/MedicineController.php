<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Services\Medicine\MedicineService;
use App\Traits\ApiFormatter;
use Exception;
use Illuminate\Http\Request;
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
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    public function getMedicinePriceById($id)
    {
        try {
            $result = $this->medicineService->getMedicinePriceById($id);



            return $this->successResponse($result['prices'], "success", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }
}
