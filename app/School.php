<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    protected $table ="school";
    protected $primaryKey = "school_id";
    protected $fillable = ['name'];
    public $timestamps = false;

    public function thesis()
    {
    	return $this->hasMany(Thesis::class, 'school_id');
    }
    public function user()
    {
    	return $this->belongsTo(User::class);
    }
}
