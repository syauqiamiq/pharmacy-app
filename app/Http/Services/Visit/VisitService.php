<?php

namespace App\Http\Services\Visit;

use App\Constants\VisitStatusConstant;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\Visit;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
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

            $user = User::with(['doctor'])->find($userId);

            if (!$user) {
                throw new BadRequestException('User not found');
            }

            if (!$user->doctor) {
                throw new BadRequestException('User not a doctor');
            }

            $myVisitData = Visit::with(['patient', 'doctor', 'doctor.user'])
                ->where('doctor_id', $user->doctor->id)
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('visit_date', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('visit_date', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            ->orWhereHas('patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('name', 'LIKE', "%" . $search . "%")
                                    ->orWhere('medic_record_number', 'LIKE', "%" . $search . "%");
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

            $visitsData = Visit::with(['patient', 'doctor', 'doctor.user'])
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('created_at', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('created_at', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where('status', 'LIKE', "%" . $search . "%")
                            ->orWhereHas('patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('name', 'LIKE', "%" . $search . "%")
                                    ->orWhere('medic_record_number', 'LIKE', "%" . $search . "%");
                            })
                            ->orWhereHas('doctor.user', function ($doctorQuery) use ($search) {
                                $doctorQuery->where('name', 'LIKE', "%" . $search . "%");
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
        return DB::transaction(function () use ($data) {
            try {
                $doctor = Doctor::with(['user'])
                    ->find($data['doctor_id']);

                if (!$doctor) {
                    throw new BadRequestException('Doctor not found');
                }

                if (!$doctor->user || !$doctor->user->is_active) {
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

                return $visit->load([
                    'doctor',
                    'doctor.user',
                    'patient'
                ]);
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function findVisitById($visitId)
    {
        try {
            $visit = Visit::with([
                'doctor',
                'doctor.user',
                'patient',
                'anamnesis',
                'anamnesis.anamnesisDetails',
                'anamnesis.anamnesisAttachments'
            ])
                ->find($visitId);

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
        return DB::transaction(function () use ($visitId, $data) {
            try {
                $visit = Visit::lockForUpdate()->find($visitId);

                if (!$visit) {
                    throw new BadRequestException('Visit not found');
                }

               
                $updateData = [];
                if (isset($data['patient_id'])) {
                    $updateData['patient_id'] = $data['patient_id'];
                }
                if (isset($data['visit_date'])) {
                    $updateData['visit_date'] = Carbon::parse($data['visit_date'])->toDateTimeString();
                }
                if (isset($data['status'])) {
                    $updateData['status'] = $data['status'];
                }else{
                    if ($visit->status != VisitStatusConstant::SCHEDULED) {
                        throw new BadRequestException('Visit is not in SCHEDULED status');
                    }
                
                }

                $visit->update($updateData);

                return $visit->load([
                    'doctor:id,user_id',
                    'doctor.user:id,name,email',
                    'patient:id,name,medic_record_number'
                ]);
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function deleteVisit($visitId)
    {
        return DB::transaction(function () use ($visitId) {
            try {
                $visit = Visit::lockForUpdate()->find($visitId);

                if (!$visit) {
                    throw new BadRequestException('Visit not found');
                }

                if ($visit->status != VisitStatusConstant::SCHEDULED) {
                    throw new BadRequestException('Visit is not in SCHEDULED status');
                }

                $visit->delete();

                return true;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }
}
