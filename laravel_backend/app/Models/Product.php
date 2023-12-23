<?php

namespace App\Models;

use App\Models\User;
use App\Models\Order;
use App\Models\Review;
use App\Models\Favorite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
  use HasFactory;
  protected $primaryKey = 'ProductID';

  protected $fillable = [
    'ProductName',
    'ProductPrice',
    'ProductDetails',
    'ProductStock',
    'ProductRating',
    'Image',
    'ProductSize',
    'user_id',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function reviews()
  {
    return $this->hasMany(Review::class);
  }

  public function orders()
  {
    return $this->hasMany(Order::class);
  }

  public function favorites()
  {
    return $this->hasMany(Favorite::class);
  }

}
