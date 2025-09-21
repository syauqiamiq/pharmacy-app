<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Doctor\GetDoctorsRequest;
use App\Http\Requests\Doctor\StoreDoctorRequest;
use App\Http\Requests\Doctor\UpdateDoctorRequest;
use App\Http\Resources\Doctor\DoctorResource;
use App\Http\Services\Doctor\DoctorService;
use App\Traits\ApiFormatter;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class DoctorController extends Controller
{
    use ApiFormatter;

    private $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(GetDoctorsRequest $request)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';

            $result = $this->doctorService->getAllDoctors(
                $limit,
                $search,
                $orderBy,
                $sort
            );

            $formattedDatas = DoctorResource::collection($result);

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

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorRequest $request)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->doctorService->createDoctor($validatedRequest);

            $formattedData = new DoctorResource($result);

            return $this->successResponse($formattedData, "Doctor created successfully", Response::HTTP_CREATED);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $result = $this->doctorService->getDoctorById($id);

            $formattedData = new DoctorResource($result);

            return $this->successResponse($formattedData, "Doctor retrieved successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->doctorService->updateDoctor($id, $validatedRequest);

            $formattedData = new DoctorResource($result);

            return $this->successResponse($formattedData, "Doctor updated successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->doctorService->deleteDoctor($id);

            return $this->successResponse(null, "Doctor deleted successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }
}
