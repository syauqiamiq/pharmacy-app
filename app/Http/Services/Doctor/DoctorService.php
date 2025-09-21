<?php

namespace App\Http\Services\Doctor;

use App\Models\Doctor;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class DoctorService
{
    public function getAllDoctors($limit, $search, $orderBy, $sort)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';

            $doctorsData = Doctor::with(['user'])
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where('specialization', 'LIKE', "%" . $search . "%")
                            ->orWhere('license_number', 'LIKE', "%" . $search . "%")
                            ->orWhereHas('user', function ($userQuery) use ($search) {
                                $userQuery->where('name', 'LIKE', "%" . $search . "%")
                                    ->orWhere('email', 'LIKE', "%" . $search . "%");
                            });
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $doctorsData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findDoctorById($doctorId)
    {
        try {
            $doctor = Doctor::with(['user'])
                ->where('id', $doctorId)
                ->first();

            if (!$doctor) {
                throw new BadRequestException('Doctor not found');
            }

            return $doctor;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function getDoctorById($id)
    {
        try {
            $doctor = Doctor::with(['user'])
                ->withCount(['visits', 'anamneses', 'prescriptions'])
                ->find($id);

            if (!$doctor) {
                throw new BadRequestException('Doctor not found');
            }

            return $doctor;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function createDoctor($data)
    {
        return DB::transaction(function () use ($data) {
            try {
                $doctor = Doctor::create([
                    'user_id' => $data['user_id'],
                    'specialization' => $data['specialization'],
                    'license_number' => $data['license_number'],
                ]);

                // Load the user relationship
                $doctor->load('user');

                return $doctor;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function updateDoctor($doctorId, $data)
    {
        return DB::transaction(function () use ($doctorId, $data) {
            try {
                $doctor = Doctor::lockForUpdate()
                    ->where('id', $doctorId)
                    ->first();

                if (!$doctor) {
                    throw new BadRequestException('Doctor not found');
                }

                $updateData = [];
                if (isset($data['user_id'])) {
                    $updateData['user_id'] = $data['user_id'];
                }
                if (isset($data['specialization'])) {
                    $updateData['specialization'] = $data['specialization'];
                }
                if (isset($data['license_number'])) {
                    $updateData['license_number'] = $data['license_number'];
                }

                $doctor->update($updateData);

                // Load the user relationship
                $doctor->load('user');

                return $doctor;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function deleteDoctor($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $doctor = Doctor::lockForUpdate()
                    ->withCount(['visits', 'anamneses', 'prescriptions'])
                    ->find($id);

                if (!$doctor) {
                    throw new BadRequestException('Doctor not found');
                }

                if ($doctor->visits_count > 0 || $doctor->anamneses_count > 0 || $doctor->prescriptions_count > 0) {
                    throw new BadRequestException('Cannot delete doctor with existing visits, anamneses, or prescriptions. Please remove all related data first.');
                }

                $doctor->delete();

                return true;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }
}