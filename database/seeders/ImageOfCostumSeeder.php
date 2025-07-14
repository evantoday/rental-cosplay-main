<?php

namespace Database\Seeders;

use App\Models\ImageOfCostum;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ImageOfCostumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //gungadya
        $shizuku = [
            [
                'costum_id' => 1,
                'images_link' => 'uploads/costumes/shizuku1.jpg',
            ],
            [
                'costum_id' => 1,
                'images_link' => 'uploads/costumes/shizuku2.jpg',
            ]
        ];
        foreach ($shizuku as $shizukus) {
            ImageOfCostum::create($shizukus);
        }

        $kurumi = [
            [
                'costum_id' => 2,
                'images_link' => 'uploads/costumes/kurumi1.jpg',
            ],
            [
                'costum_id' => 2,
                'images_link' => 'uploads/costumes/kurumi2.jpg',
            ]
        ];
        foreach ($kurumi as $kurumis) {
            ImageOfCostum::create($kurumis);
        }

        $krul = [
            [
                'costum_id' => 3,
                'images_link' => 'uploads/costumes/krul1.jpg',
            ],
            [
                'costum_id' => 3,
                'images_link' => 'uploads/costumes/krul2.jpg',
            ]
        ];
        foreach ($krul as $kruls) {
            ImageOfCostum::create($kruls);
        }

        $angel_devil = [
            [
                'costum_id' => 4,
                'images_link' => 'uploads/costumes/angel_devil1.jpg',
            ],
            [
                'costum_id' => 4,
                'images_link' => 'uploads/costumes/angel_devil2.jpg',
            ]
        ];
        foreach ($angel_devil as $angel_devils) {
            ImageOfCostum::create($angel_devils);
        }

        $denji = [
            [
                'costum_id' => 5,
                'images_link' => 'uploads/costumes/denji1.jpg',
            ],
            [
                'costum_id' => 5,
                'images_link' => 'uploads/costumes/denji2.jpg',
            ]
        ];
        foreach ($denji as $denjis) {
            ImageOfCostum::create($denjis);
        }

        $hutao = [
            [
                'costum_id' => 6,
                'images_link' => 'uploads/costumes/hutao1.jpg',
            ],
            [
                'costum_id' => 6,
                'images_link' => 'uploads/costumes/hutao2.jpg',
            ]
        ];
        foreach ($hutao as $hutaos) {
            ImageOfCostum::create($hutaos);
        }

        $keqing = [
            [
                'costum_id' => 7,
                'images_link' => 'uploads/costumes/keqing1.jpg',
            ],
            [
                'costum_id' => 7,
                'images_link' => 'uploads/costumes/keqing2.jpg',
            ]
        ];
        foreach ($keqing as $keqings) {
            ImageOfCostum::create($keqings);
        }

        $yae = [
            [
                'costum_id' => 8,
                'images_link' => 'uploads/costumes/yae1.jpg',
            ],
            [
                'costum_id' => 8,
                'images_link' => 'uploads/costumes/yae2.jpg',
            ]
        ];
        foreach ($yae as $yaes) {
            ImageOfCostum::create($yaes);
        }

        //rikkayu
        $alya = [
            [
                'costum_id' => 9,
                'images_link' => 'uploads/costumes/alya1.jpg',
            ],
            [
                'costum_id' => 9,
                'images_link' => 'uploads/costumes/alya2.jpg',
            ]
        ];
        foreach ($alya as $alyas) {
            ImageOfCostum::create($alyas);
        }

        $bocchi = [
            [
                'costum_id' => 10,
                'images_link' => 'uploads/costumes/bocchi1.jpg',
            ],
            [
                'costum_id' => 10,
                'images_link' => 'uploads/costumes/bocchi2.jpg',
            ]
        ];
        foreach ($bocchi as $bocchis) {
            ImageOfCostum::create($bocchis);
        }

        $kirito = [
            [
                'costum_id' => 11,
                'images_link' => 'uploads/costumes/kirito1.jpg',
            ],
            [
                'costum_id' => 11,
                'images_link' => 'uploads/costumes/kirito2.jpg',
            ]
        ];
        foreach ($kirito as $kiritos) {
            ImageOfCostum::create($kiritos);
        }

        $kafka = [
            [
                'costum_id' => 12,
                'images_link' => 'uploads/costumes/kafka1.jpg',
            ],
            [
                'costum_id' => 12,
                'images_link' => 'uploads/costumes/kafka2.jpg',
            ]
        ];
        foreach ($kafka as $kafkas) {
            ImageOfCostum::create($kafkas);
        }

        $welt = [
            [
                'costum_id' => 13,
                'images_link' => 'uploads/costumes/welt1.jpg',
            ],
            [
                'costum_id' => 13,
                'images_link' => 'uploads/costumes/welt2.jpg',
            ]
        ];
        foreach ($welt as $welts) {
            ImageOfCostum::create($welts);
        }

        $danheng = [
            [
                'costum_id' => 14,
                'images_link' => 'uploads/costumes/danheng1.jpg',
            ],
            [
                'costum_id' => 14,
                'images_link' => 'uploads/costumes/danheng2.jpg',
            ]
        ];
        foreach ($danheng as $danhengs) {
            ImageOfCostum::create($danhengs);
        }
    }
}
