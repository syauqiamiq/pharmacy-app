<?php

namespace Database\Seeders;

use App\Constants\VisitStatusConstant;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Visit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $patient = Patient::get()->first();
        $doctor = Doctor::get()->first();
        Visit::create([
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'status' => VisitStatusConstant::SCHEDULED,
            'visit_date' => now(),
        ]);
        Visit::create([
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'status' => VisitStatusConstant::SCHEDULED,
            'visit_date' => now(),
        ]);
        Visit::create([
            'patient_id' => $patient->id,
            'doctor_id' => $doctor->id,
            'status' => VisitStatusConstant::SCHEDULED,
            'visit_date' => now(),
        ]);
    }
}
