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
   public function editInventory(Request $request, Inventory $acqNumber){
        $this->deleteInventory($acqNumber, 'true', $request->picname);
        $this->addInventory($request);
        return back()->with('status', $request->object . ' edited successfully!');
   }

    public function edit(Request $request, Material $acqNumber){
              // return DB::table('material_copies')->select('copy_acqNumber')
      //   ->orderBy(DB::raw('LPAD(lower(copy_acqNumber), 10,0)', 'DESC'))->first();
        $this->deleteMaterial($acqNumber, 'true', $request->picname, $request->acqNumber, $request);
        $this->addMaterial($request, 'true');
        return back()->with('status', $request->title . ' edited successfully!');      
    }
}