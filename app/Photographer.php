<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photographer extends Model
{
    protected $table ="photographer";
    protected $primaryKey = "photographer_id";
    protected $fillable = ['firstname', 'middlename', 'lastname'];
    public $timestamps = false;

    public function photo()
    {
    	return $this->hasMany(Photo::class);
    }
}