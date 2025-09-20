<?php

use App\Http\Controllers\Api\V1\MedicineController;
use Illuminate\Support\Facades\Route;

Route::get('/medicines', [MedicineController::class, 'getAllMedicines']);
Route::get('/medicines/{id}/price', [MedicineController::class, 'getMedicinePriceById']);
