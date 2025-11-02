<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SoilMoisture extends Model
{
    protected $fillable = [
        'measured_at',
        'moisture',
        'karakara_id',
        'notified',
    ];
}
