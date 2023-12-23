<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
  public function register(Request $request)
  {
    try {
      $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'phone' => 'required|unique:users',
        'password' => 'required|min:5',
        'role' => 'required|in:owner,vendor,customer',
      ]);

      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'password' => Hash::make($request->password),
        'role' => $request->role,
      ]);

      return response()->json($user, 201);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function login(Request $request)
  {
    try {
      $request->validate([
        'email' => 'required|email',
        'password' => 'required',
      ]);

      // if (!Auth::attempt($request->only('email', 'password'))) {
      //   throw ValidationException::withMessages([
      //     'email' => ['The provided credentials are incorrect.'],
      //   ]);
      // }

      $user = User::where('email', $request->email)->firstOrFail();
      $token = $user->createToken('auth_token')->plainTextToken;

      $tokenParts = explode('|', $token);
      $token = $tokenParts[1];

      return response()->json(['auth_token' => $token], 200);
    } catch (ValidationException $e) {
      return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function logout(Request $request)
  {
    try {
      $request->user()->currentAccessToken()->delete();

      return response()->json(['message' => 'Logged out successfully'], 200);
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }

  public function user(Request $request)
  {
    try {
      return response()->json($request->user());
    } catch (\Exception $e) {
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}
