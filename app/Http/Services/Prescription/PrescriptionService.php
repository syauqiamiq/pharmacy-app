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
use App\Traits\HttpHelper;
use Exception;
use Illuminate\Support\Facades\DB;
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

            // // Check if prescription already exists for this anamnesis
            // $existingPrescription = Prescription::where('anamnesis_id', $data['anamnesis_id'])->first();
            // if ($existingPrescription) {
            //     throw new BadRequestException('Prescription already exists for this anamnesis');
            // }

            // Create prescription main data
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

            // Create prescription details if provided
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


            $prescription = Prescription::where('id', $prescriptionId)
                ->first();

            if (!$prescription) {
                throw new BadRequestException('Prescription not found');
            }


            $prescription->update($data);




            // Update prescription details if provided
            if (isset($data['prescription_details']) && is_array($data['prescription_details'])) {
                // Delete existing details
                $prescription->prescriptionDetails()->delete();

                // Create new details using batch insert
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

                $invoiceId = Str::orderedUuid();
                // create prescription invoice detail
                $invoiceDetails = [];
                foreach ($prescription->prescriptionDetails as $detail) {
                    $medicinePrices = $this->medicineService->getMedicinePriceById($detail->medicine_id);

                    $lastPrice = array_pop($medicinePrices['prices'])['unit_price'];
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
                        // Search by prescription ID
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            // Search by doctor name
                            ->orWhere('doctor_name', 'LIKE', "%" . $search . "%")
                            // Search by patient name
                            ->orWhere('patient_name', 'LIKE', "%" . $search . "%")
                            // Search by status
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
                        // Search by prescription ID
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            // Search by patient name
                            ->orWhere('patient_name', 'LIKE', "%" . $search . "%")
                            // Search by status
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
                        // Search by prescription ID
                        $subQuery->where("id", "LIKE", "%" . $search . "%")
                            // Search by doctor name
                            ->orWhere('doctor_name', 'LIKE', "%" . $search . "%")
                            // Search by patient name
                            ->orWhere('patient_name', 'LIKE', "%" . $search . "%")
                            // Search by status
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
