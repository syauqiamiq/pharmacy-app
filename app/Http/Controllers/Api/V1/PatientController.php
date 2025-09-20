<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Patient\GetPatientsRequest;
use App\Http\Requests\Patient\StorePatientRequest;
use App\Http\Requests\Patient\UpdatePatientRequest;
use App\Http\Resources\Patient\PatientResource;
use App\Http\Services\Patient\PatientService;
use App\Traits\ApiFormatter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends Controller
{
    use ApiFormatter;

    private $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    /**
     * Display a listing of patients.
     */
    public function index(GetPatientsRequest $request)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';

            $result = $this->patientService->getAllPatients(
                $limit,
                $search,
                $orderBy,
                $sort
            );

            $formattedDatas = PatientResource::collection($result);

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
     * Store a newly created patient.
     */
    public function store(StorePatientRequest $request)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->patientService->createPatient($validatedRequest);

            $formattedData = new PatientResource($result);

            return $this->successResponse($formattedData, "Patient created successfully", Response::HTTP_CREATED);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified patient.
     */
    public function show(string $id)
    {
        try {
            $result = $this->patientService->getPatientById($id);

            $formattedData = new PatientResource($result);

            return $this->successResponse($formattedData, "Patient retrieved successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified patient.
     */
    public function update(UpdatePatientRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->patientService->updatePatient($id, $validatedRequest);

            $formattedData = new PatientResource($result);

            return $this->successResponse($formattedData, "Patient updated successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified patient.
     */
    public function destroy(string $id)
    {
        try {
            $this->patientService->deletePatient($id);

            return $this->successResponse(null, "Patient deleted successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}