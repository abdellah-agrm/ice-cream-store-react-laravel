<?php

namespace App\Http\Controllers\Vendor;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
  public function __construct()
  {
    $this->middleware(function ($request, $next) {
      if (Auth::user() && Auth::user()->role == 'vendor') {
        return $next($request);
      }

      return response()->json(['error' => 'Unauthorized'], 401);
    })->only('store', 'update', 'destroy');
  }

  public function index()
  {
    try {
      return Product::all();
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    try {
      $validated = $request->validate([
        "ProductName" => "",
        "ProductPrice" => "",
        "ProductDetails" => "",
        "ProductSize" => "",
        "user_id" => "",
        "ProductStock" => "",
        "ProductRating" => "",
        'Image' => 'image|mimes:jpeg,png,jpg,gif,svg',
      ]);

      if ($request->hasFile('Image')) {
        $validated['Image'] = $request->file('Image')->store('images', 'public');
      }

      $product = Product::create($validated);

      return response()->json($product, 201);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function show(string $id)
  {
    try {
      $product = DB::select("
              SELECT p.ProductID, p.ProductName, p.ProductPrice, p.ProductDetails, p.ProductStock, p.ProductRating, p.Image, p.ProductSize, p.user_id, p.updated_at, COUNT(r.ReviewID) as ReviewsNb
              FROM products p
              LEFT JOIN reviews r ON r.product_id = p.ProductID
              WHERE p.ProductID = ?
              GROUP BY p.ProductID, p.ProductName, p.ProductPrice, p.ProductDetails, p.ProductStock, p.ProductRating, p.Image, p.ProductSize, p.user_id, p.updated_at", [$id]);

      return response()->json($product, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit(string $id)
  {
    //
  }

  public function update(Request $request, $id)
  {
    try {
      $product = Product::find($id);

      if ($request->hasFile('Image')) {
        $image = $request->file('Image');
        $path = $image->store('images', 'public');
        $product->Image = $path;
      }

      if($request->has('ProductName')){
        $product->ProductName = $request->input('ProductName');
      }
      if($request->has('ProductPrice')){
        $product->ProductPrice = $request->input('ProductPrice');
      }
      if($request->has('ProductDetails')){
        $product->ProductDetails = $request->input('ProductDetails');
      }
      if($request->has('ProductSize')){
        $product->ProductSize = $request->input('ProductSize');
      }
      if($request->has('ProductStock')){
        $product->ProductStock = $request->input('ProductStock');
      }
      $product->save();

      dd($request->all());

      return response()->json(['success' => true]);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function destroy(string $id)
  {
    try {
      $product = Product::findOrFail($id);
      $product->delete();

      return response()->json(null, 204);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function mostordered()
  {
    try {
      $products = Product::select('products.*', DB::raw('SUM(orders.OrderQuantity) as total_orders'))
        ->leftJoin('orders', 'orders.product_id', '=', 'products.ProductID')
        ->groupBy('products.ProductID', 'products.ProductName', 'products.ProductPrice', 'products.ProductDetails', 'products.ProductStock', 'products.ProductRating', 'products.Image', 'products.ProductSize', 'products.user_id', 'products.created_at', 'products.updated_at')
        ->orderBy('total_orders', 'desc')
        ->get();

      return response()->json($products, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}
