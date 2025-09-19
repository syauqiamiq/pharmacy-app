<?php

namespace App\Http\Resources\Doctor;

use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
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
            'name' => $this->name,
            'specialization' => $this->specialization,
            'license_number' => $this->license_number,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->user),
            'created_at' => $this->created_at,
        ];
    }
}
