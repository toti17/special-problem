<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
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

class AddController extends Controller
{
    public function checkAcq($acqNumber){
        $material = new Material;
        $acq = $material::find($acqNumber);
        return response()->json([
            'accessionNumber' => $acq,
        ]);
    }
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
           	'acqNumber' => 'unique:material|max:50',
            'title' => 'required|max:50',
            'publisher' => 'max:50',
            'published-year' =>'size:4|regex:/\d/',
            'place' => 'max:50',
            'donor-firstname' => 'max:50',
            'donor-middlename' => 'max:50',
            'donor-lastname' => 'max:50',
            'donated-year' => 'size:4|regex:/\d/',
            'amount' => 'max:50|regex:/^[\d,]*(\.\d*)?$/',
            'purchased-year' => 'size:4|regex:/\d/',
            'address' => 'max:50',
            'school' => 'max:50',
            'course' => 'max:50',
            'size' => 'max:10',
            'year' => 'size:4|regex:/\d/',
            'description' => 'max:100',
        ]);

        if($validator->fails()){
            return back()->withInput()->withErrors($validator);
        }

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
        return back()->with('status', $title . ' added successfully!');
    }
}