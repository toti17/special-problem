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
use \App\MaterialCopy;
use Carbon;
class AddController extends Controller
{

    public function checkAcq($number, $original, $change){
        // editing
        if($change == true){
            if($number == $original){
                $acq = 0;
            }
            else{
                $acq = $this->getAcqCount($number);
            }
        }
        // adding
        else{
            $acq = $this->getAcqCount($number);
        }
        return response()->json([
            'accessionNumber' => $acq,
        ]);
    }

    public function backup(){
        $filename = "backup-" . Carbon\Carbon::now()->format('Y-m-d_H-i-s') . ".sql";
        $command = "C:/xampp/mysql/bin/mysqldump -u root sp1 > " . $filename;
        exec($command);   
    }
}