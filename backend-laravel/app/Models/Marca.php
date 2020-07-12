<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    protected $table = "marca";
    protected $guarded = [];

    public function carros() {
        return $this->hasMany('App\Models\Carro', 'marca');
    }
}
