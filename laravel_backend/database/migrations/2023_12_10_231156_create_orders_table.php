<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('OrderID');
            $table->integer('OrderQuantity');
            $table->float('TotalAmount')->default(0);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('UserID')->on('users');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('ProductID')->on('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
