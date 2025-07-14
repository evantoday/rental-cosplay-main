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
        Schema::create('partial_costumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('costum_id')
                ->references('id')
                ->on('costum')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('cosrent_id')
                ->nullable()
                ->index()
                ->references('id')
                ->on('cosrent')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('name');
            $table->string('description');
            $table->string('price');
            $table->enum('size', ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'OTHER'])->default('OTHER');
            $table->string('brand')->nullable();
            $table->enum('status', ['ready', 'rented'])->default('ready');
            $table->integer('stock')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partial_costumes');
    }
};
