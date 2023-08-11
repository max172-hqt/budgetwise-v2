<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    public function admin() {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function members() {
        return $this->belongsToMany(User::class);
    }
}
