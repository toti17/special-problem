<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/', function(){
	if(Auth::check()){
		return redirect('dashboard/home');
	}
	else{
		return view('index');
	}
});

Route::post('/student/register', 'RegisterController@register');

Route::get('/student/register', 'RegisterController@studentregister');

Route::get('/about', 'ViewController@about');

Route::group(['middleware' => ['login.check']], function () {

	Route::get('/dashboard/user/confirm/{username}/{confirmStatus}', 'RegisterController@confirmAccount');

	Route::post('/add/studentnumber', 'AddStudentNumberController@add');

	Route::post('/add/material/{edit}', 'Controller@addMaterial');

	Route::post('/add/inventory', 'Controller@addInventory');

	Route::post('/edit/inventory/{acqNumber}', 'EditController@editInventory');

	Route::post('/delete/inventory/{acqNumber}/{edit}/{picname}', 'Controller@deleteInventory');

	Route::get('/inventory/accession', 'ViewController@showInventory');

	Route::get('/inventory/owners', 'ViewController@showOwners');

	Route::get('/inventory/donors', 'ViewController@showDonors');

	Route::get('/inventory/retrieveCreated/{id}/{searchType}', 'SearchController@retrieveCreated');

	Route::get('/search/inventory/{searchType}/{query}', 'SearchController@searchInventory');

	Route::get('dashboard/material/check/{number}/{original}/{change}', 'AddController@checkAcq');

	Route::get('/dashboard/check/borrowed/{acqNumber}', 'BorrowController@checkBorrowed');

	Route::get('/dashboard/delete/borrowed/{acqNumber}', 'BorrowController@delete');

	Route::post('/dashboard/confirm/borrowedmaterials/{acqNumber}/{username}', 'BorrowController@confirmMaterials');

	Route::post('/dashboard/unconfirm/borrowedmaterials/{acqNumber}/{username}', 'BorrowController@unconfirmMaterials');

	Route::get('/dashboard/borrowedmaterials', 'BorrowController@borrowedmaterials');

	Route::post('/dashboard/material/staffDelete/{acqNumber}', 'BorrowController@staffDelete');

	Route::get('dashboard/borrow/{acqNumber}/{title}', 'BorrowController@borrow');

	Route::get('/home', 'ViewController@dashboard');

	Route::get('/dashboard/home', 'ViewController@dashboard');

	Route::get('dashboard/user', 'ViewController@userDashboard');

	Route::get('/dashboard/users', 'ViewController@retrieveUsers');

	Route::get('dashboard/material', 'ViewController@materialDashboard');

	Route::get('/dashboard/show/inventory', 'ViewController@showInventory');

	Route::get('/dashboard/retrieve/inventory/{acqNumber}', 'ViewController@retrieveInventory');

	Route::get('/dashboard/inventory', 'ViewController@inventoryDashboard');

	Route::get('dashboard/material/borrowed', 'ViewController@materialDashboard');

	Route::get('material/{acqNumber}', 'ViewController@viewMaterial');

	Route::get('dashboard/material/{acqNumber}', 'ViewController@viewMaterial');

	Route::get('dashboard/search/{type}/{term}', 'SearchController@search');

	Route::get('/dashboard/retrieveMaterials/{id}/{type}/{sortType}', 'SearchController@retrieveMaterials');

	Route::get('/dashboard/retrieveTitle/{sortType}', 'SearchController@retrieveTitle');

	Route::get('/dashboard/retrieveAuthor', 'SearchController@retrieveAuthor');

	Route::get('/dashboard/retrieveTag', 'SearchController@retrieveTag');

	Route::get('/dashboard/retrievePhotographer', 'SearchController@retrievePhotographer');

	Route::get('/dashboard/retrieveDirector', 'SearchController@retrieveDirector');

	Route::get('/dashboard/retrieveProducer', 'SearchController@retrieveProducer');

	Route::get('/dashboard/retrieveDonor', 'SearchController@retrieveDonor');

	Route::get('/dashboard/retrievePublisher', 'SearchController@retrievePublisher');

	Route::get('/dashboard/retrieveBorrowedUsers/{sortType}', 'SearchController@retrieveBorrowedUsers');

	Route::post('/dashboard/addViewCount/{acqNumber}', 'SearchController@addViewCount');

	Route::post('/dashboard/addBorrowCount/{acqNumber}', 'SearchController@addBorrowCount');

	Route::post('/edit/material/{acqNumber}', 'EditController@edit');

	Route::delete('dashboard/material/delete/{acqNumber}/{edit}/{picname}/{newAcqNumber}/{request}', 'Controller@deleteMaterial');

});