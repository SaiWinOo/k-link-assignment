<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserAuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {

    // products
    Route::get('/products', [ProductController::class,'index']);

    Route::middleware('admin')->group(function(){
        Route::post('/products', [ProductController::class,'store']);
        Route::post('/products/update/{product:id}', [ProductController::class,'update']);
        Route::delete('/products/{id}', [ProductController::class,'destroy']);
    });

    // tags
    Route::get('/tags', [TagController::class,'index']);
});
