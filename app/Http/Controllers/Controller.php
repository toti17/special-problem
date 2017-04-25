<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use DB;
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
use \App\Location;
use \App\MaterialPicture;

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

use \App\MaterialCopy;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

   public function getAcqCount($id){
    $material = new Material;
    $inventory = new Inventory;
    $material_copy = new MaterialCopy;

    $material_count = $material::where('acqNumber', $id)->get()->count();
    $inventory_count = $inventory::where('acqNumber', $id)->get()->count();
    $material_copy_count = $material_copy::where('copy_acqNumber', $id)->get()->count();

    return $material_count + $inventory_count + $material_copy_count;
   }

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
            $picture->storeAs('inventory/', $extension);
            $inventory_picture = new InventoryPictures;
            $inventory_picture->acqNumber = $acqNumber;
            $inventory_picture->name = $acqNumber;
            $inventory_picture->extension = $ext;
            $inventory_picture->save();
        }

        $inventory = new Inventory;
        $inventory->acqNumber = $acqNumber;
        $inventory->object = $object;

        $location = Location::firstorNew(['location_name' => $request->location]);
        $location->save();
        $inventory->location_id = $location->getKey();

        if($english_names[0] != ''){
          for($i=0;$i<sizeof($english_names);$i++){
              $english_name = English_Name::firstorNew(['english_name' => $english_names[$i]]);
              $english_name->save();
              $inventory->english_name()->attach($english_name->english_name_id);
          }
        }

        if($venacular_names[0] != ''){
          for($i=0;$i<sizeof($venacular_names);$i++){
              $venacular_name = Venacular_Name::firstorNew(['venacular_name' => $venacular_names[$i]]);
              $venacular_name->save();
              $inventory->venacular_name()->attach($venacular_name->venacular_name_id);
          }
        }

        $inventory->conditions = $condition;

        $inventory_type = new Inventory_Type;
        $type = $inventory_type::where('type', $category)->first();
        $inventory->inventory_type_id = $type->getKey();


        $local_address = Address::firstorNew(['address_name' => $owner_locality]);
        $local_address->save();
        $owner = Owner::firstorNew([
            'firstname' => $owner_first_name, 
            'middlename' => $owner_middle_name, 
            'lastname' => $owner_last_name, 
            'nickname' => $owner_nickname,
            'address_id' => $local_address->getKey()
         ]);
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

        if($materials[0] != ''){
          for($i=0;$i<sizeof($materials);$i++){
              $material = Invent_Material::firstorNew(['material_name' => $materials[$i]]);
              $material->save();
              $material->inventory()->attach($inventory->getKey());
          }
        }

        if($colors[0] != ''){
          for($i=0;$i<sizeof($colors);$i++){
              $color = Color::firstorNew(['color_name' => $colors[$i]]);
              $color->save();
              $color->inventory()->attach($inventory->getKey());
          }
        }

        if($decorations[0] != ''){
          for($i=0;$i<sizeof($decorations);$i++){
              $decoration = Decoration::firstorNew(['decoration_name' => $decorations[$i]]);
              $decoration->save();
              $decoration->inventory()->attach($inventory->getKey());
          }
        }

        if($marks[0] != ''){
          for($i=0;$i<sizeof($marks);$i++){
              $mark = Mark::firstorNew(['mark_name' => $marks[$i]]);
              $mark->save();
              $mark->inventory()->attach($inventory->getKey());
          }          
        }
        
        return back()->with('status', $object . ' added successfully!');
    }

   public function deleteInventory(Inventory $acqNumber, $edit, $picname){
      $english_name = new English_Name;
      $venacular_name = new Venacular_Name;
      $material = new Invent_Material;
      $color = new Color;
      $decoration = new Decoration;
      $location = new Location;
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

      $location_count = Inventory::where('location_id', $acqNumber->location_id)->get()->count();
      if($location_count == 1){
        $location::destroy($acqNumber->location_id);
      }

      if($edit == 'true'){
        if($acqNumber->picture != ''){
           $pic_name = $acqNumber->picture->name;
           $extension = $acqNumber->picture->extension;
           $name = $pic_name . '.' . $extension;
           if($picname != $name){
             Storage::delete('/inventory/' . $pic_name . '.' . $extension);
             $acqNumber->picture->delete();          
           }
         }
      }
      else{
        if($acqNumber->picture != ''){
           $pic_name = $acqNumber->picture->name;
           $extension = $acqNumber->picture->extension;
           Storage::delete('/inventory/' . $pic_name . '.' . $extension);
           $acqNumber->picture->delete();
        }
      }
      $owner_id = $acqNumber->owner->owner_id;
      $address_id = $acqNumber->owner->address->address_id;
      $this->getAddressCount($address_id);
      $owner_count = DB::table('inventories')->where('owner_id', $owner_id)->get()->count();
      if($owner_count == 1){
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
    public function addMaterial(Request $request, $edit){
        $numbers = $request->numbers;
        $category = $request->input('category');
        $category = trim($category);
        $material = Material::firstorNew(['acqNumber' => trim($request->input('acqNumber'))]);
        $copy_count = (int)$request->copy;
        $material->copy_count = $copy_count;
        $material_type = new MaterialType;
        $type = $material_type::where('type', '=', $category)->first();
        $material->material_type_id = $type->getKey();
        $material->title = trim($request->input('title'));
        if(strlen($request->description) != 0){
          $material->description = $request->description;
        }

        $location = Location::firstorNew(['location_name' => $request->location]);
        $location->save();
        $material->location_id = $location->getKey();

        if($category != 'Photographs' && $category != 'Compact Discs' 
        && $category != 'Digital Versatile Discs' && $category != 'Video Home Systems' && $category != 'Cassette Tapes'){
            $authors = explode(',', $request->input('authors'));
            for($i=0;$i<sizeof($authors); $i+=3){
                $author = new Author;
                $author = Author::firstorNew(['firstname' => trim($authors[$i]), 'middlename' => $authors[$i + 1], 'lastname' => trim($authors[$i + 2])]);
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
            $photo->size = trim($request->input('size'));
            $photo->size_type = trim($request->input('size-type'));
            $photo->save();

            $picture = $request->pic;

            if($picture){
                $ext = $picture->extension();
                $extension = $request->acqNumber . '.' . $ext;
                $picture->storeAs('material/', $extension);
                $material_picture = new MaterialPicture;
                $material_picture->photo_id = $photo->getKey();
                $material_picture->name = $request->acqNumber;
                $material_picture->extension = $ext;
                $material_picture->save();
            }
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

        if($edit == 'false'){
          if($copy_count > 0){
            $accession = explode('-', $request->acqNumber);
            $num_length = strlen($accession[1]);
            for($i=0;$i<$copy_count;$i++){
              $accession = $accession[0] . '-' . ((int)$accession[1] + 1);
              $unique = true;
              $num = 1;
              while($unique){
                $total_count = $this->getAcqCount($accession);
                if($total_count == 0){
                  $accession = explode('-', $accession);
                  $tempLength = strlen($accession[1]);
                  $newNum = str_pad($accession[1], (($num_length-$tempLength)+1), '0', STR_PAD_LEFT);
                  $accession = $accession[0] . '-' .  $newNum;
                  $unique = false;
                  $material_copy = new MaterialCopy;
                  $material_copy->copy_acqNumber = $accession;
                  $material_copy->acqNumber = $material->getKey();
                  $material_copy->save();
                  $accession = explode('-', $accession);
                }
                else{
                  $accession = explode('-', $accession);
                  $accession = $accession[0] . '-' . ((int)$accession[1] + $num);
                }
              }
            }
          }
        }


        $title = trim($request->input('title'));
        $user = User::find(Auth::user()->username);
        $user->modify()->attach($request->acqNumber);

        return back()->with('status', $title . ' added successfully!');
    }
   public function deleteMaterial(Material $acqNumber, $edit, $picname, $newAcqNumber, Request $request){
      $purchase_detail = new Purchase_Detail;
      $publisher = new Publisher;
      $address = new Address;
      $author = new Author;
      $tag = new Tags;
      $donor = new Donor;
      $donor_name = new Donor_Name;
      $location = new Location;
      $inventory_donor = new InventoryDonor;
      $thesis =new Thesis;
      $course = new Course;
      $school = new School;
      $photographer = new Photographer;
      $director = new Director;
      $producer = new Producer;
      $category = $acqNumber->material_type->type;

      if($edit == 'true'){
        if($acqNumber->photo != ''){
           $pic_name = $acqNumber->photo->material_picture->name;
           $extension = $acqNumber->photo->material_picture->extension;
           $name = $pic_name . '.' . $extension;
           if($picname != $name){
             Storage::delete('/material/' . $pic_name . '.' . $extension);
             $acqNumber->photo->material_picture->delete();          
           }
         }
         if($acqNumber->acqNumber != $newAcqNumber){
            DB::table('material_copies')->where('acqNumber', $acqNumber->acqNumber)->update(['acqNumber' => $newAcqNumber]);
            DB::table('borrowed')->where('acqNumber', $acqNumber->acqNumber)->update(['acqNumber' => $newAcqNumber]);
         }
         if((int)$request->copy < (int)$acqNumber->copy_count){
            $copy_acqNumber = DB::table('material_copies')->where('acqNumber', $acqNumber->acqNumber)->select('copy_acqNumber')->get();
            $i=1;
            foreach($copy_acqNumber as $copy){
              $copy_count = DB::table('borrowed')->where('acqNumber', $copy->copy_acqNumber)->get()->count();
              if($copy_count == 0){
                DB::table('material_copies')->where('copy_acqNumber', $copy->copy_acqNumber)->delete();
              }
              $i++;
              if($i == (int)$request->copy){
                break;
              }
            }
         }
         else if((int)$request->copy > (int)$acqNumber->copy_count){
            if((int)$acqNumber->copy_count == 0){
              $copy_count = (int)$request->copy;
              $accession = explode('-', $acqNumber->acqNumber);
              $num_length = strlen($accession[1]);              
              for($i=0;$i<$copy_count;$i++){
                $accession = $accession[0] . '-' . ((int)$accession[1] + 1);
                $unique = true;
                $num = 1;
                while($unique){
                  $total_count = $this->getAcqCount($accession);
                  if($total_count == 0){
                    $accession = explode('-', $accession);
                    $tempLength = strlen($accession[1]);
                    $newNum = str_pad($accession[1], (($num_length-$tempLength)+1), '0', STR_PAD_LEFT);
                    $accession = $accession[0] . '-' .  $newNum;
                    $unique = false;
                    $material_copy = new MaterialCopy;
                    $material_copy->copy_acqNumber = $accession;
                    $material_copy->acqNumber = $acqNumber->acqNumber;
                    $material_copy->save();
                    $accession = explode('-', $accession);
                  }
                  else{
                    $accession = explode('-', $accession);
                    $accession = $accession[0] . '-' . ((int)$accession[1] + $num);
                  }
                }
              }           
            }
            $accession = DB::table('material_copies')->where('acqNumber', $acqNumber->acqNumber)->select('copy_acqNumber')
              ->orderBy(DB::raw('LPAD(lower(copy_acqNumber), 10,0)', 'DESC'))->first();      
            $accession = explode('-', $accession->copy_acqNumber);
            $current_count = DB::table('material_copies')->where('acqNumber', $acqNumber->acqNumber)->get()->count();
            $num_length = strlen($accession[1]);
            for($i=0;$i<((int)$request->copy - (int)$current_count);$i++){
              $accession = $accession[0] . '-' . ((int)$accession[1] + 1);
              $unique = true;
              $num = 1;
              while($unique){
                $total_count = $this->getAcqCount($accession);
                if($total_count == 0){
                  $accession = explode('-', $accession);
                  $tempLength = strlen($accession[1]);
                  $newNum = str_pad($accession[1], (($num_length-$tempLength)+1), '0', STR_PAD_LEFT);
                  $accession = $accession[0] . '-' .  $newNum;
                  $unique = false;
                  $material_copy = new MaterialCopy;
                  $material_copy->copy_acqNumber = $accession;
                  $material_copy->acqNumber = $acqNumber->acqNumber;
                  $material_copy->save();
                  $accession = explode('-', $accession);
                }
                else{
                  $accession = explode('-', $accession);
                  $accession = $accession[0] . '-' . ((int)$accession[1] + $num);
                }
              }
            }          
         }
      }
      else{
        if($acqNumber->photo != ''){
           $pic_name = $acqNumber->photo->material_picture->name;
           $extension = $acqNumber->photo->material_picture->extension;
           Storage::delete('/material/' . $pic_name . '.' . $extension);
           $acqNumber->photo->material_picture->delete();
        }
        $borrowed_count = DB::table('borrowed')->select('acqNumber')->where('acqNumber', $acqNumber->acqNumber)->get()->count();
        if($borrowed_count>0){
           $acqNumber->borrow()->detach();
        }
        DB::table('material_copies')->where('acqNumber', $acqNumber->acqNumber)->delete();
      }

      $location_count = Material::where('location_id', $acqNumber->location_id)->get()->count();
      if($location_count == 1){
        $location::destroy($acqNumber->location_id);
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

    public function getInventoryType($inventory){
        $type_array = [];
        foreach($inventory as $invent){
            $type = Inventory_Type::find($invent->inventory_type_id);
            $type =$type->type;
            array_push($type_array, $type);
        }
        return $type_array;        
    }       
}
