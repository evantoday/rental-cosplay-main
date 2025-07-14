<?php

namespace Database\Seeders;

use App\Models\Cosrent;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CosrentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cosrent::create([
            'cosrent_name' => 'gungadya_cosrent',
            'telp_number' => '08123456789',
            'address' => 'Jl. Tukad Buaji 23, Sesetan, Denpasar Selatan, Kota Denpasar, Bali 80225',
            'user_id' => 2,
        ]);
        
        Cosrent::create([
            'cosrent_name' => 'rikkayuu_cosrent',
            'telp_number' => '08123456787',
            'address' => 'Jl. Maruti Gg.3 No.15 Pemecutan Kaja, Denpasar Utara',
            'user_id' => 3,
        ]);
    }
}
