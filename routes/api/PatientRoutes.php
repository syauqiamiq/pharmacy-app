<?php

use App\Http\Controllers\Api\V1\PatientController;
use Illuminate\Support\Facades\Route;

Route::apiResource('patient', PatientController::class)
->middleware('check-roles:Admin');