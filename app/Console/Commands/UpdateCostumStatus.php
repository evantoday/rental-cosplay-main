<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Costum;
use Carbon\Carbon;

class UpdateCostumStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-costum-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update status kostum ke ready setelah 3 hari dari waktu rental selesai';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $threeDaysAgo = Carbon::now()->subDays(3);

        // Ambil semua kostum yang statusnya rented tapi telah melewati 3 hari dari tanggal kembali
        $costums = Costum::where('status', 'rented')
            ->where('tanggal_kembali_kostum', '<=', $threeDaysAgo)
            ->get();

        foreach ($costums as $costum) {
            $costum->update(['status' => 'ready']);
        }

        $this->info('Status kostum yang sudah 3 hari di-update ke ready.');
    }
}
