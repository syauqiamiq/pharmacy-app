<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Patient::create(
            [
                'name' => 'Muhammad Syauqi Amiq Amrullah',
                'medic_record_number' => 'DELTA-SDA-2025-BA2AXZ',
            ]
        );
    }
}
