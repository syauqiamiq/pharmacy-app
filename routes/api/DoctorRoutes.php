<?php

use App\Http\Controllers\Api\V1\DoctorController;
use Illuminate\Support\Facades\Route;

Route::apiResource('doctor', DoctorController::class)
->middleware('check-roles:Admin');