<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table ="course";
    protected $primaryKey = "course_id";
    protected $fillable = ['name'];
    public $timestamps = false;

    public function thesis()
    {
    	return $this->hasMany(Thesis::class);
    }
}
