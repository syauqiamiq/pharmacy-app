
<?php

use Illuminate\Support\Facades\Route;



Route::group([
    'name' => "AuthRoutes",
    'prefix' => null,
    "middleware" => []
], base_path('routes/fullstack/AuthRoutes.php'));

Route::group([
    'name' => "DashboardRoutes",
    'prefix' => null,
    "middleware" => ['auth']
], base_path('routes/fullstack/DashboardRoutes.php'));

Route::group([
    'name' => "DoctorRoutes",
    'prefix' => null,
    "middleware" => ['auth','check-roles:Doctor']
], base_path('routes/fullstack/DoctorRoutes.php'));


Route::group([
    'name' => "PharmacistRoutes",
    'prefix' => null,
    "middleware" => ['auth', 'check-roles:Pharmacist']
], base_path('routes/fullstack/PharmacistRoutes.php'));

Route::group([
    'name' => "AdminRoutes",
    'prefix' => null,
    "middleware" => ['auth', 'check-roles:Admin']
], base_path('routes/fullstack/AdminRoutes.php'));