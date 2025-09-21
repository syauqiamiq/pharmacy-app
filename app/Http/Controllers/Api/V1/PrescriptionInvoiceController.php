<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PrescriptionInvoice\GetPrescriptionInvoicesRequest;
use App\Http\Requests\PrescriptionInvoice\UpdatePrescriptionInvoiceRequest;
use App\Http\Resources\PrescriptionInvoice\PrescriptionInvoiceResource;
use App\Http\Services\PrescriptionInvoice\PrescriptionInvoiceService;
use App\Traits\ApiFormatter;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class PrescriptionInvoiceController extends Controller
{
    use ApiFormatter;

    private $prescriptionInvoiceService;

    public function __construct(PrescriptionInvoiceService $prescriptionInvoiceService)
    {
        $this->prescriptionInvoiceService = $prescriptionInvoiceService;
    }


    public function index(GetPrescriptionInvoicesRequest $request)
    {
        try {
            $validatedRequest = $request->validated();

            $limit = $validatedRequest['limit'] ?? 25;
            $search = $validatedRequest['search'] ?? '';
            $orderBy = $validatedRequest['orderBy'] ?? 'id';
            $sort = $validatedRequest['sort'] ?? 'ASC';
            $fromDate = $validatedRequest['fromDate'] ?? null;
            $toDate = $validatedRequest['toDate'] ?? null;

            $result = $this->prescriptionInvoiceService->getAllPrescriptionInvoices(
                $limit,
                $search,
                $orderBy,
                $sort,
                $fromDate,
                $toDate
            );

            $formattedDatas = PrescriptionInvoiceResource::collection($result);

            return $this->successResponse($formattedDatas, "success", Response::HTTP_OK, [
                "current_page" => $result->currentPage(),
                "last_page" =>  $result->lastPage(),
                "per_page" =>  $result->perPage(),
                "total" =>  $result->total(),
            ]);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }



    public function show(string $id)
    {
        try {
            $result = $this->prescriptionInvoiceService->findPrescriptionInvoiceById($id);

            $formattedData = new PrescriptionInvoiceResource($result);

            return $this->successResponse($formattedData, "Prescription invoice retrieved successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function update(UpdatePrescriptionInvoiceRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->prescriptionInvoiceService->updatePrescriptionInvoice($id, $validatedRequest);

            $formattedData = new PrescriptionInvoiceResource($result);

            return $this->successResponse($formattedData, "Prescription invoice updated successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function destroy(string $id)
    {
        try {
            $this->prescriptionInvoiceService->deletePrescriptionInvoice($id);

            return $this->successResponse(null, "Prescription invoice deleted successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }
}
