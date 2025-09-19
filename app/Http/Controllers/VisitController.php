<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\Visit\VisitResource;
use App\Http\Services\Visit\VisitService;
use App\Traits\ApiFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
