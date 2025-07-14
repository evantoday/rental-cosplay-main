<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::where('name', 'admin')->first();
        $cosrentRole = Role::where('name', 'cosrent')->first();
        $userRole = Role::where('name', 'user')->first();

        User::create([
            'name' => 'Administrator Sistem',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id,
        ]);

        User::create([
            'name' => 'gungadya',
            'email' => 'gungadya@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => $cosrentRole->id,
        ]);

        User::create([
            'name' => 'rikkayuu_rikkachu',
            'email' => 'rikka@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => $cosrentRole->id,
        ]);

        User::create([
            'name' => 'Palguna',
            'email' => 'palguna@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ]);

        User::create([
            'name' => 'Rafi',
            'email' => 'rafi@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ]);

        User::create([
            'name' => 'Fufufafa',
            'email' => 'fufufafa@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id,
        ]);
    }
}
