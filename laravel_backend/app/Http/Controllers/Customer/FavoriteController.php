<?php

namespace App\Http\Controllers\Customer;

use App\Models\Product;
use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class FavoriteController extends Controller
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
      return Favorite::all();
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
        'user_id' => 'required|exists:users,UserID',
        'product_id' => 'required|exists:products,ProductID',
      ]);

      $favorite = Favorite::where('user_id', $validated['user_id'])
        ->where('product_id', $validated['product_id'])
        ->first();

      if ($favorite) {
        $favorite->delete();
        return response()->json(['message' => 'Favorite deleted'], 200);
      } else {
        $favorite = Favorite::create($validated);
        return response()->json($favorite, 201);
      }
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function show(string $id)
  {
    try {
      $favorite = Favorite::where('product_id', $id)->first();
      if ($favorite) {
        return response()->json("yes", 200);
      } else {
        return response()->json("no", 200);
      }
    } catch (\Exception $e) {
      return response()->json(['err' => $e->getMessage()], 500);
    }
  }

  public function edit(string $id)
  {
    //
  }

  public function update(Request $request, string $id)
  {
    //
  }

  public function destroy(string $id)
  {
    try {
      $favorite = Favorite::findOrFail($id);
      $favorite->delete();

      return response()->json(null, 204);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function myfavorites(request $request)
  {
    try {
      $userID = $request->user_id;
      $favorite = Product::select('products.*', 'favorites.FavoriteID')
        ->join('favorites', 'favorites.product_id', '=', 'products.ProductID')
        ->where('favorites.user_id', $userID)
        ->get();

      return response()->json($favorite);
    } catch (\Exception $e) {
      return response()->json(['err' => $e->getMessage()], 500);
    }
  }

  public function isfavorite(Request $request, string $id)
  {
    try {
      $userID = $request->user_id;
      $favorite = Favorite::where('product_id', $id)
        ->where('user_id', $userID)
        ->first();

      if ($favorite) {
        return response()->json("yes", 200);
      } else {
        return response()->json("no", 200);
      }
    } catch (\Exception $e) {
      return response()->json(['err' => $e->getMessage()], 500);
    }
  }
}
