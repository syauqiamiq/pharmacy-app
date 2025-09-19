<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Anamnesis\StoreAnamnesisRequest;
use App\Http\Requests\Anamnesis\UpdateAnamnesisRequest;
use App\Http\Resources\Anamnesis\AnamnesisResource;
use App\Http\Services\Anamnesis\AnamnesisService;
use App\Traits\ApiFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AnamnesisController extends Controller
{
    use ApiFormatter;

    private $anamnesisService;

    public function __construct(AnamnesisService $anamnesisService)
    {
        $this->anamnesisService = $anamnesisService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnamnesisRequest $request)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->anamnesisService->createAnamnesis($validatedRequest, Auth::user()->id);

            $formattedData = new AnamnesisResource($result);

            return $this->successResponse($formattedData, "Anamnesis created successfully", Response::HTTP_CREATED);
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
            $result = $this->anamnesisService->findAnamnesisById($id, Auth::user()->id);

            $formattedData = new AnamnesisResource($result);

            return $this->successResponse($formattedData, "Anamnesis retrieved successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnamnesisRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->anamnesisService->updateAnamnesis($id, $validatedRequest, Auth::user()->id);

            $formattedData = new AnamnesisResource($result);

            return $this->successResponse($formattedData, "Anamnesis updated successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->anamnesisService->deleteAnamnesis($id, Auth::user()->id);

            return $this->successResponse(null, "Anamnesis deleted successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
