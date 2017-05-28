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

use \App\ViewTransaction;

class ViewController extends Controller
{
    public function about(){
        return view('about');
    }
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

                $vertical_count = Material::where('material_type_id', 1)->orWhere('material_type_id', 2)
                ->orWhere('material_type_id', 3)->get()->count();

                $vertical_files = Material::where('material_type_id', 1)->orWhere('material_type_id', 2)
                ->orWhere('material_type_id', 3)->get();

                $vertical_copy_count = 0;
                foreach($vertical_files as $vertical){
                    $vertical_copy_count += count($vertical->material_copy);
                }

                $vertical_count += $vertical_copy_count;

                $book_count = Material::where('material_type_id', 4)->orWhere('material_type_id', 5)->get()->count();

                $book = Material::where('material_type_id', 4)->orWhere('material_type_id', 5)->get();

                $book_copy_count = 0;
                foreach($book as $boo){
                    $book_copy_count += count($boo->material_copy);
                }

                $book_count += $book_copy_count;

                $thesis_count = Material::where('material_type_id', 6)->get()->count();

                $thesis = Material::where('material_type_id', 6)->get();

                $thesis_copy_count = 0;
                foreach($thesis as $the){
                    $thesis_copy_count += count($the->material_copy);
                }

                $thesis_count += $thesis_copy_count;

                $periodical_count = Material::where('material_type_id', 7)->orWhere('material_type_id', 8)->orWhere('material_type_id', 9)
                ->orWhere('material_type_id', 10)->get()->count();

                $periodical = Material::where('material_type_id', 7)->orWhere('material_type_id', 8)->orWhere('material_type_id', 9)
                ->orWhere('material_type_id', 10)->get();

                $periodical_copy_count = 0;
                foreach($periodical as $period){
                    $periodical_copy_count += count($period->material_copy);
                }

                $periodical_count += $periodical_copy_count;

                $picture_count = Material::where('material_type_id', 11)->get()->count();

                $picture = Material::where('material_type_id', 11)->get();

                $picture_copy_count = 0;
                foreach($picture as $pic){
                    $picture_copy_count += count($pic->material_copy);
                }

                $picture_count += $picture_copy_count;

                $multimedia_count = Material::where('material_type_id', 12)->orWhere('material_type_id', 13)->orWhere('material_type_id', 14)
                ->orWhere('material_type_id', 15)->get()->count();

                $multimedia = Material::where('material_type_id', 12)->orWhere('material_type_id', 13)->orWhere('material_type_id', 14)
                ->orWhere('material_type_id', 15)->get();

                $multimedia_copy_count = 0;
                foreach($multimedia as $mult){
                    $multimedia_copy_count += count($mult->material_copy);
                }

                $multimedia_count += $multimedia_copy_count;

                $material_count = $vertical_count + $book_count + $thesis_count + $periodical_count + $picture_count + $multimedia_count;

                $artifact_count = Inventory::where('inventory_type_id', 1)->get()->count();

                $textile_count = Inventory::where('inventory_type_id', 2)->get()->count();

                $farming_count = Inventory::where('inventory_type_id', 3)->get()->count();

                $fishing_count = Inventory::where('inventory_type_id', 4)->get()->count();

                $inventory_count = $artifact_count + $textile_count + $farming_count + $fishing_count;

                $check_out_count = DB::table('borrowed')->where('status', 'checked out')->get()->count();

                $pending_count = DB::table('borrowed')->where('status', 'pending')->get()->count();

                $confirmed_count = User::where('status', 'confirmed')->get()->count();

                $unconfirmed_count = User::where('status', 'unconfirmed')->get()->count();


