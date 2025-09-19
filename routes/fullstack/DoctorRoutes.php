

<?php

use App\Http\Controllers\VisitController;
use App\Models\Anamnesis;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/doctor/dashboard', function () {
    return Inertia::render('doctor/dashboard/DoctorDashboardPage');
})->name('fe.doctor.dashboard');

Route::get('/doctor/visit', function () {
    return Inertia::render('doctor/visit/DoctorVisitPage');
})->name('fe.doctor.visit');

Route::get('/doctor/visit/{id}/anamnesis', function () {
    if (Anamnesis::where('visit_id', request()->id)->exists()) {
        return redirect()->route('fe.doctor.visit.detail', ['id' => request()->id]);
    }
    return Inertia::render('doctor/visit/DoctorVisitAnamnesisPage',[
        'visitId' => request()->id,
    ]);
})->name('fe.doctor.visit.anamnesis');

Route::get('/doctor/visit/{id}/detail', function () {
    return Inertia::render('doctor/visit/DoctorVisitDetailPage',[
        'visitId' => request()->id,
    ]);
})->name('fe.doctor.visit.detail');

