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
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cosrent_id')
                ->nullable()
                ->index()
                ->references('id')
                ->on('cosrent')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('costum_id')
                ->nullable()
                ->index()
                ->references('id')
                ->on('costum')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('user_id')
                ->nullable()
                ->index()
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->enum('status', [
                'awaiting_payment',
                'waiting_confirmation',
                'confirmed',
                'rejected',
                'cancelled',
                'done'
            ])->default('awaiting_payment');
            $table->date('tanggal_mulai_rental')->nullable();
            $table->date('tanggal_kembali_kostum')->nullable();
            $table->string('bukti_pembayaran')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
