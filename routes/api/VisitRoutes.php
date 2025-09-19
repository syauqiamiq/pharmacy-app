<?php

use App\Http\Controllers\Api\V1\VisitController;
use Illuminate\Support\Facades\Route;

Route::get('/visit/my', [VisitController::class, 'findMyVisit'])->name('api.visit.findMyVisit');
Route::apiResource('visit', VisitController::class);
