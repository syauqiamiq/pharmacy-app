<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnamnesisAttachment extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'anamnesis_id',
        'document_name',
        'path',
    ];

    public function anamnesis()
    {
        return $this->belongsTo(Anamnesis::class);
    }
}
