<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    protected $table ="donor";
    protected $primaryKey = "donor_id";
    public $timestamps = false;

    public function material()
    {
    	return $this->hasMany(Material::class);
    }
    public function donor_name()
    {
    	return $this->belongsTo(Donor_Name::class);
    }
}
