<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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

use App\Donor_Name;

use \App\Inventory;
use \App\Inventory_Type;
use \App\Owner;
use \App\Measurement;
use \App\English_Name;
use \App\Venacular_Name;
use \App\Invent_Material;
use \App\Color;
use \App\Decoration;
use \App\Mark;
use \App\InventoryDonor;
use \App\InventoryPurchasedDetails;
use \App\InventoryPictures;

class ViewController extends Controller
{
    public function userDashboard(){
        if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
            return view('admin.user', ['user' => Auth::user()->type]);
        }
    }

    public function materialDashboard(){
            if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
                return view('admin.material');
            }
    }

    public function inventoryDashboard(){
            if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
                return view('admin.inventory');
            }        
    }

    public function dashboard(){
        if(Auth::check()){
            if (Auth::user()->type == "admin" || Auth::user()->type == "staff"){
                return view('dashboard');
            }
            else if(Auth::user()->type == "student"){
                $borrowed = DB::table('borrowed')->where('username', Auth::user()->username)
                ->where(function ($query) {
                    $query->where('status', 'borrowed')
                               ->orWhere('status', 'checked out');
                })->get()->count();
                return view('student.student', ['borrowed' => $borrowed]);
            }
        }
        else{
            return view('layout');
        }
    }

    public function retrieveUsers(){
        $users = DB::table('users')->where('institution', '!=', 'University of the Philippines Visayas')->orderBy('username', 'asc')->get();
        return $users;
    }

    public function showInventory(){
        $inventory = DB::table('inventories')->orderBy('acqNumber', 'desc')->get();
        $type = $this->getInventoryType($inventory);
        return response()->json([
            'inventory' => $inventory,
            'type' => $type
        ]);
    }

    public function showOwners(){
        $owners = DB::table('owners')->get();

        return response()->json([
            'owner' => $owners 
        ]);
    }

    public function showDonors(){
        $donors = DB::table('inventory_donors')->get();
        $donor_name_array = [];
        foreach($donors as $donor){
            $donor = Donor_Name::find($donor->donor_name_id);
            array_push($donor_name_array, $donor);
        }
        return response()->json([
            'donor' => $donor_name_array
        ]);
    }

    public function retrieveInventory(Inventory $acqNumber){
        $category = $acqNumber->inventory_type->type;
        $accession = $acqNumber;
        $object = $acqNumber->object;
        $donor_id = $acqNumber->donor_id;
        $donor_firstname = '';
        $donor_middlename = '';
        $donor_lastname = '';
        $donor_date = '';
        $amount = '';
        $purchased_address = '';
        $purchased_date = '';
        $picture = '';
        $pic_name = '';

        $englishNameArray = [];
        for($i=0;$i<sizeof($acqNumber->english_name);$i++){
            array_push($englishNameArray, $acqNumber->english_name[$i]->english_name);
        }

        $venNameArray = [];
        for($i=0;$i<sizeof($acqNumber->venacular_name);$i++){
            array_push($venNameArray, $acqNumber->venacular_name[$i]->venacular_name);
        }

        $owner_first_name = $acqNumber->owner->firstname;
        $owner_middle_name = $acqNumber->owner->middlename;
        $owner_last_name = $acqNumber->owner->lastname;
        $owner_nickname = $acqNumber->owner->nickname;
        $address = $acqNumber->owner->address->address_name;

        $unit = $acqNumber->measurement->unit;
        $length = $acqNumber->measurement->length;
        $width = $acqNumber->measurement->width;

        $condition = $acqNumber->conditions;

        $materialArray = [];
        for($i=0;$i<sizeof($acqNumber->materials);$i++){
            array_push($materialArray, $acqNumber->materials[$i]->material_name);
        }

        $colorArray = [];
        for($i=0;$i<sizeof($acqNumber->color);$i++){
            array_push($colorArray, $acqNumber->color[$i]->color_name);
        }

        $decorArray = [];
        for($i=0;$i<sizeof($acqNumber->decoration);$i++){
            array_push($decorArray, $acqNumber->decoration[$i]->decoration_name);
        }

        $markArray = [];
        for($i=0;$i<sizeof($acqNumber->mark);$i++){
            array_push($markArray, $acqNumber->mark[$i]->mark_name);
        }

        if($donor_id != ''){
            $donor_firstname = $acqNumber->donor->donor_name->firstname;
            $donor_middlename = $acqNumber->donor->donor_name->middlename;
            $donor_lastname = $acqNumber->donor->donor_name->lastname;
            $donor_date = $acqNumber->donor->donor_date;
        }
        else{
            $amount = $acqNumber->purchased_detail->amount;
            $purchased_address = $acqNumber->purchased_detail->address->address_name;
            $purchased_date = $acqNumber->purchased_detail->purchased_date;
        }

        if($acqNumber->picture != ''){
            $name = $acqNumber->picture->name;
            $extension = $acqNumber->picture->extension;            
            $pic_name = $name . '.' . $extension;
            $picture = Storage::url($pic_name);
        }

        return response()->json([
            'category' => $category,
            'accession' => $accession,
            'object' => $object,
            'english_name' => $englishNameArray,
            'venacular_name' => $venNameArray,
            'owner_firstname' => $owner_first_name,
            'owner_middlename' => $owner_middle_name,
            'owner_lastname' => $owner_last_name,
            'owner_nickname' => $owner_nickname,
            'locality' => $address,
            'unit' => $unit,
            'length' => $length,
            'width' => $width,
            'condition' => $condition,
            'material' => $materialArray,
            'color' => $colorArray,
            'decoration' => $decorArray,
            'mark' => $markArray,
            'donor_firstname' => $donor_firstname,
            'donor_middlename' => $donor_middlename,
            'donor_lastname' => $donor_lastname,
            'donor_date' => $donor_date,
            'amount' => $amount,
            'purchased_address' => $purchased_address,
            'purchased_date' => $purchased_date,
            'picture' => $picture,
            'picture_name' => $pic_name,
        ]);
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
}
