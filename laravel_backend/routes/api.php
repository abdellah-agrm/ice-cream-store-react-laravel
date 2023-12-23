<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
// Vendor :
use App\Http\Controllers\Vendor\ProductController;
use App\Http\Controllers\Customer\ViewsController;
use App\Http\Controllers\ClientsEmailsController;
use App\Http\Controllers\Vendor\DashboardController;

// Customer :
use App\Http\Controllers\Customer\FavoriteController;
use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\ReviewController;


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'user']);
    // Vendor :
    Route::apiResource('/vendor/products', ProductController::class);
    Route::post('/jointcustomers', [ClientsEmailsController::class, 'jointCustomers']);
    Route::get('/downloadCsv', [ClientsEmailsController::class, 'downloadCsv']);
    Route::get('/vendorstats/{userid}', [DashboardController::class,'vendorStats']);
    Route::get('/cardstats/{userid}', [DashboardController::class,'cardStats']);
    // Customer :
    Route::apiResource('/customer/reviews', ReviewController::class);
    Route::get('/customer/specificreviews/{review}', [ReviewController::class, 'specific']);
    Route::apiResource('/customer/orders', OrderController::class);
    Route::get('/shoppingcart/{userid}', [OrderController::class,'shoppingCart']);
    Route::post('/destroyshoppingcart', [OrderController::class,'destroyShoppingCart']);
    Route::apiResource('/customer/favorites', FavoriteController::class);
    Route::post('/customer/isfavorite/{favorite}', [FavoriteController::class, 'isfavorite']);
    Route::post('/customer/myfavorites', [FavoriteController::class, 'myfavorites']);
    Route::get('/customer/mostordered', [ProductController::class,'mostordered']);
});

// views counter :
Route::post('/views/{productId}', [ViewsController::class, 'CreateView']);
Route::get('/getviews/{productId}', [ViewsController::class, 'GetView']);
Route::get('/Counternav/{userid}', [ViewsController::class, 'CounterNav']);