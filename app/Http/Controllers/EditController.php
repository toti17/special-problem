<?php

namespace App\Http\Controllers;

use DB;
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

class EditController extends Controller
{
    public function edit(Request $request, Material $acqNumber){
        $validator = Validator::make($request->all(), [
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

        $publisher = new Publisher;
        $new_address = new Address;
        $new_publisher_name = new Publisher_Name;
        $donor_name = new Donor_Name;
        $purchased_detail = new Purchase_Detail;

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
                    $publisher_address_count = $publisher::where('address_id', $acqNumber->publisher->address_id)->get()->count();
                    if($publisher_address_count == 1){
                        $total_address_count = DB::table('publisher')
                           ->join('purchased_details', 'publisher.address_id', '=', 'purchased_details.address_id')
                           ->select('purchased_details.address_id')->where('publisher.address_id', '=', $acqNumber->publisher->address_id)->get()->count();
                        if($total_address_count == 0){
                            $new_address::destroy($acqNumber->publisher->address_id);
                        }
                    }                 
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
                // $publisher_count = DB::table('publisher')
                //     ->select('publisher_id')->get()->count();
                if($publisher_name_count == 1){
                    $new_publisher_name::destroy($acqNumber->publisher->publisher_name_id);
                }
                $address_count = DB::table('publisher')
                    ->select('address_id')->where('address_id', $acqNumber->publisher->address_id)->get()->count();
                $publisher_address_count = $publisher::where('address_id', $acqNumber->publisher->address_id)->get()->count();
                if($publisher_address_count == 1){
                    $total_address_count = DB::table('publisher')
                       ->join('purchased_details', 'publisher.address_id', '=', 'purchased_details.address_id')
                       ->select('purchased_details.address_id')->where('publisher.address_id', '=', $acqNumber->publisher->address_id)->get()->count();
                    if($total_address_count == 0){
                        $new_address::destroy($acqNumber->publisher->address_id);
                    }
                }
                $publisher::destroy($acqNumber->publisher_id);
                $acqNumber->publisher_id = null;
            }
        }

        if($request->input('acquisition-mode') == 'donated'){

        }
        else if($request->input('acquisition-mode') == 'purchased'){
            if($acqNumber->donor_id != ''){
                $donor_name_count = DB::table('donor')
                    ->select('donor_name_id')->where('donor_name_id', $acqNumber->donor->donor_name_id)->get()->count();
                if($donor_name_count == 1){
                    $donor_name::destroy($acqNumber->donor->donor_name_id);
                }
                $acqNumber->donor->delete();
                $acqNumber->donor_id =null;
            }
            $purchased_detail->amount = $request->amount;
            $purchased_detail->year = $request->input('purchased-year');
            $purchased_detail->acqNumber = $acqNumber->getKey();
            $address = Address::firstorNew(['address_name' => trim($request->address)]);
            $address->save();
            $purchased_detail->address_id = $address->getKey();
            $purchased_detail->save();
        }       
        $acqNumber->save();            
    }
}
