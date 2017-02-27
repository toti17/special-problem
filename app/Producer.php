<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    protected $table ="producer";
    protected $primaryKey = "producer_id";
    protected $fillable = ['firstname', 'middlename', 'lastname'];
    public $timestamps = false;

    public function material()
    {
    	return $this->belongsToMany(Material::class, 'produced', 'producer_id', 'acqNumber');
    }
}
