<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'name' => "VisitRioutes",
    'prefix' => null,
    "middleware" => []
], base_path('routes/api/VisitRoutes.php'));
