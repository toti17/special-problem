<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BorrowTransaction extends Model
{
    protected $fillable = ['acqNumber', 'username', 'date'];
    public $timestamps = false;
}
