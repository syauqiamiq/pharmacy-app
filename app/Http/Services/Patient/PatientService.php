<?php

namespace App\Http\Services\Patient;

use App\Models\Patient;
use Exception;
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

            $patientsData = Patient::withCount(['visits', 'prescriptions'])
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            ->orWhere('name', 'LIKE', "%" . $search . "%")
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
        try {
            $patient = Patient::create([
                'name' => $data['name'],
                'medic_record_number' => $data['medic_record_number'],
            ]);

            return $patient;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function updatePatient($id, $data)
    {
        try {
            $patient = Patient::find($id);

            if (!$patient) {
                throw new BadRequestException('Patient not found');
            }

            $patient->update([
                'name' => $data['name'],
                'medic_record_number' => $data['medic_record_number'],
            ]);

            return $patient->fresh();
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function deletePatient($id)
    {
        try {
            $patient = Patient::find($id);

            if (!$patient) {
                throw new BadRequestException('Patient not found');
            }

            // Check if patient has any visits or prescriptions
            $hasVisits = $patient->visits()->exists();
            $hasPrescriptions = $patient->prescriptions()->exists();

            if ($hasVisits || $hasPrescriptions) {
                throw new BadRequestException('Cannot delete patient with existing visits or prescriptions. Please remove all related data first.');
            }

            $patient->delete();

            return true;
        } catch (Exception $err) {
            throw $err;
        }
    }
}