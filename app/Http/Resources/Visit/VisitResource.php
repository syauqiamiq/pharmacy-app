<?php

namespace App\Http\Resources\Visit;

use App\Http\Resources\Anamnesis\AnamnesisResource;
use App\Http\Resources\Doctor\DoctorResource;
use App\Http\Resources\Patient\PatientResource;
use App\Models\Anamnesis;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "visit_date" => $this->visit_date,
            "created_at" => $this->created_at,
            "doctor_id" => $this->doctor_id,
            "patient_id" => $this->patient_id,
            "status" => $this->status,
            "doctor" => new DoctorResource($this->doctor),
            "patient" => new PatientResource($this->patient),
            "anamnesis" => new AnamnesisResource($this->anamnesis),
        ];
    }
}
