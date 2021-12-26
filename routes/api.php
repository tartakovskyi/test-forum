<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::group(['namespace' => 'Api'], function () {

    Route::group(['namespace' => 'Auth'], function () {
        Route::post('register', 'RegisterController');
        Route::post('login', 'LoginController');
        Route::post('logout', 'LogoutController')->middleware('auth:api');
        Route::middleware('auth:api')->get('/get-auth', function (Request $request) {
            return $request->user();
        });
    });

    Route::middleware('auth:api')->post('/post', [PostController::class, 'store']);

    Route::post('user/userpic', [App\Http\Controllers\Api\UserController::class, 'userpic']);

    Route::apiResources([
        'post' => PostController::class,
        'thread' => ThreadController::class,
        'user' => UserController::class,
    ]);
});