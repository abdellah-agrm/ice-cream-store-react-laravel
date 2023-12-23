<?php

namespace App\Http\Controllers\Customer;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ReviewController extends Controller
{
  public function __construct()
  {
    $this->middleware(function ($request, $next) {
      if (Auth::user() && Auth::user()->role == 'customer') {
        return $next($request);
      }

      return response()->json(['error' => 'Unauthorized'], 401);
    })->only('store', 'show', 'update', 'destroy');
  }

  public function index()
  {
    try {
      return Review::all();
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
        'Rating' => 'required|integer|between:1,5',
        'Comment' => 'required',
        'user_id' => 'required|exists:users,UserID',
        'product_id' => 'required|exists:products,ProductID',
      ]);

      $review = Review::create($validated);

      // After creating the review, update the product rating
      $total_rating = Review::where('product_id', $validated['product_id'])->sum('Rating');
      $total_reviews = Review::where('product_id', $validated['product_id'])->count();
      $average_rating = $total_rating / $total_reviews;

      Product::where('ProductID', $validated['product_id'])->update(['ProductRating' => $average_rating]);

      return response()->json($review, 201);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }


  public function show(string $id)
  {
    try {
      return Review::findOrFail($id);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function edit(string $id)
  {
    //
  }

  public function update(Request $request, string $id)
  {
    try {
      $review = Review::findOrFail($id);

      $validated = $request->validate([
        'Rating' => 'required|integer|between:1,5',
        'Comment' => 'required',
      ]);

      $review->update($validated);

      // After updating the review, update the product rating
      $total_rating = Review::where('product_id', $review->product_id)->sum('Rating');
      $total_reviews = Review::where('product_id', $review->product_id)->count();
      $average_rating = $total_rating / $total_reviews;

      Product::where('ProductID', $review->product_id)->update(['ProductRating' => $average_rating]);

      return response()->json($review, 200);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function destroy(string $id)
  {
    try {
      $review = Review::findOrFail($id);
      $productId = $review->product_id;
      $review->delete();

      // After deleting the review, update the product rating
      $total_rating = Review::where('product_id', $productId)->sum('Rating');
      $total_reviews = Review::where('product_id', $productId)->count();
      $average_rating = $total_reviews > 0 ? $total_rating / $total_reviews : null;

      Product::where('ProductID', $productId)->update(['ProductRating' => $average_rating]);

      return response()->json(null, 204);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function specific(string $id)
  {
    try {
      $reviews = DB::table('reviews as r')
      ->join('users as u', 'u.UserID', '=', 'r.user_id')
      ->select('u.name', 'r.*')
      ->where('r.product_id', $id)
      ->get();

  return response()->json($reviews, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

}
