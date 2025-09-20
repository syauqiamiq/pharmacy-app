<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prescription extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'anamnesis_id',
        'pharmacist_id',
        'doctor_id',
        'patient_id',
        'patient_name',
        'doctor_name',
        'doctor_note',
        'pharmacist_name',
        'pharmacist_note',
        'status',
    ];

    public function anamnesis()
    {
        return $this->belongsTo(Anamnesis::class);
    }

    public function pharmacist()
    {
        return $this->belongsTo(Pharmacist::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function prescriptionDetails()
    {
        return $this->hasMany(PrescriptionDetail::class);
    }

    public function prescriptionLogs()
    {
        return $this->hasMany(PrescriptionLog::class);
    }

    public function prescriptionInvoice()
    {
        return $this->hasOne(PrescriptionInvoice::class);
    }
}
