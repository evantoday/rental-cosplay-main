<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Order;
use App\Enums\OrderStatus;
use Illuminate\Console\Command;

class CancelExpiredOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order:cancel-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancel orders that exceed payment deadline';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $expiredOrders = Order::where('status', OrderStatus::AWAITING_PAYMENT->value)
            ->where('deadline_payment', '<', $now)
            ->update(['status' => OrderStatus::CANCELLED->value]);

        $this->info("$expiredOrders orders have been canceled.");
    }
}
