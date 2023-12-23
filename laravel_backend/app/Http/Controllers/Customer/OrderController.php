<?php

namespace App\Http\Controllers\Customer;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
	public function __construct()
	{
		$this->middleware(function ($request, $next) {
			if (Auth::user() && Auth::user()->role == 'customer') {
				return $next($request);
			}

			return response()->json(['error' => 'Unauthorized'], 401);
		});
	}

	public function index()
	{
		try {
			return Order::all();
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
				'OrderQuantity' => 'required|integer',
				'user_id' => 'required|exists:users,UserID',
				'product_id' => 'required|exists:products,ProductID',
			]);

			// Get the product
			$product = Product::findOrFail($validated['product_id']);

			// Check if the product stock is sufficient
			if ($validated['OrderQuantity'] > $product->ProductStock) {
				return response()->json(['error' => 'Insufficient product stock'], 400);
			}

			// Calculate the TotalAmount
			$validated['TotalAmount'] = $validated['OrderQuantity'] * $product->ProductPrice;

			// Create the order
			$order = Order::create($validated);

			// Decrease the product stock
			$product->ProductStock -= $validated['OrderQuantity'];
			$product->save();

			return response()->json($order, 201);
		} catch (ValidationException $e) {
			return response()->json(['error' => $e->errors()], 422);
		} catch (\Exception $e) {
			return response()->json(['error' => $e->getMessage()], 500);
		}
	}


	public function show(string $id)
	{
		try {
			return Order::findOrFail($id);
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
			$order = Order::findOrFail($id);

			$validated = $request->validate([
				'OrderStatus' => 'required|in:unConfirmed,confirmed',
				'OrderQuantity' => 'required|integer',
			]);

			// Get the product
			$product = Product::findOrFail($order->product_id);

			// Check if the product stock is sufficient for the new quantity
			if ($validated['OrderQuantity'] > $product->ProductStock + $order->OrderQuantity) {
				return response()->json(['error' => 'Insufficient product stock'], 400);
			}

			// Calculate the TotalAmount
			$validated['TotalAmount'] = $validated['OrderQuantity'] * $product->ProductPrice;

			// Update the order
			$order->update($validated);

			// Adjust the product stock
			$product->ProductStock = $product->ProductStock + $order->OrderQuantity - $validated['OrderQuantity'];
			$product->save();

			return response()->json($order, 200);
		} catch (ValidationException $e) {
			return response()->json(['error' => $e->errors()], 422);
		} catch (\Exception $e) {
			return response()->json(['error' => $e->getMessage()], 500);
		}
	}

	public function destroy(string $id)
	{
		try {
			$order = Order::findOrFail($id);
			$order->delete();

			return response()->json(null, 204);
		} catch (\Exception $e) {
			return response()->json(['error' => $e->getMessage()], 500);
		}
	}

	public function shoppingCart(string $id)
	{
		$result = DB::select("
			SELECT
					products.ProductID,
					products.ProductName,
					products.ProductPrice,
					products.ProductDetails,
					products.ProductStock,
					products.ProductRating,
					products.Image,
					products.ProductSize,
					orders.user_id,
					SUM(orders.OrderQuantity) as 'TotalQuantity',
					SUM(orders.TotalAmount) as 'AllTotalAmount'
			FROM
					products
			INNER JOIN orders ON orders.product_id = products.ProductID
			WHERE
					orders.user_id = ?
			GROUP BY
					products.ProductID,
					products.ProductName,
					products.ProductPrice,
					products.ProductDetails,
					products.ProductStock,
					products.ProductRating,
					products.Image,
					products.ProductSize,
					orders.user_id
		", [$id]);

		return response()->json($result);
	}

	public function destroyShoppingCart(Request $request)
	{
		try {
			$user_id = $request->user_id;
			$product_id = $request->product_id;

			DB::select("
				DELETE FROM orders
				WHERE product_id = {$product_id} AND user_id = {$user_id}
			");
			return response()->json(['message' => 'Deleted successfully!'], 200);
		} catch (\Exception $e) {
			return response()->json(['error' => $e->getMessage()], 500);
		}
	}

}
