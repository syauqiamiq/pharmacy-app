<?php

use App\Http\Controllers\Api\V1\MedicineController;
use Illuminate\Support\Facades\Route;

Route::get('/medicines', [MedicineController::class, 'getAllMedicines'])->middleware('check-roles:Doctor,Pharmacist,Admin');
Route::get('/medicines/{id}/price', [MedicineController::class, 'getMedicinePriceById'])->middleware('check-roles:Doctor,Pharmacist,Admin');
