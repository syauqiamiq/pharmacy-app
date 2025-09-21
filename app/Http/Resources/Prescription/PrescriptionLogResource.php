<?php

namespace App\Http\Resources\Prescription;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionLogResource extends JsonResource
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
            'prescription_id' => $this->prescription_id,
            'log_description' => $this->log_description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}