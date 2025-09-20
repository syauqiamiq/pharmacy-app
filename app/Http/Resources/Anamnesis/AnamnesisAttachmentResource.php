<?php

namespace App\Http\Resources\Anamnesis;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnamnesisAttachmentResource extends JsonResource
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
            'document_name' => $this->document_name,
            'path' => $this->path,
            'url' => asset('storage/' . $this->path),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}