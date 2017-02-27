<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentNumber extends Model
{
    protected $table = "student_number";
    protected $primaryKey = "student_number";
    public $timestamps = false;
    
    protected $fillable = [
    	"student_number"
    ];

    public function add($student_number){
    	return self::firstorCreate(['student_number' => $student_number]);
    }
}
