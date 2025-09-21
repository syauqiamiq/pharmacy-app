<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ErrorController extends Controller
{
    /**
     * Show the 404 Not Found page.
     */
    public function notFound()
    {
        return Inertia::render('errors/NotFoundPage');
    }

    /**
     * Show the 403 Forbidden page.
     */
    public function forbidden()
    {
        return Inertia::render('errors/ForbiddenPage');
    }
}
