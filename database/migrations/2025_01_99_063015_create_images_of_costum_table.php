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
        Schema::create('images_of_costum', function (Blueprint $table) {
            $table->id();
            $table->foreignId('costum_id')
                ->nullable()
                ->index()
                ->references('id')
                ->on('costum')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('partial_costum_id')
                ->nullable()
                ->index()
                ->references('id')
                ->on('partial_costumes')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('images_link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images_of_costum');
    }
};