                return view('home',
                [
                    'vertical_count' => $vertical_count,
                    'book_count' => $book_count,
                    'thesis_count' => $thesis_count,
                    'periodical_count' => $periodical_count,
                    'picture_count' => $picture_count,
                    'multimedia_count' => $multimedia_count,
                    'material_count' => $material_count,
                    'artifact_count' => $artifact_count,
                    'textile_count' => $textile_count,
                    'farming_count' => $farming_count,
                    'fishing_count' => $fishing_count,
                    'inventory_count' => $inventory_count,
                    'check_count' => $check_out_count,
                    'pending_count' => $pending_count,
                    'confirmed_count' => $confirmed_count,
                    'unconfirmed_count' => $unconfirmed_count
                ]);
            }
            else if(Auth::user()->type == "user"){
                $borrowed = DB::table('borrowed')->where('username', Auth::user()->username)
                ->where(function ($query) {
                    $query->where('status', 'borrowed')
                               ->orWhere('status', 'checked out');
                })->get()->count();
                return view('student.student', ['borrowed' => $borrowed]);
            }
        }
        else{      
            return view('index');
        }
    }

    public function retrieveUsers(){
        $users = DB::table('users')->where('institution', '!=', 'University of the Philippines Visayas')->orderBy('status', 'desc')->get();
        return $users;
    }

    public function showInventory(){
        $inventory = DB::table('inventories')->orderBy('acqNumber', 'asc')->get();
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
        $location = $acqNumber->location->location_name;
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
            $picture = '/inventory/' . $pic_name;
        }

        $user = DB::table('modified')->where('acqNumber', $acqNumber->acqNumber)->orderBy('updated_at', 'desc')->select('username')->first();
        $username = User::where('username', $user->username)->first();
        $fullname = $username->firstname . ' ' . $username->middlename . ' ' . $username->lastname;

        return response()->json([
            'username' => $fullname,
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
            'location' => $location,
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

        $username = Auth::user()->username;
        $user_type = Auth::user()->type;

        if($user_type == 'user'){
            ViewTransaction::create([
                'acqNumber' => $acqNumber->acqNumber,
                'username' => $username,
                'date' =>  date("Y-m-d"),
            ]);
        }

        $pic_name = '';
        $authors = [];
        $directors =[];
        $producers = [];
        $tags =[];
        $picture = '';

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
            $school = $acqNumber->thesis->school->name;
            $course =  $acqNumber->thesis->course->name;
        }
        else{
            $school ='';
            $course='';
        }
        if($acqNumber->material_type->type == 'Photographs'){
            $size = $acqNumber->photo->size;
            $type = $acqNumber->photo->size_type;
            $year = $acqNumber->photo->year;
            $firstname = $acqNumber->photo->photographer->firstname;
            $middlename = $acqNumber->photo->photographer->middlename;
            $lastname = $acqNumber->photo->photographer->lastname;

            if($acqNumber->photo->material_picture != ''){
                $name = $acqNumber->photo->material_picture->name;
                $extension = $acqNumber->photo->material_picture->extension;            
                $pic_name = $name . '.' . $extension;
                $picture = '/material/' . $pic_name;
            }               
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
            $duration = $acqNumber->multimedia->duration;
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

        $donor_firstnames = [];
        $donor_middlenames = [];
        $donor_lastnames = [];
        $donor_copies = [];
        $donor_dates = [];

        for($i=0;$i<sizeof($acqNumber->donor);$i++){
            array_push($donor_firstnames, $acqNumber->donor[$i]->donor_name->firstname);
            array_push($donor_middlenames, $acqNumber->donor[$i]->donor_name->middlename);
            array_push($donor_lastnames, $acqNumber->donor[$i]->donor_name->lastname);
            array_push($donor_copies, $acqNumber->donor[$i]->copy);
            array_push($donor_dates, $acqNumber->donor[$i]->date);
        }

        $purch_copies = [];
        $purch_amounts = [];
        $purch_dates = [];
        $purch_addresses = [];

        for($i=0;$i<sizeof($acqNumber->purchased_details);$i++){
            array_push($purch_copies, $acqNumber->purchased_details[$i]->copy);
            array_push($purch_amounts, $acqNumber->purchased_details[$i]->amount);
            array_push($purch_dates, $acqNumber->purchased_details[$i]->date);
            array_push($purch_addresses, $acqNumber->purchased_details[$i]->address->address_name);
        }

        $user = DB::table('modified')->where('acqNumber', $acqNumber->acqNumber)->orderBy('updated_at', 'desc')->select('username')->first();
        $username = User::where('username', $user->username)->first();
        $fullname = $username->firstname . ' ' . $username->middlename . ' ' . $username->lastname;
        return response()->json([
            'user' => $fullname,
            'category' => $acqNumber->material_type->type,
            'acqNumber' => $acqNumber->acqNumber,
            'title' => $acqNumber->title,
            'description' => $acqNumber->description,
            'location' =>$acqNumber->location->location_name,
            'copy' =>$acqNumber->copy_count,
            'authors' => $authors,
            'directors' => $directors,
            'producers' => $producers,
            'tags' => $tags,
            'publisher_name' => $publisher_name,
            'publisher_year' => $publisher_year,
            'publisher_place' => $publisher_place,
            'donor_firstnames' => $donor_firstnames,
            'donor_middlenames' => $donor_middlenames,
            'donor_lastnames' => $donor_lastnames,
            'donor_copies' => $donor_copies,
            'donor_dates' => $donor_dates,
            'purch_copies' => $purch_copies,
            'purch_amounts' => $purch_amounts,
            'purch_dates' => $purch_dates,
            'purch_addresses' => $purch_addresses,
            'course' => $course,
            'school' => $school,
            'photo_size' => $size,
            'photo_type' => $type,
            'photo_year' => $year,
            'photo_firstname' => $firstname,
            'photo_middlename' => $middlename,
            'photo_lastname' => $lastname,
            'duration' => $duration,
            'picture' => $picture,
            'picname' => $pic_name,
        ]);
    }
}