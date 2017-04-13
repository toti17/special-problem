<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Support\Facades\Auth;
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

class EditController extends Controller
{
   public function getAddressCount($address_id){
      $purchase_detail = new Purchase_Detail;
      $inventory_purchase_detail = new InventoryPurchasedDetails;
      $owner = new Owner;
      $publisher = new Publisher;
      $purchased_address_count = $purchase_detail::where('address_id', $address_id)->get()->count();
      $inventory_purchased_address_count = $inventory_purchase_detail::where('address_id', $address_id)->get()->count();
      $owner_address_count = $owner::where('address_id', $address_id)->get()->count();
      $publisher_address_count = $publisher::where('address_id', $address_id)->get()->count();
      $total_address_count = $purchased_address_count + $inventory_purchased_address_count + $owner_address_count + $publisher_address_count;
      if($total_address_count == 1){
         $this->deleteAddress($address_id);
      }
   }

   public function deleteAddress($address_id){
      $address = new Address;
      $address::destroy($address_id);
   }

    public function edit(Request $request, Material $acqNumber){
        $publisher = new Publisher;
        $new_address = new Address;
        $new_publisher_name = new Publisher_Name;
        $donor = new Donor;
        $donor_name = new Donor_Name;
        $inventory_donor = new InventoryDonor;
        $purchased_detail = new Purchase_Detail;
        $author = new Author;
        $tag = new Tags;
        $category = $request->category;

        function deleteMultimedia(Material $acqNumber){
            $director = new Director;
            $producer = new Producer;            
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
            }
            $acqNumber->multimedia->delete();             
        }

        function deletePictures(Material $acqNumber){
            $photographer = new Photographer;
            $photographer_id = $acqNumber->photo->photographer_id;
            $photographer_count = DB::table('photo')
                ->select('photographer_id')->where('photographer_id', '=', $photographer_id)->get()->count();
            if($photographer_count == 1){
                $photographer::destroy($photographer_id);
            }
            $acqNumber->photo->delete();
        }

        function deleteAuthors(Material $acqNumber){
            $author = new Author;
            foreach($acqNumber->author as $authors){
                if($authors->material->count() > 1){
                   $acqNumber->author()->detach($authors->author_id);
                }
                else{
                    $acqNumber->author()->detach($authors->author_id);
                    $author::destroy($authors->author_id);
                }          
            }
        }

        function addPhoto($request){
            $photographer = Photographer::firstorNew([
                'firstname' => trim($request->input('author-firstname')), 
                'middlename' => trim($request->input('author-middlename')), 
                'lastname' => trim($request->input('author-lastname'))
            ]);
            $photographer->save();
            $photo = new Photo;
            $photo->photographer_id = $photographer->getKey();
            $photo->acqNumber = $request->acqNumber;
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

        function addMultimedia($request, Material $acqNumber){
            $multimedia = new Multimedia;
            $multimedia->acqNumber = $request->acqNumber;
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
                $acqNumber->director()->attach($director->director_id);
                $acqNumber->director()->updateExistingPivot($director->director_id, ['acqNumber' => $request->acqNumber]);
            }
            $producers = explode(',', $request->input('producers'));
            if(sizeof($producers) >= 3){
                for($i=0;$i<sizeof($producers); $i+=3){
                    $producer = Producer::firstorNew(['firstname' => trim($producers[$i]), 'middlename' => trim($producers[$i + 1]), 'lastname' => trim($producers[$i + 2])]);
                    $producer->save();
                    $acqNumber->producer()->attach($producer->producer_id);
                    $acqNumber->producer()->updateExistingPivot($producer->producer_id, ['acqNumber' => $request->acqNumber]);
                }
            }                
        }

