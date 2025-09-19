<?php

namespace App\Http\Resources\Anamnesis;

use App\Http\Resources\Doctor\DoctorResource;
use App\Http\Resources\Visit\VisitResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnamnesisResource extends JsonResource
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
            'visit_id' => $this->visit_id,
            'doctor_id' => $this->doctor_id,
            'patient_complaint' => $this->patient_complaint,
            'present_illness' => $this->present_illness,
            'past_illness' => $this->past_illness,
            'allergy_history' => $this->allergy_history,
            'family_history' => $this->family_history,
            'medication_history' => $this->medication_history,
            'physical_exam' => $this->physical_exam,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'doctor' => new DoctorResource($this->whenLoaded('doctor')),
            'visit' => new VisitResource($this->whenLoaded('visit')),
            'anamnesis_details' => AnamnesisDetailResource::collection($this->whenLoaded('anamnesisDetails')),
        ];
    }
}