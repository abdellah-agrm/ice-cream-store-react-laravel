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
        Schema::create('products', function (Blueprint $table) {
            $table->id('ProductID');
            $table->string('ProductName');
            $table->float('ProductPrice');
            $table->text('ProductDetails');
            $table->integer('ProductStock');
            $table->integer('ProductRating')->default(0);
            $table->string('Image')->nullable();
            $table->enum('ProductSize', ['250Ml', '500Ml', '1Liter', '2Liter']);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('UserID')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
