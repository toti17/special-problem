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

Route::post('/student/register', 'RegisterController@register');

Route::get('/student/register', 'RegisterController@studentregister');

Route::get('/dashboard/user/confirm/{username}/{confirmStatus}', 'RegisterController@confirmAccount');

Route::post('/add/studentnumber', 'AddStudentNumberController@add');

Route::post('/add/material', 'AddController@add');

Route::get('dashboard/material/check/{number}/{original}/{change}', 'AddController@checkAcq');

Route::get('/dashboard/check/borrowed/{acqNumber}', 'BorrowController@checkBorrowed');

Route::get('/dashboard/delete/borrowed/{acqNumber}', 'BorrowController@delete');

Route::get('/dashboard/confirm/borrowedmaterials/{acqNumber}/{username}', 'BorrowController@confirmMaterials');

Route::get('/dashboard/unconfirm/borrowedmaterials/{acqNumber}/{username}', 'BorrowController@unconfirmMaterials');

Route::get('/dashboard/borrowedmaterials', 'BorrowController@borrowedmaterials');

Route::get('/dashboard/material/staffDelete/{acqNumber}/{username}', 'BorrowController@staffDelete');

Route::get('dashboard/borrow/{acqNumber}', 'BorrowController@borrow');

Route::get('/', 'ViewController@dashboard');

Route::get('/home', 'ViewController@dashboard');

Route::get('/dashboard/home', 'ViewController@dashboard');

Route::get('dashboard/user', 'ViewController@userDashboard');

Route::get('/dashboard/users', 'ViewController@retrieveUsers');

Route::get('dashboard/material', 'ViewController@materialDashboard');

Route::get('dashboard/material/borrowed', 'ViewController@materialDashboard');

Route::get('material/{acqNumber}', 'ViewController@viewMaterial');

Route::get('dashboard/material/{acqNumber}', 'ViewController@viewMaterial');

Route::get('dashboard/search/{type}/{term}', 'SearchController@autocomplete');

Route::post('/edit/material/{acqNumber}', 'EditController@edit');

Route::delete('dashboard/material/delete/{acqNumber}', 'DeleteController@deleteMaterial');

Auth::routes();
