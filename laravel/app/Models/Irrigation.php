<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Irrigation extends Model
{
    protected $fillable = ['irrigated_at', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
