<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'Anime']);
        Category::create(['name' => 'Games']);
        Category::create(['name'=> 'Movies']);
        Category::create(['name'=> 'Manga']);
        Category::create(['name'=> 'TV Series']);
        Category::create(['name'=> 'Webtoon']);
        Category::create(['name'=> 'Other']);
    }
}
