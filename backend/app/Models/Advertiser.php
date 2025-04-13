<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Advertiser extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}
