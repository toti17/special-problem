<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use DB;
use App\Author;
use App\Material;
use App\Publisher;
use App\Address;
use App\Donor;
use App\Users;
use App\Staff;
use App\Book;
use App\Photo;
use App\Photographer;
use App\Periodicals;
use App\Thesis;
use App\User;

class ViewController extends Controller
{
    public function userDashboard(){
        if(Auth::check()){
            if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
                // $users = DB::table('users')->where('institution', '!=', 'University of the Philippines Visayas')->orderBy('username', 'asc')->paginate(5);
                // return view('admin.user', ['users' => $users]);
                return view('admin.user');
            }
        }
    }

    public function retrieveUsers(){
        $users = DB::table('users')->where('institution', '!=', 'University of the Philippines Visayas')->orderBy('username', 'asc')->get();
        return $users;
    }

    public function materialDashboard(Request $request){
        if(Auth::check()){
            if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
                $materials = DB::table('material')->orderBy('title', 'asc')->paginate(5, ['*'], 'material');
                $borrowed_materials = DB::table('borrowed')->orderBy('borrowed_datetime','asc')->paginate(5, ['*'], 'borrowed');
                $title = DB::table('material')->select('title')->join('borrowed', 'material.acqNumber', 'borrowed.acqNumber')->get();
                return view('admin.material', [
                    'materials' => $materials,
                    'borrowed_materials' => $borrowed_materials,
                    'title' => $title,
                ]);
            }
        }
    }

    public function viewMaterial(Material $acqNumber){
        $authors = [];
        $directors =[];
        $producers = [];
        $tags =[];
        for($i=0;$i<sizeof($acqNumber->author);$i++){
            array_push($authors, $acqNumber->author[$i]->firstname);
            array_push($authors, $acqNumber->author[$i]->middlename);
            array_push($authors, $acqNumber->author[$i]->lastname);
        }
        for($i=0;$i<sizeof($acqNumber->tags);$i++){
            array_push($tags, $acqNumber->tags[$i]->tag_name);
        }
        if($acqNumber->publisher_id == ''){
            $publisher_name='';
            $publisher_year='';
            $publisher_place='';
        }
        else{
            $publisher_name = $acqNumber->publisher->publisher_name->publisher_name;
            $publisher_year = $acqNumber->publisher->year;
            $publisher_place = $acqNumber->publisher->address->address_name;
        }
        if($acqNumber->material_type->type == 'Thesis'){
            $school = $acqNumber->thesis->first()->school->name;
            $course =  $acqNumber->thesis->first()->course->name;
        }
        else{
            $school ='';
            $course='';
        }
        if($acqNumber->material_type->type == 'Photographs'){
            $size = $acqNumber->photo->size;
            $type = $acqNumber->photo->size_type;
            $year = $acqNumber->photo->year;
            $description = $acqNumber->photo->description;
            $firstname = $acqNumber->photo->photographer->firstname;
            $middlename = $acqNumber->photo->photographer->middlename;
            $lastname = $acqNumber->photo->photographer->lastname;
        }
        else{
            $size = '';
            $year = '';
            $type='';
            $description = '';
            $firstname = '';
            $middlename = '';
            $lastname = '';       
        }
        if($acqNumber->material_type->type == 'Compact Discs' 
            || $acqNumber->material_type->type == 'Digital Versatile Discs' || $acqNumber->material_type->type == 'Video Home Systems' 
            || $acqNumber->material_type->type == 'Cassette Tapes'){
            $duration = $acqNumber->multimedia->first()->duration;
            for($i=0;$i<sizeof($acqNumber->director);$i++){
                array_push($directors, $acqNumber->director[$i]->firstname);
                array_push($directors, $acqNumber->director[$i]->middlename);
                array_push($directors, $acqNumber->director[$i]->lastname);
            }
            for($i=0;$i<sizeof($acqNumber->producer);$i++){
                array_push($producers, $acqNumber->producer[$i]->firstname);
                array_push($producers, $acqNumber->producer[$i]->middlename);
                array_push($producers, $acqNumber->producer[$i]->lastname);
            }            
        }
        else{
            $duration = '';
        }
        if($acqNumber->donor_id != ''){
            $donor_firstname = $acqNumber->donor->donor_name->firstname;
            $donor_middlename = $acqNumber->donor->donor_name->middlename;
            $donor_lastname = $acqNumber->donor->donor_name->lastname;
            $donor_year = $acqNumber->donor->year;
            $amount = '';
            $address = '';
            $purchased_year ='';
        }
        else{
            $amount = $acqNumber->purchased_details->amount;
            $address = $acqNumber->purchased_details->address->address_name;
            $purchased_year = $acqNumber->purchased_details->year;
            $donor_firstname = '';
            $donor_middlename = '';
            $donor_lastname = '';
            $donor_year = '';
        }
        return response()->json([
            'category' => $acqNumber->material_type->type,
            'acqNumber' => $acqNumber->acqNumber,
            'title' => $acqNumber->title,
            'authors' => $authors,
            'directors' => $directors,
            'producers' => $producers,
            'tags' => $tags,
            'publisher_name' => $publisher_name,
            'publisher_year' => $publisher_year,
            'publisher_place' => $publisher_place,
            'donor_firstname' => $donor_firstname,
            'donor_middlename' => $donor_middlename,
            'donor_lastname' => $donor_lastname,
            'donor_year' => $donor_year,
            'purchased_amount' => $amount,
            'purchased_address' => $address,
            'purchased_year' => $purchased_year,
            'course' => $course,
            'school' => $school,
            'photo_size' => $size,
            'photo_type' => $type,
            'photo_year' => $year,
            'photo_description' => $description,
            'photo_firstname' => $firstname,
            'photo_middlename' => $middlename,
            'photo_lastname' => $lastname,
            'duration' => $duration
        ]);
    }

    public function dashboard()
    {
        if(Auth::check()){
            if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
                return view('dashboard');
            }
            else if(Auth::user()->type == "student"){
                $materials = DB::table('material')->orderBy('title', 'asc')->paginate(5);
                return view('student.student', ['materials' => $materials]);
            }
        }
        else{
            return view('layout');
        }
    }

}
