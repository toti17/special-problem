<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $table = "student";
    protected $primaryKey = "username";

    public function users()
    {
    	return $this->belongsTo(Users::class, 'username');
    }
    public function material()
    {
    	return $this->belongsToMany(Material::class, 'borrowed', 'username', 'acqNumber');
    }
}
