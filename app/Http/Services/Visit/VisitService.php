<?php

namespace App\Http\Services\Visit;

use App\Constants\VisitStatusConstant;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\Visit;
use Exception;
use Illuminate\Support\Facades\Auth;


use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class VisitService
{

    public function findMyVisit($userId, $limit, $search, $orderBy, $sort, $fromDate, $toDate)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';
            $user = User::find($userId);

            if (!$user) {
                throw new BadRequestException('User not found');
            }
            $doctor = $user->doctor;

            if (!$doctor) {
                throw new BadRequestException('User not a doctor');
            }

            $myVisitData = Visit::with(['doctor.user', 'patient'])
                ->where('doctor_id', $doctor->id)
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('visit_date', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('visit_date', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        // Search by visit ID
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            // Search by patient name
                            ->orWhereHas('patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('name', 'LIKE', "%" . $search . "%");
                            })
                            // Search by medical record number
                            ->orWhereHas('patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('medic_record_number', 'LIKE', "%" . $search . "%");
                            });
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $myVisitData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function getAllVisits($limit, $search, $orderBy, $sort, $fromDate, $toDate)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';

            $visitsData = Visit::with(['doctor.user', 'patient'])
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('visit_date', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('visit_date', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        // Search by visit ID
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            // Search by doctor name
                            ->orWhereHas('doctor.user', function ($doctorQuery) use ($search) {
                                $doctorQuery->where('name', 'LIKE', "%" . $search . "%");
                            })
                            // Search by patient name
                            ->orWhereHas('patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('name', 'LIKE', "%" . $search . "%");
                            })
                            // Search by medical record number
                            ->orWhereHas('patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('medic_record_number', 'LIKE', "%" . $search . "%");
                            });
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $visitsData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function createVisit($data)
    {
        try {
            $doctor = Doctor::find($data['doctor_id']);

            if (!$doctor) {
                throw new BadRequestException('Doctor not found');
            }

            $doctorUser = $doctor->user->where('is_active', true)->first();

            if (!$doctorUser) {
                throw new BadRequestException('Doctor is non active');
            }

            $patient = Patient::find($data['patient_id']);
            if (!$patient) {
                throw new BadRequestException('Patient not found');
            }


            $visitData = [
                'patient_id' => $data['patient_id'],
                'doctor_id' => $doctor->id,
                'visit_date' => $data['visit_date'],
                'status' => VisitStatusConstant::SCHEDULED,
            ];

            $visit = Visit::create($visitData);

            return $visit->load(['doctor.user', 'patient']);
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findVisitById($visitId)
    {
        try {
            $visit = Visit::with(['doctor.user', 'patient'])
                ->where('id', $visitId)
                ->first();

            if (!$visit) {
                throw new BadRequestException('Visit not found');
            }

            return $visit;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function updateVisit($visitId, $data)
    {
        try {
            $visit = Visit::where('id', $visitId)
                ->first();

            if (!$visit) {
                throw new BadRequestException('Visit not found');
            }

            // Update only allowed fields
            $updateData = [];
            if (isset($data['patient_id'])) {
                $updateData['patient_id'] = $data['patient_id'];
            }
            if (isset($data['visit_date'])) {
                $updateData['visit_date'] = $data['visit_date'];
            }
            if (isset($data['status'])) {
                $updateData['status'] = $data['status'];
            }

            $visit->update($updateData);

            return $visit->load(['doctor.user', 'patient']);
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function deleteVisit($visitId)
    {
        try {

            $visit = Visit::where('id', $visitId)
                ->first();

            if (!$visit) {
                throw new BadRequestException('Visit not found');
            }

            $visit->delete();

            return true;
        } catch (Exception $err) {
            throw $err;
        }
    }
}
