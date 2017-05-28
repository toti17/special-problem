<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewTransaction extends Model
{
    protected $fillable = ['acqNumber', 'username', 'date'];
    public $timestamps = false;
}
