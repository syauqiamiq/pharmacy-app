
<?php

use App\Http\Middleware\MustAuthenticated;
use Illuminate\Support\Facades\Route;



Route::group([
    'name' => "AuthRoutes",
    'prefix' => null,
    "middleware" => []
], base_path('routes/fullstack/AuthRoutes.php'));

Route::group([
    'name' => "DashboardRoutes",
    'prefix' => null,
    "middleware" => [MustAuthenticated::class]
], base_path('routes/fullstack/DashboardRoutes.php'));

Route::group([
    'name' => "DoctorRoutes",
    'prefix' => null,
    "middleware" => [MustAuthenticated::class]
], base_path('routes/fullstack/DoctorRoutes.php'));


Route::group([
    'name' => "PharmacistRoutes",
    'prefix' => null,
    "middleware" => [MustAuthenticated::class]
], base_path('routes/fullstack/PharmacistRoutes.php'));