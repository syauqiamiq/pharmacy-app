<?php

use App\Http\Controllers\Api\V1\VisitController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Route;

Route::get('/visit/my', [VisitController::class, 'findMyVisit'])->name('api.visit.findMyVisit')
->middleware('check-roles:Doctor');

Route::apiResource('visit', VisitController::class)
->middlewareFor(['index', 'show'], [
    'check-roles:Doctor,Pharmacist,Admin',
])
->middlewareFor(['store','update','destroy'], [
    'check-roles:Admin',
])
->middlewareFor(['update' ], [
    'check-roles:Doctor',
]);