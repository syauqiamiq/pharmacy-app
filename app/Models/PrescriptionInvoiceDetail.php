<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrescriptionInvoiceDetail extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'prescription_invoice_id',
        'description',
        'quantity',
        'unit_price',
        'total_price',
    ];

    public function prescriptionInvoice()
    {
        return $this->belongsTo(PrescriptionInvoice::class, 'prescription_invoice_id');
    }
}
