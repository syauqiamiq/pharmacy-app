<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Anamnesis\StoreAnamnesisRequest;
use App\Http\Requests\Anamnesis\UpdateAnamnesisRequest;
use App\Http\Resources\Anamnesis\AnamnesisResource;
use App\Http\Resources\Anamnesis\AnamnesisAttachmentResource;
use App\Http\Services\Anamnesis\AnamnesisService;
use App\Traits\ApiFormatter;
use Exception;
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


    public function index()
    {
        //
    }


    public function store(StoreAnamnesisRequest $request)
    {
        try {
            $validatedRequest = $request->validated();

            $files = $request->hasFile('files') ? $request->file('files') : [];

            $result = $this->anamnesisService->createAnamnesis($validatedRequest, Auth::user()->id, $files);

            $formattedData = new AnamnesisResource($result);

            return $this->successResponse($formattedData, "Anamnesis created successfully", Response::HTTP_CREATED);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function show(string $id)
    {
        try {
            $result = $this->anamnesisService->findAnamnesisById($id, Auth::user()->id);

            $formattedData = new AnamnesisResource($result);

            return $this->successResponse($formattedData, "Anamnesis retrieved successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function update(UpdateAnamnesisRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->anamnesisService->updateAnamnesis($id, $validatedRequest, Auth::user()->id);

            $formattedData = new AnamnesisResource($result);

            return $this->successResponse($formattedData, "Anamnesis updated successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function destroy(string $id)
    {
        try {
            $this->anamnesisService->deleteAnamnesis($id, Auth::user()->id);

            return $this->successResponse(null, "Anamnesis deleted successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function uploadFiles(Request $request, string $id)
    {
        try {
            $request->validate([
                'files' => 'required|array|max:5',
                'files.*' => 'required|file|mimes:pdf,png,jpg,jpeg,doc,docx,xls,xlsx|max:10240', // 10MB max
            ]);

            $files = $request->file('files');
            $result = $this->anamnesisService->uploadAnamnesisFiles($id, $files, Auth::user()->id);

            $formattedData = AnamnesisAttachmentResource::collection($result);

            return $this->successResponse($formattedData, "Files uploaded successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }


    public function deleteFile(string $attachmentId)
    {
        try {
            $this->anamnesisService->deleteAnamnesisFile($attachmentId, Auth::user()->id);

            return $this->successResponse(null, "File deleted successfully", Response::HTTP_OK);
        } catch (Exception $error) {
            return $this->errorResponse($error->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }
}
