<?php

use App\Http\Controllers\Api\V1\AnamnesisController;
use Illuminate\Support\Facades\Route;

Route::apiResource('anamnesis', AnamnesisController::class);