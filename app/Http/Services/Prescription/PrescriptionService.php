<?php

namespace App\Http\Services\Prescription;

use App\Constants\PrescriptionInvoiceStatusConstant;
use App\Constants\PrescriptionStatusConstant;
use App\Http\Services\Medicine\MedicineService;
use App\Models\User;
use App\Models\Anamnesis;
use App\Models\Prescription;
use App\Models\PrescriptionDetail;
use App\Models\PrescriptionInvoice;
use App\Models\PrescriptionInvoiceDetail;
use Exception;
use \Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class PrescriptionService
{
    private $medicineService;
    public function __construct(MedicineService $medicineService)
    {
        $this->medicineService = $medicineService;
    }
    public function createPrescription($data, $userId)
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                throw new BadRequestException('User not found');
            }

            $doctor = $user->doctor;

            if (!$doctor) {
                throw new BadRequestException('User not a doctor');
            }

            // Validate anamnesis exists and belongs to the doctor
            $anamnesis = Anamnesis::where('id', $data['anamnesis_id'])
                ->where('doctor_id', $doctor->id)
                ->first();

            if (!$anamnesis) {
                throw new BadRequestException('Anamnesis not found or you do not have access to this anamnesis');
            }

            $prescriptionData = [
                'anamnesis_id' => $data['anamnesis_id'],
                'doctor_id' => $doctor->id,
                'patient_id' => $anamnesis->visit->patient_id,
                'patient_name' => $anamnesis->visit->patient->name ?? '',
                'doctor_name' => $doctor->user->name ?? '',
                'doctor_note' => $data['doctor_note'] ?? '',
                'status' => PrescriptionStatusConstant::PENDING_VALIDATION,
            ];

            $prescription = Prescription::create($prescriptionData);

            if (isset($data['prescription_details']) && is_array($data['prescription_details'])) {
                $prescriptionDetails = [];
                $now = now();

                foreach ($data['prescription_details'] as $detail) {
                    $prescriptionDetails[] = [
                        "id" => Str::orderedUuid(),
                        'prescription_id' => $prescription->id,
                        'medicine_id' => $detail['medicine_id'] ?? null,
                        'medicine_name' => $detail['medicine_name'] ?? '',
                        'dosage' => $detail['dosage'] ?? '',
                        'frequency' => $detail['frequency'] ?? '',
                        'duration' => $detail['duration'] ?? '',
                        'note' => $detail['note'] ?? '',
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }

                if (!empty($prescriptionDetails)) {
                    PrescriptionDetail::insert($prescriptionDetails);
                }
            }

            return $prescription->load(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails']);
        } catch (Exception $err) {
            throw $err;
        }
    }


    public function findPrescriptionById($prescriptionId, $userId)
    {
        try {
            $prescription = Prescription::with(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails'])
                ->where('id', $prescriptionId)
                ->first();

            if (!$prescription) {
                throw new BadRequestException('Prescription not found or you do not have access to this prescription');
            }

            return $prescription;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function updatePrescription($prescriptionId, $data, $userId)
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                throw new BadRequestException('User not found');
            }

            $doctor = $user->doctor;
            $pharmacist = $user->pharmacist;

            if (!$doctor && !$pharmacist) {
                throw new BadRequestException('User must be either a doctor or pharmacist');
            }

            $prescription = Prescription::with(['prescriptionDetails', 'prescriptionInvoice'])
                ->where('id', $prescriptionId)
                ->first();

            if (!$prescription) {
                throw new BadRequestException('Prescription not found');
            }

            // VALIDASI 8: Cek status yang tidak bisa diupdate
            if (in_array($prescription->status, [
                PrescriptionStatusConstant::CANCELED,
                PrescriptionStatusConstant::RETURN,
                PrescriptionStatusConstant::EXPIRED
            ])) {
                throw new BadRequestException('Cannot update prescription with status: ' . $prescription->status);
            }

            // Validasi status update jika ada perubahan status
            if (isset($data['status']) && $data['status'] !== $prescription->status) {
                $this->validateStatusUpdate($prescription, $data['status'], $doctor, $pharmacist, $data);
            }

            $prescription->update($data);

            if (isset($data['prescription_details']) && is_array($data['prescription_details'])) {
                $prescription->prescriptionDetails()->delete();

                $prescriptionDetails = [];
                $now = now();

                foreach ($data['prescription_details'] as $detail) {
                    $prescriptionDetails[] = [
                        "id" => Str::orderedUuid(),
                        'prescription_id' => $prescription->id,
                        'medicine_id' => $detail['medicine_id'] ?? null,
                        'medicine_name' => $detail['medicine_name'] ?? '',
                        'dosage' => $detail['dosage'] ?? '',
                        'frequency' => $detail['frequency'] ?? '',
                        'duration' => $detail['duration'] ?? '',
                        'note' => $detail['note'] ?? '',
                        'quantity' => $detail['quantity'] ?? 0,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }

                if (!empty($prescriptionDetails)) {
                    PrescriptionDetail::insert($prescriptionDetails);
                }
            }

            $prescription = Prescription::with(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails'])
                ->where('id', $prescriptionId)
                ->first();

            // create prescription invoice if status VALIDATED
            if (isset($data['status']) && $data['status'] === PrescriptionStatusConstant::VALIDATED) {

                // Check if prescription invoice already exists
                if ($prescription->prescriptionInvoice) {
                    throw new BadRequestException('Prescription invoice already exists for this prescription');
                }

                $invoiceId = Str::orderedUuid();
                // create prescription invoice detail
                $invoiceDetails = [];
                foreach ($prescription->prescriptionDetails as $detail) {
                    $medicinePrices = $this->medicineService->getMedicinePriceById($detail->medicine_id);

                    $lastPrice = $medicinePrices['current_price'] ?? 0;
                    $invoiceDetails[] = [
                        "id" => Str::orderedUuid(),
                        'prescription_invoice_id' => $invoiceId,
                        'description' => $detail->medicine_name,
                        'quantity' => $detail->quantity ?? 0,
                        'unit_price' => $lastPrice,
                        'total_price' => $lastPrice * ($detail->quantity ?? 0),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                $invoice = PrescriptionInvoice::insert([
                    'id' => $invoiceId,
                    'prescription_id' => $prescription->id,
                    'status' => PrescriptionInvoiceStatusConstant::PENDING,
                    'total_amount' => array_sum(array_column($invoiceDetails, 'total_price')),
                    'issued_at' => now(),
                    'paid_at' => null,
                    'created_at' => now(),
                    'updated_at' => now(),

                ]);
                PrescriptionInvoiceDetail::insert($invoiceDetails);
            }

            return $prescription->load(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails']);
        } catch (Exception $err) {
            throw $err;
        }
    }

    /**
     * Validate status update based on business rules
     */
    private function validateStatusUpdate($prescription, $newStatus, $doctor, $pharmacist, $payload)
    {
        $currentStatus = $prescription->status;

        switch ($newStatus) {
            case PrescriptionStatusConstant::VALIDATED:
                // VALIDASI 1: Hanya apoteker yang bisa validate
                if (!$pharmacist) {
                    throw new BadRequestException('Only pharmacist can validate prescription');
                }

                // Cek quantity semua prescription details harus > 0
                foreach ($payload['prescription_details'] as $detail) {
                    if ($detail['quantity'] <= 0) {
                        throw new BadRequestException('All prescription details must have quantity greater than 0');
                    }
                }
                break;

            case PrescriptionStatusConstant::DRAFT:
                // VALIDASI 2: Hanya dokter yang bisa ubah ke DRAFT
                if (!$doctor) {
                    throw new BadRequestException('Only doctor can change prescription to draft');
                }

                // Status harus ON_HOLD atau PENDING_VALIDATION
                if (!in_array($currentStatus, [
                    PrescriptionStatusConstant::ON_HOLD,
                    PrescriptionStatusConstant::PENDING_VALIDATION
                ])) {
                    throw new BadRequestException('Can only change to DRAFT from ON_HOLD or PENDING_VALIDATION status');
                }
                break;

            case PrescriptionStatusConstant::PENDING_VALIDATION:
                // VALIDASI 3: Hanya dokter yang bisa ubah ke PENDING_VALIDATION
                if (!$doctor) {
                    throw new BadRequestException('Only doctor can change prescription to pending validation');
                }

                // Status harus DRAFT atau REJECTED
                if (!in_array($currentStatus, [
                    PrescriptionStatusConstant::DRAFT,
                    PrescriptionStatusConstant::REJECTED
                ])) {
                    throw new BadRequestException('Can only change to PENDING_VALIDATION from DRAFT or REJECTED status');
                }
                break;

            case PrescriptionStatusConstant::ON_HOLD:
                // VALIDASI 4: Hanya apoteker yang bisa ubah ke ON_HOLD
                if (!$pharmacist) {
                    throw new BadRequestException('Only pharmacist can put prescription on hold');
                }

                // Status harus PENDING_VALIDATION
                if ($currentStatus !== PrescriptionStatusConstant::PENDING_VALIDATION) {
                    throw new BadRequestException('Can only change to ON_HOLD from PENDING_VALIDATION status');
                }
                break;

            case PrescriptionStatusConstant::DISPENSING:
                // VALIDASI 5: Hanya apoteker yang bisa ubah ke DISPENSING
                if (!$pharmacist) {
                    throw new BadRequestException('Only pharmacist can start dispensing');
                }

                // Status harus VALIDATED
                if ($currentStatus !== PrescriptionStatusConstant::VALIDATED) {
                    throw new BadRequestException('Can only change to DISPENSING from VALIDATED status');
                }
                break;

            case PrescriptionStatusConstant::DISPENSED:
                // VALIDASI 6: Hanya apoteker yang bisa ubah ke DISPENSED
                if (!$pharmacist) {
                    throw new BadRequestException('Only pharmacist can mark as dispensed');
                }

                // Status harus DISPENSING
                if ($currentStatus !== PrescriptionStatusConstant::DISPENSING) {
                    throw new BadRequestException('Can only change to DISPENSED from DISPENSING status');
                }
                break;

            case PrescriptionStatusConstant::DONE:
                // VALIDASI 7: Hanya apoteker yang bisa ubah ke DONE
                if (!$pharmacist) {
                    throw new BadRequestException('Only pharmacist can mark prescription as done');
                }

                // Status harus DISPENSED
                if ($currentStatus !== PrescriptionStatusConstant::DISPENSED) {
                    throw new BadRequestException('Can only change to DONE from DISPENSED status');
                }

                // Pastikan ada prescription invoice yang berstatus PAID
                $prescriptionInvoice = $prescription->prescriptionInvoice;

                if (!$prescriptionInvoice || $prescriptionInvoice->status !== PrescriptionInvoiceStatusConstant::PAID) {
                    throw new BadRequestException('Prescription invoice must be paid before marking as done');
                }
                break;

            default:
                // Status lain yang tidak ada validasi khusus
                break;
        }
    }

    public function deletePrescription($prescriptionId, $userId)
    {
        try {
            $user = User::find($userId);

            if (!$user) {
                throw new BadRequestException('User not found');
            }

            $doctor = $user->doctor;

            if (!$doctor) {
                throw new BadRequestException('User not a doctor');
            }

            $prescription = Prescription::where('id', $prescriptionId)
                ->where('doctor_id', $doctor->id)
                ->first();

            if (!$prescription) {
                throw new BadRequestException('Prescription not found or you do not have access to this prescription');
            }

            $prescription->delete();

            return true;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function getAllPrescriptions($limit, $search, $orderBy, $sort, $fromDate, $toDate)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';

            $prescriptionsData = Prescription::with(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails'])
                ->where("status", "!=", PrescriptionStatusConstant::DRAFT)
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('created_at', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('created_at', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            ->orWhere('doctor_name', 'LIKE', "%" . $search . "%")
                            ->orWhere('patient_name', 'LIKE', "%" . $search . "%")
                            ->orWhere('status', 'LIKE', "%" . $search . "%");
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $prescriptionsData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findMyPrescriptions($userId, $limit, $search, $orderBy, $sort, $fromDate, $toDate)
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

            $myPrescriptionsData = Prescription::with(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails'])
                ->where('doctor_id', $doctor->id)
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('created_at', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('created_at', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            ->orWhere('patient_name', 'LIKE', "%" . $search . "%")
                            ->orWhere('status', 'LIKE', "%" . $search . "%");
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $myPrescriptionsData;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findPrescriptionsByAnamnesisId($anamnesisId, $limit, $search, $orderBy, $sort, $fromDate, $toDate)
    {
        try {
            $limit = $limit ? $limit : 25;
            $search = $search ? $search : '';
            $orderBy = $orderBy ? $orderBy : 'id';
            $sort = $sort ? $sort : 'ASC';

            $prescriptionsData = Prescription::with(['doctor.user', 'patient', 'anamnesis.visit', 'prescriptionDetails'])
                ->where('anamnesis_id', $anamnesisId)
                ->when($fromDate, function ($query) use ($fromDate) {
                    $query->whereDate('created_at', '>=', $fromDate);
                })
                ->when($toDate, function ($query) use ($toDate) {
                    $query->whereDate('created_at', '<=', $toDate);
                })
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($subQuery) use ($search) {
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            ->orWhere('doctor_name', 'LIKE', "%" . $search . "%")
                            ->orWhere('patient_name', 'LIKE', "%" . $search . "%")
                            ->orWhere('status', 'LIKE', "%" . $search . "%");
                    });
                })
                ->orderBy($orderBy, $sort)
                ->paginate($limit);

            return $prescriptionsData;
        } catch (Exception $err) {
            throw $err;
        }
    }
}
