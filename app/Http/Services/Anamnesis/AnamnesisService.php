<?php

namespace App\Http\Services\Anamnesis;

use App\Models\User;
use App\Models\Visit;
use App\Models\Anamnesis;
use Exception;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class AnamnesisService
{
    public function createAnamnesis($data, $userId)
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

            // Validate visit exists and belongs to the doctor
            $visit = Visit::where('id', $data['visit_id'])
                ->where('doctor_id', $doctor->id)
                ->first();

            if (!$visit) {
                throw new BadRequestException('Visit not found or you do not have access to this visit');
            }

            // Check if anamnesis already exists for this visit
            $existingAnamnesis = Anamnesis::where('visit_id', $data['visit_id'])->first();
            if ($existingAnamnesis) {
                throw new BadRequestException('Anamnesis already exists for this visit');
            }

            // Create anamnesis main data
            $anamnesisData = [
                'visit_id' => $data['visit_id'],
                'doctor_id' => $doctor->id,
                'patient_complaint' => $data['patient_complaint'] ?? '',
                'present_illness' => $data['present_illness'] ?? '',
                'past_illness' => $data['past_illness'] ?? '',
                'allergy_history' => $data['allergy_history'] ?? '',
                'family_history' => $data['family_history'] ?? '',
                'medication_history' => $data['madication_history'] ?? '', // Note: typo from payload
                'physical_exam' => $data['physical_exam'] ?? '',
                'note' => $data['note'] ?? '',
            ];

            $anamnesis = Anamnesis::create($anamnesisData);

            // Create anamnesis details if provided
            if (isset($data['anamnesisDetails']) && is_array($data['anamnesisDetails'])) {
                foreach ($data['anamnesisDetails'] as $detail) {
                    $anamnesis->anamnesisDetails()->create([
                        'key' => $detail['key'] ?? '',
                        'value' => $detail['value'] ?? '',
                        'unit' => $detail['unit'] ?? '',
                    ]);
                }
            }

            return $anamnesis->load(['doctor.user', 'visit.patient', 'anamnesisDetails']);
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function findAnamnesisById($anamnesisId, $userId)
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

            $anamnesis = Anamnesis::with(['doctor.user', 'visit.patient', 'anamnesisDetails'])
                ->where('id', $anamnesisId)
                ->where('doctor_id', $doctor->id)
                ->first();

            if (!$anamnesis) {
                throw new BadRequestException('Anamnesis not found or you do not have access to this anamnesis');
            }

            return $anamnesis;
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function updateAnamnesis($anamnesisId, $data, $userId)
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

            $anamnesis = Anamnesis::where('id', $anamnesisId)
                ->where('doctor_id', $doctor->id)
                ->first();

            if (!$anamnesis) {
                throw new BadRequestException('Anamnesis not found or you do not have access to this anamnesis');
            }

            // Update main anamnesis data
            $updateData = [];
            if (isset($data['patient_complaint'])) {
                $updateData['patient_complaint'] = $data['patient_complaint'];
            }
            if (isset($data['present_illness'])) {
                $updateData['present_illness'] = $data['present_illness'];
            }
            if (isset($data['past_illness'])) {
                $updateData['past_illness'] = $data['past_illness'];
            }
            if (isset($data['allergy_history'])) {
                $updateData['allergy_history'] = $data['allergy_history'];
            }
            if (isset($data['family_history'])) {
                $updateData['family_history'] = $data['family_history'];
            }
            if (isset($data['madication_history'])) {
                $updateData['medication_history'] = $data['madication_history'];
            }
            if (isset($data['physical_exam'])) {
                $updateData['physical_exam'] = $data['physical_exam'];
            }
            if (isset($data['note'])) {
                $updateData['note'] = $data['note'];
            }

            $anamnesis->update($updateData);

            // Update anamnesis details if provided
            if (isset($data['anamnesisDetails']) && is_array($data['anamnesisDetails'])) {
                // Delete existing details
                $anamnesis->anamnesisDetails()->delete();
                
                // Create new details
                foreach ($data['anamnesisDetails'] as $detail) {
                    $anamnesis->anamnesisDetails()->create([
                        'key' => $detail['key'] ?? '',
                        'value' => $detail['value'] ?? '',
                        'unit' => $detail['unit'] ?? '',
                    ]);
                }
            }

            return $anamnesis->load(['doctor.user', 'visit.patient', 'anamnesisDetails']);
        } catch (Exception $err) {
            throw $err;
        }
    }

    public function deleteAnamnesis($anamnesisId, $userId)
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

            $anamnesis = Anamnesis::where('id', $anamnesisId)
                ->where('doctor_id', $doctor->id)
                ->first();

            if (!$anamnesis) {
                throw new BadRequestException('Anamnesis not found or you do not have access to this anamnesis');
            }

            $anamnesis->delete();

            return true;
        } catch (Exception $err) {
            throw $err;
        }
    }
}
