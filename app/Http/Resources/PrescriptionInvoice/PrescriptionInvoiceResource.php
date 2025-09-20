<?php

namespace App\Http\Resources\PrescriptionInvoice;

use App\Http\Resources\Prescription\PrescriptionResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionInvoiceResource extends JsonResource
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
            'total_amount' => $this->total_amount,
            'status' => $this->status,
            'issued_at' => $this->issued_at,
            'paid_at' => $this->paid_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Include prescription data if loaded
            'prescription' => $this->whenLoaded('prescription', function () {
                return new PrescriptionResource($this->prescription);
            }),

            // Include prescription invoice details if loaded
            'prescription_invoice_details' => $this->whenLoaded('prescriptionInvoiceDetails', function () {
                return PrescriptionInvoiceDetailResource::collection($this->prescriptionInvoiceDetails);
            }),
        ];
    }
}
