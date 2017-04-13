<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Material;
use \App\MaterialType;
use \App\Author;
use \App\Tags;
use \App\Publisher;
use \App\Publisher_Name;
use \App\Address;
use \App\Donor;
use \App\Donor_Name;
use \App\Purchase_Detail;
use \App\Thesis;
use \App\School;
use \App\Course;
use \App\Photo;
use \App\Photographer;
use \App\Multimedia;
use \App\Director;
use \App\Producer;
use \App\User;

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

class AddController extends Controller
{

    public function checkAcq($number, $original, $change){
        // editing
        if($change == true){
            if($number == $original){
                $acq = null;
            }
            else{
                $acq= Material::find($number);
            }
        }
        // adding
        else{
            $acq= Material::find($number);
        }
        return response()->json([
            'original' => $original,
            'accessionNumber' => $acq,
            'params' => $change,
        ]);
    }

    public function addInventory(Request $request){
        $category = $request->category;
        $acqNumber = $request->acqNumber;
        $object = $request->object;
        $english_names = explode(',', $request->engNames);
        $venacular_names = explode(',', $request->venNames);
        $owner_first_name = $request->input('owner-firstname');
        $owner_middle_name = $request->input('owner-middlename');
        $owner_last_name = $request->input('owner-lastname');
        $owner_nickname = $request->input('owner-nickname');
        $owner_locality = $request->local;
        $unit = $request->unit;
        $length = $request->length;
        $width = $request->width;
        $condition = $request->condition;
        $materials = explode(',', $request->materials);
        $colors = explode(',', $request->colors);
        $decorations = explode(',', $request->decorations);
        $marks = explode(',', $request->marks);
        $acquisition = $request->input('acquisition-mode');
        $donor_firstname = $request->input('donor-firstname');
        $donor_middlename = $request->input('donor-middlename');
        $donor_lastname = $request->input('donor-lastname');
        $donor_date = $request->input('donated-date');
        $amount = $request->amount;
        $address = $request->address;
        $purchased_date = $request->input('purchased-date');
        $picture = $request->pic;

        if($picture){
            $ext = $picture->extension();
            $extension = $acqNumber . '.' . $ext;
            $picture->storeAs('public/', $extension, 'local');
            $inventory_picture = new InventoryPictures;
            $inventory_picture->acqNumber = $acqNumber;
            $inventory_picture->name = $acqNumber;
            $inventory_picture->extension = $ext;
            $inventory_picture->save();
        }

        $inventory = new Inventory;
        $inventory->acqNumber = $acqNumber;
        $inventory->object = $object;

        for($i=0;$i<sizeof($english_names);$i++){
            $english_name = English_Name::firstorNew(['english_name' => $english_names[$i]]);
            $english_name->save();
            $inventory->english_name()->attach($english_name->english_name_id);
        }

        for($i=0;$i<sizeof($venacular_names);$i++){
            $venacular_name = Venacular_Name::firstorNew(['venacular_name' => $venacular_names[$i]]);
            $venacular_name->save();
            $inventory->venacular_name()->attach($venacular_name->venacular_name_id);
        }

        $inventory->conditions = $condition;

        $inventory_type = new Inventory_Type;
        $type = $inventory_type::where('type', $category)->first();
        $inventory->inventory_type_id = $type->getKey();

        $owner = new Owner;
        $owner = Owner::firstorNew(['firstname' => $owner_first_name, 'middlename' => $owner_middle_name, 'lastname' => $owner_last_name]);
        $local_address = Address::firstorNew(['address_name' => $owner_locality]);
        $local_address->save();
        $owner->nickname = $owner_nickname;
        $owner->address_id = $local_address->getKey();
        $owner->save();
        $inventory->owner_id = $owner->getKey();

        if($acquisition == 'donated'){
            $donor_name = Donor_Name::firstorNew([
                'firstname' => $donor_firstname, 
                'middlename' => $donor_middlename, 
                'lastname' => $donor_lastname
            ]);
            $donor_name->save();
            $donor = new InventoryDonor;
            $donor->donor_name_id = $donor_name->donor_name_id;
            $donor->donor_date = $donor_date;
            $donor->save();
            $inventory->donor_id = $donor->getKey();
            $inventory->save();            
        }
        else if($acquisition == 'purchased'){
            $purchase_detail = new InventoryPurchasedDetails;
            $purchase_detail->amount = $amount;
            $purchased_address = Address::firstorNew(['address_name' => $address]);
            $purchased_address->save();
            $purchase_detail->address_id = $purchased_address->address_id;
            $purchase_detail->purchased_date =$purchased_date;
            $inventory->save();
            $purchase_detail->acqNumber = $inventory->getKey();
            $purchase_detail->save();         
        }

        $measurement = new Measurement;
        $measurement->length = $length;
        $measurement->width = $width;
        $measurement->unit = $unit;
        $measurement->acqNumber = $inventory->getKey();
        $measurement->save();

        for($i=0;$i<sizeof($materials);$i++){
            $material = Invent_Material::firstorNew(['material_name' => $materials[$i]]);
            $material->save();
            $material->inventory()->attach($inventory->getKey());
        }

        for($i=0;$i<sizeof($colors);$i++){
            $color = Color::firstorNew(['color_name' => $colors[$i]]);
            $color->save();
            $color->inventory()->attach($inventory->getKey());
        }

        for($i=0;$i<sizeof($decorations);$i++){
            $decoration = Decoration::firstorNew(['decoration_name' => $decorations[$i]]);
            $decoration->save();
            $decoration->inventory()->attach($inventory->getKey());
        }

        for($i=0;$i<sizeof($marks);$i++){
            $mark = Mark::firstorNew(['mark_name' => $marks[$i]]);
            $mark->save();
            $mark->inventory()->attach($inventory->getKey());
        }
        return back()->with('status', $object . ' added successfully!');
    }

