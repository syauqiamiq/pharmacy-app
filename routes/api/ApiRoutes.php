<?php

use App\Http\Middleware\MustAuthenticated;
use Illuminate\Support\Facades\Route;

Route::group([
    'name' => "VisitRoutes",
    'prefix' => null,
    "middleware" =>  [MustAuthenticated::class]
], base_path('routes/api/VisitRoutes.php'));

Route::group([
    'name' => "AnamnesisRoutes",
    'prefix' => null,
    "middleware" => [MustAuthenticated::class]
], base_path('routes/api/AnamnesisRoutes.php'));

Route::group([
    'name' => "PrescriptionRoutes",
    'prefix' => null,
    "middleware" => [MustAuthenticated::class]
], base_path('routes/api/PrescriptionRoutes.php'));
