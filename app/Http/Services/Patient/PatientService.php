<?php

namespace App\Http\Services\Patient;

use App\Models\Patient;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class PatientService
{
    public function getAllPatients($limit, $search, $orderBy, $sort)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';

            $patientsData = Patient::when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where('name', 'LIKE', "%" . $search . "%")
                            ->orWhere('medic_record_number', 'LIKE', "%" . $search . "%");
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $patientsData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findPatientById($patientId)
    {
        try {
            $patient = Patient::where('id', $patientId)
                ->first();

            if (!$patient) {
                throw new BadRequestException('Patient not found');
            }

            return $patient;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function getPatientById($id)
    {
        try {
            $patient = Patient::withCount(['visits', 'prescriptions'])
                ->find($id);

            if (!$patient) {
                throw new BadRequestException('Patient not found');
            }

            return $patient;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function createPatient($data)
    {
        return DB::transaction(function () use ($data) {
            try {
                $patient = Patient::create([
                    'name' => $data['name'],
                    'medic_record_number' => $data['medic_record_number'],
                ]);

                return $patient;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function updatePatient($patientId, $data)
    {
        return DB::transaction(function () use ($patientId, $data) {
            try {
                $patient = Patient::lockForUpdate()
                    ->where('id', $patientId)
                    ->first();

                if (!$patient) {
                    throw new BadRequestException('Patient not found');
                }

                $updateData = [];
                if (isset($data['name'])) {
                    $updateData['name'] = $data['name'];
                }
                if (isset($data['medic_record_number'])) {
                    $updateData['medic_record_number'] = $data['medic_record_number'];
                }

                $patient->update($updateData);

                return $patient;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function deletePatient($id)
    {
        return DB::transaction(function () use ($id) {
            try {
                $patient = Patient::lockForUpdate()
                    ->withCount(['visits', 'prescriptions'])
                    ->find($id);

                if (!$patient) {
                    throw new BadRequestException('Patient not found');
                }

                if ($patient->visits_count > 0 || $patient->prescriptions_count > 0) {
                    throw new BadRequestException('Cannot delete patient with existing visits or prescriptions. Please remove all related data first.');
                }

                $patient->delete();

                return true;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }
}
