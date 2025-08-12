<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\front\FrontProjectController;
use App\Http\Controllers\front\FrontServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/authenticate',[AuthenticationController::class,'authenticate']);

Route::get('/get-services',[FrontServiceController::class,'index']);
Route::get('/get-latest-services',[FrontServiceController::class,'latestServices']);

Route::get('/get-projects',[FrontProjectController::class,'index']);
Route::get('/get-latest-projects',[FrontProjectController::class,'latestProjects']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    // Protected Routes
    Route::get('/dashboard',[DashboardController::class,'index']);
    Route::get('/logout',[AuthenticationController::class,'logout']);
  

    // Service Routes
    Route::post('/services',[ServiceController::class,'store']);
    Route::get('/services',[ServiceController::class,'index']);
    Route::put('/services/{id}',[ServiceController::class,'update']);
    Route::get('/services/{id}',[ServiceController::class,'show']);
    Route::delete('/services/{id}',[ServiceController::class,'destroy']);

    // Project Routes

    Route::get('/projects',[ProjectController::class,'index']);
    Route::post('/projects',[ProjectController::class,'store']);
    Route::put('/projects/{id}',[ProjectController::class,'update']);
    Route::get('/projects/{id}',[ProjectController::class,'show']);
    Route::delete('/projects/{id}',[ProjectController::class,'destroy']);

    // Temp Image Routes 
     Route::post('/temp-images',[TempImageController::class,'store']);

});