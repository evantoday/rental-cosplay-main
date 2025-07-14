<?php

use Illuminate\Support\Facades\Log;
use App\Enums\CostumeStatus;
use App\Enums\OrderStatus;
use App\Models\Costum;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;


Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('update:rental-status', function () {
    $startingSoon = Order::where('status', OrderStatus::CONFIRMED->value)
        ->where('tanggal_mulai_rental', '<=', now()->addDay())
        ->where('tanggal_mulai_rental', '>', now())
        ->get();

    foreach ($startingSoon as $order) {
        $order->costum()->update(['status' => CostumeStatus::Rented->value]);
    }

    $endingSoon = Order::where('status', OrderStatus::CONFIRMED->value)
        ->where('tanggal_kembali_kostum', '<=', now())
        ->get();

    foreach ($endingSoon as $order) {
        DB::transaction(function () use ($order) {
            $order->update(['status' => OrderStatus::DONE->value]);
            $order->costum()->update(['status' => CostumeStatus::Ready->value]);
        });
    }

    $this->info('Status rental dan kostum berhasil diperbarui.');
})->describe('Update status rental dan kostum berdasarkan jadwal');

Artisan::command('update:expired-orders', function () {
    try {
        $this->info('Mulai mengecek order yang expired...');

        $expiredOrders = Order::where('status', OrderStatus::AWAITING_PAYMENT->value)
            ->where('deadline_payment', '<=', now())
            ->get();

        $this->info('Ditemukan ' . $expiredOrders->count() . ' order yang expired');

        foreach ($expiredOrders as $order) {
            try {
                DB::transaction(function () use ($order) {
                    $order->update(['status' => OrderStatus::CANCELLED->value]);
                    $this->info("Order ID {$order->id} berhasil diupdate ke cancelled");
                });
            } catch (\Exception $e) {
                $this->error("Gagal update order ID {$order->id}: " . $e->getMessage());
                Log::error("Gagal update order ID {$order->id}: " . $e->getMessage());
            }
        }

        $this->info('Proses update status order expired selesai');
    } catch (\Exception $e) {
        $this->error('Error utama: ' . $e->getMessage());
        $this->error('File: ' . $e->getFile() . ' baris ' . $e->getLine());
        Log::error('Error pada update:expired-orders: ' . $e->getMessage());
        Log::error($e->getTraceAsString());
        throw $e;
    }
})->describe('Update status order yang melewati batas waktu pembayaran');

Schedule::command('update:rental-status')->hourly();
Schedule::command('update:expired-orders')
    ->everyMinute()
    ->appendOutputTo(storage_path('logs/expired-orders.log'));
