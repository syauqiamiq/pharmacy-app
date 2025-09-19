<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Visit\StoreVisitRequest;
use App\Http\Requests\Visit\UpdateVisitRequest;
use App\Http\Resources\Visit\VisitResource;
use App\Http\Services\Visit\VisitService;
use App\Traits\ApiFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

use function Ramsey\Uuid\v1;

class VisitController extends Controller
{
    use ApiFormatter;

    private $visitService;

    public function __construct(VisitService $visitService)
    {
        $this->visitService = $visitService;
    }

    public function findMyVisit(Request $request)
    {
        try {

            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';
            $fromDate = $request->fromDate ? $request->fromDate : NULL;
            $toDate = $request->toDate ? $request->toDate : NULL;


            $result = $this->visitService->findMyVisit(
                Auth::user()->id,
                $limit,
                $search,
                $orderBy,
                $sort,
                $fromDate,
                $toDate
            );


            $formattedDatas = VisitResource::collection($result);

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

    public function index(Request $request)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;
            $search = $request->search ? $request->search : '';
            $orderBy = $request->orderBy ? $request->orderBy : 'id';
            $sort = $request->sort ? $request->sort : 'ASC';
            $fromDate = $request->fromDate ? $request->fromDate : null;
            $toDate = $request->toDate ? $request->toDate : null;

            $result = $this->visitService->getAllVisits(
                $limit,
                $search,
                $orderBy,
                $sort,
                $fromDate,
                $toDate
            );

            $formattedDatas = VisitResource::collection($result);

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
    public function store(StoreVisitRequest $request)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->visitService->createVisit($validatedRequest, Auth::user()->id);

            $formattedData = new VisitResource($result);

            return $this->successResponse($formattedData, "Visit created successfully", Response::HTTP_CREATED);
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
            $result = $this->visitService->findVisitById($id);

            $formattedData = new VisitResource($result);

            return $this->successResponse($formattedData, "Visit retrieved successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVisitRequest $request, string $id)
    {
        try {
            $validatedRequest = $request->validated();
            $result = $this->visitService->updateVisit($id, $validatedRequest);

            $formattedData = new VisitResource($result);

            return $this->successResponse($formattedData, "Visit updated successfully", Response::HTTP_OK);
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
            $this->visitService->deleteVisit($id);

            return $this->successResponse(null, "Visit deleted successfully", Response::HTTP_OK);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
