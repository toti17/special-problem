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

Route::get('/student/register', 'RegisterController@studentregister');

Route::post('/student/register', 'RegisterController@register');

Route::post('/add/studentnumber', 'AddStudentNumberController@add');

Route::post('/add/material', 'MaterialController@add');

Route::get('/dashboard/home', 'RegisterController@dashboard');

Route::get('dashboard/user', 'ViewController@userDashboard');

Route::get('dashboard/material', 'ViewController@materialDashboard');

Route::get('dashboard/material/{acqNumber}', 'ViewController@viewMaterial');

Route::get('/', 'ViewController@show');

Auth::routes();

