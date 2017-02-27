<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Director extends Model
{
    protected $table ="director";
    protected $primaryKey = "director_id";
    protected $fillable = ['firstname', 'middlename', 'lastname'];
    public $timestamps = false;

    public function material()
    {
    	return $this->belongsToMany(Material::class, 'directed', 'director_id', 'acqNumber');
    }
}
