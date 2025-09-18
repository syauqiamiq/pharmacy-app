<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrescriptionLog extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'prescription_id',
        'log_description',
    ];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }
}
