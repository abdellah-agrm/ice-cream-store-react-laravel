<?php

namespace App\Http\Controllers\Vendor;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  public function __construct()
  {
    $this->middleware(function ($request, $next) {
      if (Auth::user() && Auth::user()->role == 'vendor') {
        return $next($request);
      }

      return response()->json(['error' => 'Unauthorized'], 401);
    });
  }

  public function vendorStats(string $id)
  {
    $products = DB::select("
      SELECT products.ProductID, products.ProductName, products.ProductPrice, products.ProductDetails, 
        products.ProductStock, products.ProductRating, products.Image, products.ProductSize, 
        products.user_id AS 'vendor_id', COALESCE(orders.TTQuantity, 0) AS 'TTQuantity', 
        COALESCE(orders.TTAmount, 0) AS 'TTAmount', COALESCE(favorites.TTFav, 0) AS 'TTFav', 
        COALESCE(reviews.TTRev, 0) AS 'TTRev', COALESCE(views.TTView, 0) AS 'TTView'
      FROM products 
        LEFT JOIN (SELECT product_id, SUM(OrderQuantity) AS 'TTQuantity', SUM(TotalAmount) AS 'TTAmount'
            FROM orders GROUP BY product_id) AS orders ON products.ProductID = orders.product_id

        LEFT JOIN (SELECT product_id, COUNT(FavoriteID) AS 'TTFav'
            FROM favorites GROUP BY product_id) AS favorites ON products.ProductID = favorites.product_id

        LEFT JOIN (SELECT product_id, COUNT(ReviewID) AS 'TTRev'
            FROM reviews GROUP BY product_id) AS reviews ON products.ProductID = reviews.product_id

        LEFT JOIN (SELECT product_id, COUNT(ViewID) AS 'TTView'
            FROM views GROUP BY product_id) AS views ON products.ProductID = views.product_id
        WHERE products.user_id = ?
    ", [$id]);

    return response()->json($products, 200);
  }

  public function cardStats(string $id)
  {
    $ttProd = DB::table('products')->where('user_id', $id)->count();

    $ttFav = DB::table('products')
      ->leftJoin('favorites', 'favorites.product_id', '=', 'products.ProductID')
      ->where('products.user_id', $id)
      ->count();

    $orderDetails = DB::table('products')
      ->leftJoin('orders', 'orders.product_id', '=', 'products.ProductID')
      ->where('products.user_id', $id)
      ->select(DB::raw('SUM(orders.OrderQuantity) as ttQuantity, SUM(orders.TotalAmount) as ttAmount'))
      ->first();

    $ttView = DB::table('products')
      ->leftJoin('views', 'views.product_id', '=', 'products.ProductID')
      ->where('products.user_id', $id)
      ->count();

    return response()->json([
      'ttProd' => $ttProd,
      'ttQuantity' => $orderDetails->ttQuantity,
      'ttAmount' => $orderDetails->ttAmount,
      'ttFav' => $ttFav,
      'ttView' => $ttView,
    ]);
  }
}
