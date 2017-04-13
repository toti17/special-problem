<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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

class DeleteController extends Controller
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

   public function deleteInventory(Inventory $acqNumber){
      $english_name = new English_Name;
      $venacular_name = new Venacular_Name;
      $material = new Invent_Material;
      $color = new Color;
      $decoration = new Decoration;
      $mark = new Mark;
      $donor = new Donor;
      $inventory_donor = new InventoryDonor;
      $donor_name = new Donor_Name;
      $purchase_detail = new Purchase_Detail;
      $owner = new Owner;
      $inventory_purchase_detail = new InventoryPurchasedDetails;
      $publisher = new Publisher;
      $address = new Address;
      $acqNumber->measurement->delete();
      if($acqNumber->picture != ''){
         $pic_name = $acqNumber->picture->name;
         $extension = $acqNumber->picture->extension;
         Storage::delete('/public/' . $pic_name . '.' . $extension);
         $acqNumber->picture->delete();
      }
      $owner_id = $acqNumber->owner->owner_id;
      $address_id = $acqNumber->owner->address->address_id;
      $this->getAddressCount($address_id);
      $owner_count = DB::table('inventories')->where('owner_id', $owner_id)->get()->count();
      if($owner_count != 1){
         $acqNumber->owner->delete();
      }
      foreach($acqNumber->english_name as $eng){
         if($eng->inventory->count() > 1){
            $acqNumber->english_name()->detach($eng->english_name_id);
         }
         else{
            $acqNumber->english_name()->detach($eng->english_name_id);
            $english_name::destroy($eng->english_name_id);
         }
      }
      foreach($acqNumber->venacular_name as $ven){
         if($ven->inventory->count() > 1){
            $acqNumber->venacular_name()->detach($ven->venacular_name_id);
         }
         else{
            $acqNumber->venacular_name()->detach($ven->venacular_name_id);
            $venacular_name::destroy($ven->venacular_name_id);
         }
      }
      foreach($acqNumber->materials as $mat){
         if($mat->inventory->count() > 1){
            $acqNumber->materials()->detach($mat->material_id);
         }
         else{
            $acqNumber->materials()->detach($mat->material_id);
            $material::destroy($mat->material_id);
         }
      }
      foreach($acqNumber->color as $col){
         if($col->inventory->count() > 1){
            $acqNumber->color()->detach($col->color_id);
         }
         else{
            $acqNumber->color()->detach($col->color_id);
            $color::destroy($col->color_id);
         }
      }
      foreach($acqNumber->decoration as $decor){
         if($decor->inventory->count() > 1){
            $acqNumber->decoration()->detach($decor->decoration_id);
         }
         else{
            $acqNumber->decoration()->detach($decor->decoration_id);
            $decoration::destroy($decor->decoration_id);
         }
      }
      foreach($acqNumber->mark as $mar){
         if($mar->inventory->count() > 1){
            $acqNumber->mark()->detach($mar->mark_id);
         }
         else{
            $acqNumber->mark()->detach($mar->mark_id);
            $mark::destroy($mar->mark_id);
         }
      }
      if($acqNumber->donor_id != ''){
         $donor_name_id = $acqNumber->donor->donor_name_id;
         $donor_name_count = $donor::where('donor_name_id', '=', $donor_name_id)->get()->count();
         $inventory_donor_name_count = $inventory_donor::where('donor_name_id', '=', $donor_name_id)->get()->count();
         $total_donor_name_count = $donor_name_count + $inventory_donor_name_count;
         if($total_donor_name_count == 1){
            $donor_name::destroy($donor_name_id);
         }
         $acqNumber->donor->delete();
      }
      else{
         $purchased_address_id = $acqNumber->purchased_detail->address_id;
         $this->getAddressCount($purchased_address_id);
         $acqNumber->purchased_detail->delete();
      }
      $acqNumber->delete();
   }

   public function deleteMaterial(Material $acqNumber){
      $purchase_detail = new Purchase_Detail;
      $publisher = new Publisher;
      $address = new Address;
      $author = new Author;
      $tag = new Tags;
      $donor = new Donor;
      $donor_name = new Donor_Name;
      $inventory_donor = new InventoryDonor;
      $thesis =new Thesis;
      $course = new Course;
      $school = new School;
      $photographer = new Photographer;
      $director = new Director;
      $producer = new Producer;
      $category = $acqNumber->material_type->type;

      $borrowed_count = DB::table('borrowed')->select('acqNumber')->where('acqNumber', $acqNumber->acqNumber)->get()->count();
      if($borrowed_count>0){
         $acqNumber->borrow()->detach();
      }

      if($acqNumber->donor_id != ''){
         $donor_name_id = $acqNumber->donor->donor_name_id;
         $donor_name_count = $donor::where('donor_name_id', '=', $donor_name_id)->get()->count();
         $inventory_donor_name_count = $inventory_donor::where('donor_name_id', '=', $donor_name_id)->get()->count();
         $total_donor_name_count = $donor_name_count + $inventory_donor_name_count;         
         if($total_donor_name_count == 1){
            $donor_name::destroy($donor_name_id);
             $acqNumber->donor->delete();
         }
         $acqNumber->donor->delete();
      }
      else{
         $purchased_address_id = $acqNumber->purchased_details->address_id;
         $this->getAddressCount($purchased_address_id);
         $acqNumber->purchased_details->delete();
      }

      if($acqNumber->publisher_id != ''){
         $publisher_name_id = $acqNumber->publisher->publisher_name_id;
         $publisher_name_count = $publisher::where('publisher_name_id', $publisher_name_id)->get()->count();
         if($publisher_name_count == 1){
            $publisher_name = new Publisher_Name;
            $publisher_name::destroy($publisher_name_id);
         }
         $publisher_address_id = $acqNumber->publisher->address_id;
         $this->getAddressCount($publisher_address_id);
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
         }
         $acqNumber->multimedia->delete();
      }

      $user = User::find(Auth::user()->username);
      $user->modify()->attach($acqNumber->acqNumber);

      $acqNumber->delete();
   }
}