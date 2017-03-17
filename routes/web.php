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

Route::post('/add/studentnumber', 'AddStudentNumberController@add');

Route::post('/add/material', 'AddController@add');

Route::get('/student/register', 'RegisterController@studentregister');

Route::get('/', 'ViewController@dashboard');

Route::get('/home', 'ViewController@dashboard');


Route::get('/dashboard/home', 'ViewController@dashboard');

Route::get('dashboard/user', 'ViewController@userDashboard');

Route::get('/dashboard/user/confirm/{username}/{confirmStatus}', 'RegisterController@confirmAccount');

Route::get('dashboard/material', 'ViewController@materialDashboard');

Route::get('dashboard/material/{acqNumber}', 'ViewController@viewMaterial');

Route::get('dashboard/search', 'SearchController@autocomplete');

Route::get('dashboard/material/check/{number}/{original}/{change}', 'AddController@checkAcq');

Route::post('/edit/material/{acqNumber}', 'EditController@edit');

Route::delete('dashboard/material/delete/{acqNumber}', 'DeleteController@deleteMaterial');

Auth::routes();