        if($category != 'Photographs' && $category != 'Compact Discs' && $category != 'Cassette Tapes' && $category != 'Video Home Systems' 
        && $category != 'Digital Versatile Discs'){
            if($acqNumber->photo != ''){
               deletePictures($acqNumber);
            }
            if($acqNumber->multimedia != ''){
                deleteMultimedia($acqNumber);
            }            
            if($category == 'Thesis'){
                if($acqNumber->thesis != ''){
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
                $course = Course::firstorNew(['name' => trim($request->input('course'))]);
                $course->save();
                $school = School::firstorNew(['name' => trim($request->input('school'))]);
                $school->save();
                $thesis = new Thesis;
                $thesis->acqNumber = $request->acqNumber;
                $thesis->course_id = $course->course_id;
                $thesis->school_id = $school->school_id;
                $thesis->save();                
            }
            deleteAuthors($acqNumber);
            $authors = explode(',', $request->input('authors'));
            $acqNumber_id = $acqNumber->acqNumber;            
            for($i=0;$i<sizeof($authors); $i+=3){
                $author = new Author;
                $author = Author::firstorNew(['firstname' => trim($authors[$i]), 'middlename' => trim($authors[$i + 1]), 'lastname' => trim($authors[$i + 2])]);
                $author->save();
                $acqNumber->author()->attach($author->author_id);
                $acqNumber->author()->updateExistingPivot($author->author_id, ['acqNumber' => $request->acqNumber]);
            }
        }
        else{
            if($acqNumber->multimedia != ''){
                deleteMultimedia($acqNumber);
            }
            if($acqNumber->author != ''){
                deleteAuthors($acqNumber);
            }
            if($acqNumber->photo != ''){
               deletePictures($acqNumber);
            }            
            if($category == 'Photographs'){
                addPhoto($request);
            }
            else{
                addMultimedia($request, $acqNumber);
            }     
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

        $tags = explode(',', $request->input('tags'));
        for($i=0;$i<sizeof($tags);$i++){
            if($tags[$i] != ''){
                $tag = Tags::firstorNew(['tag_name' => trim($tags[$i])]);
                $tag->save();
                $acqNumber->tags()->attach($tag->tags_id);
                $acqNumber->tags()->updateExistingPivot($tag->tags_id, ['acqNumber' => $request->acqNumber]);
            }
        }           

        if($request->input('publish-status') == 'published'){
            if($acqNumber->publisher_id != ''){
                $publisher_name = Publisher_Name::firstorNew(['publisher_name' => trim($request->publisher)]);
                if($publisher_name->publisher_name_id == ''){
                    $publisher_count = DB::table('publisher')
                        ->select('publisher_name_id')->where('publisher_name_id', $acqNumber->publisher->publisher_name_id)->get()->count();
                    if($publisher_count == 1){
                        $new_publisher_name::destroy($acqNumber->publisher->publisher_name_id);
                    }                
                }

                $publisher_name->save();

                $acqNumber->publisher->publisher_name_id = $publisher_name->publisher_name_id;

                $address = Address::firstorNew(['address_name' => trim($request->place)]);
                if($address->address_id == ''){
                    $this->getAddressCount($acqNumber->publisher->address_id);                
                }
                $address->save();
                $acqNumber->publisher->address_id = $address->getKey();
                $acqNumber->publisher->year = $request->input('published-year');
            }

            else if($acqNumber->publisher_id == ''){
                $publisher_name = Publisher_Name::firstorNew(['publisher_name' => trim($request->publisher)]);
                $address = Address::firstorNew(['address_name' => trim($request->place)]);
                $publisher_name->save();
                $address->save();
                $publisher->publisher_name_id = $publisher_name->getKey();
                $publisher->address_id = $address->getKey();
                $publisher->year = $request->input('published-year');
                $publisher->save();
                $acqNumber->publisher_id = $publisher->getKey();
            }
        }
        else if($request->input('publish-status') == 'unpublished'){
            if($acqNumber->publisher_id != ''){
                $publisher_name_count = DB::table('publisher')
                    ->select('publisher_name_id')->where('publisher_name_id', $acqNumber->publisher->publisher_name_id)->get()->count();
                if($publisher_name_count == 1){
                    $new_publisher_name::destroy($acqNumber->publisher->publisher_name_id);
                }
                $this->getAddressCount($acqNumber->publisher->address_id);
                $publisher::destroy($acqNumber->publisher_id);
                $acqNumber->publisher_id = null;
            }
        }

        if($request->input('acquisition-mode') == 'donated'){
            if($acqNumber->purchased_details != ''){
                $this->getAddressCount($acqNumber->purchased_details->address_id);
                $acqNumber->purchased_details->delete();
            }
            $donor_name = Donor_Name::firstorNew([
                'firstname' => trim($request->input('donor-firstname')), 
                'middlename' => trim($request->input('donor-middlename')), 
                'lastname' => trim($request->input('donor-lastname'))
            ]);
            $donor_name->save();            
            if($acqNumber->donor_id != ''){
                $acqNumber->donor->donor_name_id = $donor_name->getKey();
                $acqNumber->donor->year = $request->input('donated-year');
            }
            else{
                $donor->donor_name_id = $donor_name->getKey();
                $donor->year = $request->input('donated-year');
                $donor->save();
                $acqNumber->donor_id = $donor->getKey();
            }
        }
        else if($request->input('acquisition-mode') == 'purchased'){
            if($acqNumber->donor_id != ''){
                $donor_name_count = $donor::where('donor_name_id', '=', $acqNumber->donor->$donor_name_id)->get()->count();
                $inventory_donor_name_count = $inventory_donor::where('donor_name_id', '=', $acqNumber->donor->$donor_name_id)->get()->count();
                $total_donor_name_count = $donor_name_count + $inventory_donor_name_count;
                if($total_donor_name_count == 1){
                    $donor_name::destroy($acqNumber->donor->donor_name_id);
                }
                $acqNumber->donor->delete();
                $acqNumber->donor_id =null;
            }
            if($acqNumber->purchased_details != ''){
                $acqNumber->purchased_details->amount = trim($request->amount);
                $acqNumber->purchased_details->year = trim($request->input('purchased-year'));
                $address = Address::firstorNew(['address_name' => trim($request->address)]);
                $address->save();
                $acqNumber->purchased_details->address_id = $address->getKey();
               $acqNumber->purchased_details->acqNumber = $request->acqNumber;
                $acqNumber->purchased_details->save();
            }
            else{
                $purchased_detail->amount = $request->amount;
                $purchased_detail->year = $request->input('purchased-year');
                $purchased_detail->acqNumber = $acqNumber->getKey();
                $address = Address::firstorNew(['address_name' => trim($request->address)]);
                $address->save();
                $purchased_detail->address_id = $address->getKey();
                $purchased_detail->acqNumber = $request->acqNumber;
                $purchased_detail->save();
            }
        }


        $acqNumber->acqNumber = $request->acqNumber;
        $material_type = new MaterialType;
        $type = $material_type::where('type', '=', $category)->first();
        $acqNumber->material_type_id = $type->getKey();
        $acqNumber->title = $request->title;
        $acqNumber->save();

        $user = User::find(Auth::user()->username);
        $user->modify()->attach($request->acqNumber);

        return back()->with('status', $request->title . ' edited successfully!');          
    }
}