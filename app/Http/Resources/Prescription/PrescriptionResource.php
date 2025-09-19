<?php

namespace App\Http\Resources\Prescription;

use App\Http\Resources\Doctor\DoctorResource;
use App\Http\Resources\Patient\PatientResource;
use App\Http\Resources\Anamnesis\AnamnesisResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'anamnesis_id' => $this->anamnesis_id,
            'pharmacist_id' => $this->pharmacist_id,
            'doctor_id' => $this->doctor_id,
            'patient_id' => $this->patient_id,
            'patient_name' => $this->patient_name,
            'doctor_name' => $this->doctor_name,
            'doctor_note' => $this->doctor_note,
            'pharmacist_name' => $this->pharmacist_name,
            'pharmacist_note' => $this->pharmacist_note,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'doctor' => new DoctorResource($this->whenLoaded('doctor')),
            'patient' => new PatientResource($this->whenLoaded('patient')),
            'anamnesis' => new AnamnesisResource($this->whenLoaded('anamnesis')),
            'prescription_details' => PrescriptionDetailResource::collection($this->whenLoaded('prescriptionDetails')),
        ];
    }
}