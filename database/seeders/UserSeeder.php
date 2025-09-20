<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Pharmacist;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\UserRole;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $createdAdmin =  User::create(
            [
                'name' => 'Admin',
                'email' => 'admin@dev.com',
                'password' => Hash::make('admin123123'),
                'is_active' => true,
                'address' => 'Jl. Pondok Jati',
            ]
        );

        $adminRole = Role::where('name', 'Admin')->first();
        if ($adminRole) {
            UserRole::create([
                'user_id' => $createdAdmin->id,
                'role_id' => $adminRole->id,
            ]);
        }

        $createdDoctorUser = User::create(
            [
                'name' => 'dr. Fulan, Sp.PD',
                'email' => 'doctor@dev.com',
                'password' => Hash::make('doctor123123'),
                'is_active' => true,
                'address' => 'Jl. Pondok Jati',
            ]
        );
        Doctor::create([
            'user_id' => $createdDoctorUser->id,
            'specialization' => 'Spesialis Penyakit Dalam',
            'license_number' => 'SIP-DR-2024-02145',
        ]);
        $doctorRole = Role::where('name', 'Doctor')->first();
        if ($doctorRole) {
            UserRole::create([
                'user_id' => $createdDoctorUser->id,
                'role_id' => $doctorRole->id,
            ]);
        }

        $createdPharmacistUser = User::create(
            [
                'name' => 'Apt. Dwi Handayani, S.Farm., M.Farm',
                'email' => 'pharmacist@dev.com',
                'password' => Hash::make('pharmacist123123'),
                'is_active' => true,
                'address' => 'Jl. Pondok Jati',
            ]
        );
        Pharmacist::create([
            'user_id' => $createdPharmacistUser->id,
            'license_number' => 'SIP-AP-2022-88012',
        ]);
        $pharmacistRole = Role::where('name', 'Pharmacist')->first();
        if ($pharmacistRole) {
            UserRole::create([
                'user_id' => $createdPharmacistUser->id,
                'role_id' => $pharmacistRole->id,
            ]);
        }
    }
}
