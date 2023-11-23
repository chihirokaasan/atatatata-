<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StreamController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', [StreamController::class, 'index'])->name('index');
Route::post('/click', [StreamController::class, 'click'])->name('click');


//Route::get('/', function () {
//    return view('');
//});
