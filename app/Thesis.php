<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thesis extends Model
{
    protected $table ="thesis";
    protected $primaryKey = "thesis_id";
    protected $fillable=['acqNumber', 'course_id', 'school_id'];
    public $timestamps = false;
    
    public function material()
    {
    	return $this->belongsTo(Material::class, 'acqNumber');
    }
    public function course()
    {
    	return $this->belongsTo(Course::class);
    }
    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
