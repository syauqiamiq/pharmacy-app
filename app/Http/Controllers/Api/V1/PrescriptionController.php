<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Prescription\StorePrescriptionRequest;
use App\Http\Requests\Prescription\UpdatePrescriptionRequest;
use App\Http\Requests\Prescription\GetPrescriptionsRequest;
use App\Http\Resources\Prescription\PrescriptionResource;
use App\Http\Services\Prescription\PrescriptionService;
use App\Traits\ApiFormatter;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PrescriptionController extends Controller
{
    use ApiFormatter;

    private $prescriptionService;

    public function __construct(PrescriptionService $prescriptionService)
    {
        $this->prescriptionService = $prescriptionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GetPrescriptionsRequest $request)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';
            $fromDate = $request->fromDate ? $request->fromDate : null;
            $toDate = $request->toDate ? $request->toDate : null;

            $result = $this->prescriptionService->getAllPrescriptions(
                $limit,
                $search,
                $orderBy,
                $sort,
                $fromDate,
                $toDate
            );

            $formattedDatas = PrescriptionResource::collection($result);

            return $this->successResponse($formattedDatas, "success", Response::HTTP_OK, [
                "current_page" => $result->currentPage(),
                "last_page" =>  $result->lastPage(),
                "per_page" =>  $result->perPage(),
                "total" =>  $result->total(),
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display my prescriptions.
     */
    public function findMyPrescriptions(GetPrescriptionsRequest $request)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';
            $fromDate = $request->fromDate ? $request->fromDate : null;
            $toDate = $request->toDate ? $request->toDate : null;

            $result = $this->prescriptionService->findMyPrescriptions(
                Auth::user()->id,
                $limit,
                $search,
                $orderBy,
                $sort,
                $fromDate,
                $toDate
            );

            $formattedDatas = PrescriptionResource::collection($result);

            return $this->successResponse($formattedDatas, "success", Response::HTTP_OK, [
                "current_page" => $result->currentPage(),
                "last_page" =>  $result->lastPage(),
                "per_page" =>  $result->perPage(),
                "total" =>  $result->total(),
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }


        /**
     * Display my prescriptions.
     */
    public function findPrescriptionsByAnamnesisId(GetPrescriptionsRequest $request, $anamnesisId)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';
            $fromDate = $request->fromDate ? $request->fromDate : null;
            $toDate = $request->toDate ? $request->toDate : null;

            $result = $this->prescriptionService->findPrescriptionsByAnamnesisId(
                $anamnesisId,
                $limit,
                $search,
                $orderBy,
                $sort,
                $fromDate,
                $toDate
            );

            $formattedDatas = PrescriptionResource::collection($result);

            return $this->successResponse($formattedDatas, "success", Response::HTTP_OK, [
                "current_page" => $result->currentPage(),
                "last_page" =>  $result->lastPage(),
                "per_page" =>  $result->perPage(),
                "total" =>  $result->total(),
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrescriptionRequest $request)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->prescriptionService->createPrescription($validatedRequest, Auth::user()->id);

            $formattedData = new PrescriptionResource($result);

            return $this->successResponse($formattedData, "Prescription created successfully", Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $result = $this->prescriptionService->findPrescriptionById($id, Auth::user()->id);

            $formattedData = new PrescriptionResource($result);

            return $this->successResponse($formattedData, "Prescription retrieved successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrescriptionRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->prescriptionService->updatePrescription($id, $validatedRequest, Auth::user()->id);

            $formattedData = new PrescriptionResource($result);

            return $this->successResponse($formattedData, "Prescription updated successfully", Response::HTTP_OK);
        } catch (Exception $th) {
          return $this->errorResponse($th->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->prescriptionService->deletePrescription($id, Auth::user()->id);

            return $this->successResponse(null, "Prescription deleted successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
