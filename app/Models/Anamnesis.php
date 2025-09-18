<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Anamnesis extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'visit_id',
        'doctor_id',
        'patient_complaint',
        'present_illness',
        'past_illness',
        'allergy_history',
        'family_history',
        'medication_history',
        'physical_exam',
        'note',
    ];

    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function anamnesisDetails()
    {
        return $this->hasMany(AnamnesisDetail::class);
    }

    public function anamnesisAttachments()
    {
        return $this->hasMany(AnamnesisAttachment::class);
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }
}
