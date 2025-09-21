<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visit extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $casts = [    
        'visit_date' => 'datetime',
    ];

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'status',
        'visit_date',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function anamnesis()
    {
        return $this->hasOne(Anamnesis::class);
    }
}
