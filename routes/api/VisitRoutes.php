<?php

use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

Route::get('/visit/my', [VisitController::class, 'findMyVisit'])->name('api.visit.findMyVisit');
Route::resource('visit', VisitController::class);
