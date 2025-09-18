<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrescriptionInvoice extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'prescription_id',
        'total_amount',
        'status',
        'issued_at',
        'paid_at',
    ];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }

    public function prescriptionInvoiceDetails()
    {
        return $this->hasMany(PrescriptionInvoiceDetail::class);
    }
}
