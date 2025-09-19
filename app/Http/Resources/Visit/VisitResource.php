<?php

namespace App\Http\Resources\Visit;

use App\Http\Resources\Doctor\DoctorResource;
use App\Http\Resources\Patient\PatientResource;
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
            "doctor_id" => $this->doctor_id,
            "patient_id" => $this->patient_id,
            "status" => $this->status,
            "doctor" => new DoctorResource($this->doctor),
            "patient" => new PatientResource($this->patient),
        ];
    }
}
