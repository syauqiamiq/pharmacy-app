<?php

namespace App\Http\Services\PrescriptionInvoice;

use App\Constants\PrescriptionInvoiceStatusConstant;
use App\Models\PrescriptionInvoice;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class PrescriptionInvoiceService
{
    public function getAllPrescriptionInvoices($limit, $search, $orderBy, $sort, $fromDate, $toDate)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';

            $prescriptionInvoicesData = PrescriptionInvoice::with([
                'prescription',
                'prescription.doctor',
                'prescription.doctor.user',
                'prescription.patient',
                'prescription.pharmacist',
                'prescription.pharmacist.user',
                'prescription.anamnesis',
                'prescription.prescriptionDetails',
                'prescriptionInvoiceDetails'
            ])
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('created_at', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('created_at', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            ->orWhere('prescription_id', 'LIKE', "%" . $search . "%")
                            ->orWhere('status', 'LIKE', "%" . $search . "%")
                            ->orWhere('total_amount', 'LIKE', "%" . $search . "%")
                            ->orWhereHas('prescription.patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('name', 'LIKE', "%" . $search . "%");
                            })
                            ->orWhereHas('prescription.doctor.user', function ($doctorQuery) use ($search) {
                                $doctorQuery->where('name', 'LIKE', "%" . $search . "%");
                            });
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $prescriptionInvoicesData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findPrescriptionInvoiceById($prescriptionInvoiceId)
    {
        try {
            $prescriptionInvoice = PrescriptionInvoice::with([
                'prescription',
                'prescription.doctor',
                'prescription.doctor.user',
                'prescription.patient',
                'prescription.pharmacist',
                'prescription.pharmacist.user',
                'prescription.anamnesis',
                'prescription.prescriptionDetails',
                'prescriptionInvoiceDetails'
            ])
                ->where('id', $prescriptionInvoiceId)
                ->first();

            if (!$prescriptionInvoice) {
                throw new BadRequestException('Prescription invoice not found');
            }

            return $prescriptionInvoice;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function updatePrescriptionInvoice($prescriptionInvoiceId, $data)
    {
        return DB::transaction(function () use ($prescriptionInvoiceId, $data) {
            try {
                $prescriptionInvoice = PrescriptionInvoice::lockForUpdate()
                    ->where('id', $prescriptionInvoiceId)
                    ->first();

                if (!$prescriptionInvoice) {
                    throw new BadRequestException('Prescription invoice not found');
                }

                $updateData = [];

                if (isset($data['status'])) {
                    $updateData['status'] = $data['status'];

                    if ($data['status'] === PrescriptionInvoiceStatusConstant::PAID) {
                        $updateData['paid_at'] = now();
                    }
                }

                $prescriptionInvoice->update($updateData);

                return $prescriptionInvoice->load([
                    'prescription',
                    'prescription.doctor',
                    'prescription.doctor.user',
                    'prescription.patient',
                    'prescription.pharmacist',
                    'prescription.pharmacist.user',
                    'prescription.anamnesis',
                    'prescription.prescriptionDetails',
                    'prescriptionInvoiceDetails'
                ]);
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function deletePrescriptionInvoice($prescriptionInvoiceId)
    {
        return DB::transaction(function () use ($prescriptionInvoiceId) {
            try {
                $prescriptionInvoice = PrescriptionInvoice::lockForUpdate()
                    ->where('id', $prescriptionInvoiceId)
                    ->first();

                if (!$prescriptionInvoice) {
                    throw new BadRequestException('Prescription invoice not found');
                }

                $prescriptionInvoice->delete();

                return true;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }
}
