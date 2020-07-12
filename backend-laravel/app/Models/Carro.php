<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carro extends Model
{
    protected $table = 'carro';
    protected $guarded = [];

    public function marca(){
        return $this->belongsTo('App\Models\Marca', 'marca');
    }
}
