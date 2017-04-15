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
        $edit = true;
        $this->deleteInventory($acqNumber, $edit, $request->picname);
        $this->addInventory($request);
        return back()->with('status', $request->object . ' edited successfully!');
   }

    public function edit(Request $request, Material $acqNumber){
        $this->deleteMaterial($acqNumber);
        $this->addMaterial($request);
        return back()->with('status', $request->title . ' edited successfully!');          
    }
}