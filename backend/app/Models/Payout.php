<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payout extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'country',
        'amount'
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
