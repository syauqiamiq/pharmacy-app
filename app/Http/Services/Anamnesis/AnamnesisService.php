<?php

namespace App\Http\Services\Anamnesis;

use App\Models\User;
use App\Models\Visit;
use App\Models\Anamnesis;
use App\Models\AnamnesisAttachment;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class AnamnesisService
{
    public function createAnamnesis($data, $userId, $files = [])
    {
        return DB::transaction(function () use ($data, $userId, $files) {
            try {
                $user = User::with(['doctor'])->find($userId);

                if (!$user) {
                    throw new BadRequestException('User not found');
                }

                if (!$user->doctor) {
                    throw new BadRequestException('User not a doctor');
                }

                // Validate visit exists and belongs to the doctor
                $visit = Visit::where('id', $data['visit_id'])
                    ->where('doctor_id', $user->doctor->id)
                    ->first();

                if (!$visit) {
                    throw new BadRequestException('Visit not found or you do not have access to this visit');
                }

                // Check if anamnesis already exists for this visit
                $existingAnamnesis = Anamnesis::where('visit_id', $data['visit_id'])
                    ->first();

                if ($existingAnamnesis) {
                    throw new BadRequestException('Anamnesis already exists for this visit');
                }

                // Create anamnesis main data
                $anamnesisData = [
                    'visit_id' => $data['visit_id'],
                    'doctor_id' => $user->doctor->id,
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
                if (isset($data['anamnesis_details']) && is_array($data['anamnesis_details'])) {
                    foreach ($data['anamnesis_details'] as $detail) {
                        $anamnesis->anamnesisDetails()->create([
                            'key' => $detail['key'] ?? '',
                            'value' => $detail['value'] ?? '',
                            'unit' => $detail['unit'] ?? '',
                        ]);
                    }
                }

                // Handle file uploads if provided
                if (!empty($files)) {
                    $this->uploadAnamnesisFiles($anamnesis->id, $files);
                }

                return $anamnesis->load([
                    'doctor',
                    'doctor.user',
                    'visit',
                    'visit.patient',
                    'anamnesisDetails',
                    'anamnesisAttachments'
                ]);
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function uploadAnamnesisFiles($anamnesisId, $files, $userId = null)
    {
        return DB::transaction(function () use ($anamnesisId, $files, $userId) {
            try {
                // If userId is provided, validate access to anamnesis
                if ($userId) {
                    $user = User::with(['doctor'])->find($userId);
                    if (!$user) {
                        throw new BadRequestException('User not found');
                    }

                    if (!$user->doctor) {
                        throw new BadRequestException('User not a doctor');
                    }

                    $anamnesis = Anamnesis::where('id', $anamnesisId)
                        ->where('doctor_id', $user->doctor->id)
                        ->first();

                    if (!$anamnesis) {
                        throw new BadRequestException('Anamnesis not found or you do not have access to this anamnesis');
                    }
                }

                $uploadedFiles = [];

                foreach ($files as $file) {
                    // Store file in anamnesis folder
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $path = $file->storeAs('anamnesis/' . $anamnesisId, $fileName, 'public');

                    // Create attachment record
                    $attachment = AnamnesisAttachment::create([
                        'anamnesis_id' => $anamnesisId,
                        'document_name' => $file->getClientOriginalName(),
                        'path' => $path,
                    ]);

                    $uploadedFiles[] = $attachment;
                }

                return $uploadedFiles;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function deleteAnamnesisFile($attachmentId, $userId)
    {
        return DB::transaction(function () use ($attachmentId, $userId) {
            try {
                $user = User::with(['doctor'])->find($userId);

                if (!$user) {
                    throw new BadRequestException('User not found');
                }

                if (!$user->doctor) {
                    throw new BadRequestException('User not a doctor');
                }

                // Find attachment with anamnesis relationship
                $attachment = AnamnesisAttachment::with(['anamnesis'])
                    ->where('id', $attachmentId)
                    ->first();

                if (!$attachment) {
                    throw new BadRequestException('Attachment not found');
                }

                // Check if doctor has access to this anamnesis
                if ($attachment->anamnesis->doctor_id !== $user->doctor->id) {
                    throw new BadRequestException('You do not have access to this attachment');
                }

                // Delete file from storage
                if (Storage::disk('public')->exists($attachment->path)) {
                    Storage::disk('public')->delete($attachment->path);
                }

                // Delete attachment record
                $attachment->delete();

                return true;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function findAnamnesisById($anamnesisId, $userId)
    {
        try {
            $user = User::with(['doctor'])->find($userId);

            if (!$user) {
                throw new BadRequestException('User not found');
            }

            if (!$user->doctor) {
                throw new BadRequestException('User not a doctor');
            }

            $anamnesis = Anamnesis::with([
                'doctor',
                'doctor.user',
                'visit',
                'visit.patient',
                'anamnesisDetails',
                'anamnesisAttachments'
            ])
                ->where('id', $anamnesisId)
                ->where('doctor_id', $user->doctor->id)
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
        return DB::transaction(function () use ($anamnesisId, $data, $userId) {
            try {
                $user = User::with(['doctor'])->find($userId);

                if (!$user) {
                    throw new BadRequestException('User not found');
                }

                if (!$user->doctor) {
                    throw new BadRequestException('User not a doctor');
                }

                $anamnesis = Anamnesis::lockForUpdate()
                    ->where('id', $anamnesisId)
                    ->where('doctor_id', $user->doctor->id)
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

                return $anamnesis->load([
                    'doctor',
                    'doctor.user',
                    'visit',
                    'visit.patient',
                    'anamnesisDetails',
                    'anamnesisAttachments'
                ]);
            } catch (Exception $err) {
                throw $err;
            }
        });
    }

    public function deleteAnamnesis($anamnesisId, $userId)
    {
        return DB::transaction(function () use ($anamnesisId, $userId) {
            try {
                $user = User::with(['doctor'])->find($userId);

                if (!$user) {
                    throw new BadRequestException('User not found');
                }

                if (!$user->doctor) {
                    throw new BadRequestException('User not a doctor');
                }

                $anamnesis = Anamnesis::lockForUpdate()
                    ->where('id', $anamnesisId)
                    ->where('doctor_id', $user->doctor->id)
                    ->first();

                if (!$anamnesis) {
                    throw new BadRequestException('Anamnesis not found or you do not have access to this anamnesis');
                }

                $anamnesis->delete();

                return true;
            } catch (Exception $err) {
                throw $err;
            }
        });
    }
}
