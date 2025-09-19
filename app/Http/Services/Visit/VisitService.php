<?php

namespace App\Http\Services\Visit;

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

    public function logout($request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
    }
}
