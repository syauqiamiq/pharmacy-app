<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'name' => "VisitRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/api/VisitRoutes.php'));

Route::group([
    'name' => "PatientRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/api/PatientRoutes.php'));

Route::group([
    'name' => "AnamnesisRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/api/AnamnesisRoutes.php'));

Route::group([
    'name' => "PrescriptionRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/api/PrescriptionRoutes.php'));

Route::group([
    'name' => "MedicineRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/api/MedicineRoutes.php'));

Route::group([
    'name' => "PrescriptionInvoiceRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/api/PrescriptionInvoiceRoutes.php'));
