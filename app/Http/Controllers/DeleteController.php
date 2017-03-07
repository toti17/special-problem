<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Material;
use App\Address;
use App\Publisher;
use App\Publisher_Name;
use App\Purchase_Detail;
use App\Donor;
use App\Donor_Name;
use App\Author;
use App\Thesis;
use App\Course;
use App\School;
use App\Tags;
use App\Photographer;
use App\Producer;
use App\Director;

class DeleteController extends Controller
{
   public function deleteMaterial(Material $acqNumber){
      $purchase_detail = new Purchase_Detail;
      $publisher = new Publisher;
      $address = new Address;
      $author = new Author;
      $tag = new Tags;
      $donor = new Donor;
      $donor_name = new Donor_Name;
      $thesis =new Thesis;
      $course = new Course;
      $school = new School;
      $photographer = new Photographer;
      $director = new Director;
      $producer = new Producer;
      $category = $acqNumber->material_type->type;
      if($acqNumber->donor_id != ''){
         $donor_name_id = $acqNumber->donor->donor_name_id;
         $donor_name_count = $donor::where('donor_name_id', '=', $donor_name_id)->get()->count();
         if($donor_name_count == 1){
            $donor_name::destroy($donor_name_id);
             $acqNumber->donor->delete();
         }
         else{
            $acqNumber->donor->delete();
         }
      }
      else{
         $purchased_address_id = $acqNumber->purchased_details->address_id;
         $purchased_address_count = $purchase_detail::where('address_id', $purchased_address_id)->get()->count();
         if($purchased_address_count > 1){
            $acqNumber->purchased_details->delete();
         }
         else if($purchased_address_count == 1){
            $total_address_count = DB::table('purchased_details')
               ->join('publisher', 'purchased_details.address_id', '=', 'publisher.address_id')
               ->select('publisher.address_id')->where('purchased_details.address_id', '=', $purchased_address_id)->get()->count();
            if($total_address_count == 0){
               $acqNumber->purchased_details->delete();
               $address::destroy($purchased_address_id);
            }
            else{
               $acqNumber->purchased_details->delete();
            }
         }
      }

      if($acqNumber->publisher_id != ''){
         $publisher_address_id = $acqNumber->publisher->address_id;
         $publisher_name_id = $acqNumber->publisher->publisher_name_id;
         $publisher_name_count = $publisher::where('publisher_name_id', $publisher_name_id)->get()->count();
         $publisher_address_count = $publisher::where('address_id', $publisher_address_id)->get()->count();
         if($publisher_name_count == 1){
            $publisher_name = new Publisher_Name;
            $publisher_name::destroy($publisher_name_id);
         }
         if($publisher_address_count == 1){
            $total_address_count = DB::table('publisher')
               ->join('purchased_details', 'publisher.address_id', '=', 'purchased_details.address_id')
               ->select('purchased_details.address_id')->where('publisher.address_id', '=', $publisher_address_id)->get()->count();
            if($total_address_count == 0){
               $acqNumber->publisher->delete();
               $address::destroy($publisher_address_id);
            }
         }
         $acqNumber->publisher->delete();
      }

      foreach($acqNumber->tags as $tags){
         if($tags->material->count() > 1){
            $acqNumber->tags()->detach($tags->tags_id);
         }
         else{
            $acqNumber->tags()->detach($tags->tags_id);
            $tag::destroy($tags->tags_id);
         }
      }

      if($category != 'Photographs' && $category != 'Compact Discs' && $category != 'Digital Versatile Discs' 
      && $category != 'Video Home Systems' && $category != 'Cassette Tapes'){
         foreach($acqNumber->author as $authors){
            if($authors->material->count() > 1){
               $acqNumber->author()->detach($authors->author_id);
            }
            else{
                $acqNumber->author()->detach($authors->author_id);
                $author::destroy($authors->author_id);
            }
         }
         if($category == 'Thesis'){
            $course_id = $acqNumber->thesis->course_id;
            $school_id = $acqNumber->thesis->school_id;
            $course_count = DB::table('thesis')
               ->select('course_id')->where('course_id', '=', $course_id)->get()->count();
            if($course_count == 1){
               $course::destroy($course_id);
            }
            $school_count = DB::table('thesis')
               ->select('school_id')->where('school_id', '=', $school_id)->get()->count();
            if($school_count ==1){
               $school::destroy($school_id);
            }
            $acqNumber->thesis->delete();
         }
      }
      else if($category == 'Photographs'){
         $photographer_id = $acqNumber->photo->photographer_id;
         $photographer_count = DB::table('photo')
            ->select('photographer_id')->where('photographer_id', '=', $photographer_id)->get()->count();
         if($photographer_count == 1){
            $photographer::destroy($photographer_id);
         }
         $acqNumber->photo->delete();
      }
      else{
         foreach($acqNumber->director as $directors){
            if($directors->material->count() > 1){
               $acqNumber->director()->detach($directors->director_id);
            }
            else{
               $acqNumber->director()->detach($directors->director_id);
               $director::destroy($directors->director_id);
            }
         }
         foreach($acqNumber->producer as $producers){
            if($producers->material->count() > 1){
               $acqNumber->producer()->detach($producers->producer_id);
            }
            else{
               $acqNumber->producer()->detach($producers->producer_id);
               $producer::destroy($producers->producer_id);
            }
            $acqNumber->multimedia->delete();
         }
      }

      $acqNumber->delete();

      // return response()->json($task);
   }
}