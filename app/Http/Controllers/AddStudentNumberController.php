<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StudentNumber;
use DB;

class AddStudentNumberController extends Controller
{
    public function add(Request $request)
    {
    	$student_number_array = explode(',', $request->studentnumber);
    	for($i=0;$i<sizeof($student_number_array); $i++){
                $student_number = new StudentNumber;
                $student_number->add($student_number_array[$i]);
    	}
    	return redirect ('dashboard/user')->with('studentnumberStatus', 'Successfully added Student Number!');
    }
}