    public function addMaterial(Request $request){
        $category = $request->input('category');
        $category = trim($category);
        $material = Material::firstorNew(['acqNumber' => trim($request->input('acqNumber'))]);
        $material_type = new MaterialType;
        $type = $material_type::where('type', '=', $category)->first();
        $material->material_type_id = $type->getKey();
        $material->title = trim($request->input('title'));
        if($category != 'Photographs' && $category != 'Compact Discs' 
        && $category != 'Digital Versatile Discs' && $category != 'Video Home Systems' && $category != 'Cassette Tapes'){
            $authors = explode(',', $request->input('authors'));
            for($i=0;$i<sizeof($authors); $i+=3){
                $author = new Author;
                $author = Author::firstorNew(['firstname' => trim($authors[$i]), 'middlename' => trim($authors[$i + 1]), 'lastname' => trim($authors[$i + 2])]);
                $author->save();
                $material->author()->attach($author->author_id);
            }
        }

        $tags = explode(',', $request->input('tags'));
        for($i=0;$i<sizeof($tags);$i++){
            if($tags[$i] != ''){
                $tag = Tags::firstorNew(['tag_name' => trim($tags[$i])]);
                $tag->save();
                $material->tags()->attach($tag->tags_id);
            }
        }

        if($request->input('publish-status') == 'published'){
            $publisher_name = Publisher_Name::firstorNew(['publisher_name' => trim($request->input('publisher'))]);
            $address = Address::firstorNew(['address_name' => trim($request->input('place'))]);
            $publisher_name->save();
            $address->save();            
            $publisher = new Publisher;
            $publisher->publisher_name_id = $publisher_name->publisher_name_id;
            $publisher->address_id = $address->address_id;
            $publisher->year = trim($request->input('published-year'));
            $publisher->save();
            $material->publisher_id = $publisher->publisher_id;
        }

        if($request->input('acquisition-mode') == 'donated'){
            $donor_name = Donor_Name::firstorNew([
                'firstname' => trim($request->input('donor-firstname')), 
                'middlename' => trim($request->input('donor-middlename')), 
                'lastname' => trim($request->input('donor-lastname'))
            ]);
            $donor_name->save();
            $donor = new Donor;
            $donor->donor_name_id = $donor_name->donor_name_id;
            $donor->year = trim($request->input('donated-year'));
            $donor->save();
            $material->donor_id = $donor->getKey();
            $material->save();
        }
        else if($request->input('acquisition-mode') == 'purchased'){
            $purchase_detail = new Purchase_Detail;
            $purchase_detail->amount = trim($request->input('amount'));
            $purchased_address = Address::firstorNew(['address_name' => trim($request->input('address'))]);
            $purchased_address->save();
            $purchase_detail->address_id = $purchased_address->address_id;
            $purchase_detail->year = trim($request->input('purchased-year'));
            $material->save();
            $purchase_detail->acqNumber = $material->getKey();
            $purchase_detail->save();
        }

        if($category == 'Thesis'){
            $course = Course::firstorNew(['name' => trim($request->input('course'))]);
            $course->save();
            $school = School::firstorNew(['name' => trim($request->input('school'))]);
            $school->save();
            $thesis = new Thesis;
            $thesis->acqNumber = $material->getKey();
            $thesis->course_id = $course->course_id;
            $thesis->school_id = $school->school_id;
            $thesis->save();
        }
        else if($category == 'Photographs'){
            $photographer = Photographer::firstorNew([
                'firstname' => trim($request->input('author-firstname')), 
                'middlename' => trim($request->input('author-middlename')), 
                'lastname' => trim($request->input('author-lastname'))
            ]);
            $photographer->save();
            $photo = new Photo;
            $photo->photographer_id = $photographer->getKey();
            $photo->acqNumber = $material->getKey();
            $photo->year = trim($request->input('year'));
            $category = trim($request->input('description'));
            if($category == ''){
            }
            else{
                $photo->description = $category;
            }
            $photo->size = trim($request->input('size'));
            $photo->size_type = trim($request->input('size-type'));
            $photo->save();
        }
        else if($category == 'Compact Discs' || $category == 'Digital Versatile Discs' || $category == 'Video Home Systems' || $category == 'Cassette Tapes'){
            $multimedia = new Multimedia;
            $multimedia->acqNumber = $material->getKey();
            $hour = $request->input('hours');
            $minute = $request->input('minutes');
            $second = $request->input('seconds');
            $array1 = [$hour, $minute, $second];
            $time = $hour . ':' . $minute . ':' . $second;
            $time = strtotime($time);
            $multimedia->duration = date('H:i:s', $time);
            $multimedia->save();
            $directors = explode(',', $request->input('authors'));
            for($i=0;$i<sizeof($directors); $i+=3){
                $director = Director::firstorNew(['firstname' => trim($directors[$i]), 'middlename' => trim($directors[$i + 1]), 'lastname' => trim($directors[$i + 2])]);
                $director->save();
                $material->director()->attach($director->director_id);
            }
            $producers = explode(',', $request->input('producers'));
            if(sizeof($producers) >= 3){
                for($i=0;$i<sizeof($producers); $i+=3){
                    $producer = Producer::firstorNew(['firstname' => trim($producers[$i]), 'middlename' => trim($producers[$i + 1]), 'lastname' => trim($producers[$i + 2])]);
                    $producer->save();
                    $material->producer()->attach($producer->producer_id);
                }
            }            
        }
        $title = trim($request->input('title'));

        $user = User::find(Auth::user()->username);
        $user->modify()->attach($request->acqNumber);

        return back()->with('status', $title . ' added successfully!');
    }
}