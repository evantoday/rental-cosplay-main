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
        Schema::create('cosrent', function (Blueprint $table) {
            $table->id();
            $table->string('cosrent_name');
            $table->string('telp_number')->nullable();
            $table->string('address')->nullable();
            $table->foreignId('user_id')
                ->nullable()
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cosrent');
    }
};
