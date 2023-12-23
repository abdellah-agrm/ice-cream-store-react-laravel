<?php

namespace App\Http\Controllers\Customer;

use App\Models\Favorite;
use App\Models\Order;
use App\Models\View;
use App\Http\Controllers\Controller;

class ViewsController extends Controller
{
  public function CreateView(string $id)
  {
    try {
      $view = View::create(['product_id' => $id]);
      return response()->json($view, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function GetView(string $id)
  {
    try {
      $view = View::where('product_id', $id)->count();
      return response()->json($view, 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function CounterNav(string $id)
  {
      try {
          $countOrder = Order::where('user_id', $id)
              ->groupBy('user_id', 'product_id')
              ->selectRaw('user_id, product_id, COUNT(*) as order_count')
              ->get();
  
          $countFavorite = Favorite::where('user_id', $id)->count();
  
          return response()->json(['countOrder' => $countOrder, 'countFavorite' => $countFavorite], 200);
      } catch (\Exception $e) {
          return response()->json(['error' => $e->getMessage()], 500);
      }
  }
  
}
