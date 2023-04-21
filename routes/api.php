<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConferenceController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/conferences', [ConferenceController::class, 'store']);
    Route::put('/conferences/{id}', [ConferenceController::class, 'update']);
    Route::delete('/conferences/{id}', [ConferenceController::class, 'destroy']);
});

Route::get('/conferences', [ConferenceController::class, 'index']);
