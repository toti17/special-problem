<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use \App\StudentNumber;
class RegisterController extends Controller
{

    public function confirmAccount(User $username, $confirmStatus)
    {
        $username->status = $confirmStatus;
        $username->save();
    }

    public function studentregister()
    {
    	return view("auth.register");
    }

    public function register(Request $request)
    {
    	$this->validate($request, [
            'firstname' => 'required|max:255',
            'middlename' => 'required|max:255',
            'lastname' => 'required|max:255',
            'username' => 'required|max:9|unique:users',
            'email' => 'required|max:50|unique:users,email',
            'institution' => '|max:100',
            'password' => 'required|min:6|confirmed',    		
    	]);

        $school = $request->input('institution');
        $studentNumber = StudentNumber::where('student_number', '=', $request->input('username'))->first();
        if(Auth::check() && Auth::user()->type == "admin"){
            User::create([
                'firstname' => $request->input('firstname'),
                'middlename' => $request->input('middlename'),
                'lastname' => $request->input('lastname'),
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'institution' => $request->input('institution'),
                'type' => $request->input('type'),
                'status' => $request->input('status'),
                'password' => bcrypt($request->input('password')),
            ]);
            if($request->input('type') == 'student'){
                $addStudentNumber = new StudentNumber();
                $addStudentNumber->add($request->input('username'));
            }
            return redirect('/dashboard/user')->with('status', 'Registration Successful!');
        }
        else{
            if($school == "University of the Philippines Visayas"){
                if($studentNumber){
                    User::create([
                        'firstname' => $request->input('firstname'),
                        'middlename' => $request->input('middlename'),
                        'lastname' => $request->input('lastname'),
                        'username' => $request->input('username'),
                        'email' => $request->input('email'),
                        'institution' => $request->input('institution'),
                        'type' => $request->input('type'),
                        'status' => $request->input('status'),
                        'password' => bcrypt($request->input('password')),
                    ]);
                    if(Auth::attempt(['username' => $request->input('username'), 'password' => $request->input('password')])){
                        return redirect('/dashboard/student')->with('status', 'Registration Successful!');
                    }                                         
                }
                else{
                    return redirect()->back()->with('error', "Student number doesn't exist.");
                }
            }
            else{
                    User::create([
                        'firstname' => $request->input('firstname'),
                        'middlename' => $request->input('middlename'),
                        'lastname' => $request->input('lastname'),
                        'username' => $request->input('username'),
                        'email' => $request->input('email'),
                        'institution' => $request->input('institution'),
                        'type' => $request->input('type'),
                        'status' => $request->input('status'),
                        'password' => bcrypt($request->input('password')),
                    ]);
            }       
        }
    }
}