<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $with = ['admin'];

    public function admin() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function members() {
        return $this->belongsToMany(User::class);
    }
}
