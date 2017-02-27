<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table ="staff";
    protected $primaryKey = "username";

    public function users()
    {
    	return $this->belongsTo(Users::class, 'username');
    }
    public function material()
    {
    	return $this->belongsToMany(Material::class, 'modified', 'username', 'acqNumber');
    }
}
