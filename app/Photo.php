<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $table ="photo";
    protected $primaryKey = "photo_id";
    protected $fillable = ['photographer_id', 'acqNumber', 'year', 'description', 'size', 'size_type'];
    public $timestamps = false;

    public function material()
    {
    	return $this->belongsTo(Material::class, 'acqNumber');
    }
    public function photographer()
    {
    	return $this->belongsTo(Photographer::class);
    }
}