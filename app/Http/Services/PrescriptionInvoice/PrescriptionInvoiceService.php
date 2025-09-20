<?php

namespace App\Http\Services\PrescriptionInvoice;

use App\Constants\PrescriptionInvoiceStatusConstant;
use App\Models\User;
use App\Models\Prescription;
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

            $prescriptionInvoicesData = PrescriptionInvoice::with(['prescription.doctor.user', 'prescription.patient', 'prescriptionInvoiceDetails'])
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('created_at', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('created_at', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        // Search by invoice ID
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            // Search by prescription ID
                            ->orWhere('prescription_id', 'LIKE', "%" . $search . "%")
                            // Search by status
                            ->orWhere('status', 'LIKE', "%" . $search . "%")
                            // Search by total amount
                            ->orWhere('total_amount', 'LIKE', "%" . $search . "%")
                            // Search by patient name through prescription
                            ->orWhereHas('prescription.patient', function ($patientQuery) use ($search) {
                                $patientQuery->where('name', 'LIKE', "%" . $search . "%");
                            })
                            // Search by doctor name through prescription
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
            $prescriptionInvoice = PrescriptionInvoice::with(['prescription.doctor.user', 'prescription.patient', 'prescriptionInvoiceDetails'])
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
        try {

            $prescriptionInvoice = PrescriptionInvoice::where('id', $prescriptionInvoiceId)->first();

            if (!$prescriptionInvoice) {
                throw new BadRequestException('Prescription invoice not found');
            }

            // Update main prescription invoice data
            $updateData = [];

            if (isset($data['status'])) {
                $updateData['status'] = $data['status'];

                // Set paid_at when status is changed to PAID
                if ($data['status'] === PrescriptionInvoiceStatusConstant::PAID) {
                    $updateData['paid_at'] = now();
                }
            }

            $prescriptionInvoice->update($updateData);

            return $prescriptionInvoice->load(['prescription.doctor.user', 'prescription.patient', 'prescriptionInvoiceDetails']);
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function deletePrescriptionInvoice($prescriptionInvoiceId)
    {
        try {


            $prescriptionInvoice = PrescriptionInvoice::where('id', $prescriptionInvoiceId)->first();

            if (!$prescriptionInvoice) {
                throw new BadRequestException('Prescription invoice not found');
            }

            $prescriptionInvoice->delete();

            return true;
        } catch (Exception $err) {
            throw $err;
        }
    }
}
