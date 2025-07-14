<?php

namespace Database\Seeders;

use App\Models\Costum;
use App\Enums\CostumeSize;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CostumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // beberapa costume gung adya
        $costume_gungadya = [
            [
                "name" => "Shizuku Tan",
                "description" => "Shizuku Tan is a character featured in the sequel of Saint ♡ Slippery's Academy for Girls video game series. Marin Kitagawa is a big fan of her, so much so that she wanted to cosplay as her, which also was her cosplay debut. She had tally marks up to 17 on her thighs, which is indicating how many sexual encounters the character had, so it is possible as the more sex you had in the game the more tally marks would be added to the character's thighs in the game.",
                "price" => "130000",
                "category_id" => 1,
                "cosrent_id" => 1,
                "size" => CostumeSize::M->value,
                "brand" => "Wudu",
            ],
            [
                "name" => "Kurumi Tokisaki",
                "description" => "Kurumi Tokisaki (時とき崎さき 狂くる三み, Tokisaki Kurumi?) is the third Spirit to appear. Due to her brutal actions, she is referred to as the Worst Spirit (最悪の精霊, Saiaku no Seirei?). She is also the first Spirit to appear as an antagonist in the Date A Live series.",
                "price" => "80000",
                "category_id" => 1,
                "cosrent_id" => 1,
                "size" => CostumeSize::M->value,
                "brand" => "Local Quality",
            ],
            [
                "name" => "Krul Tepes",
                "description" => "Krul Tepes is a third progenitor among the vampires and the former vampire queen of Japan. She is a secondary major character who is responsible for turning Mikaela Hyakuya and Mahiru Hiragi into vampires. She is the younger sister of Asuramaru and one of the highest ranking members of the Progenitor Council, being a third Progenitor.",
                "price" => "120000",
                "category_id" => 1,
                "cosrent_id" => 1,
                "size" => CostumeSize::S->value,
                "brand" => "Wudu",
            ],
            [
                "name" => "Angel Devil",
                "description" => "Angel (エンジェル Enjeru?) is the Angel Devil (天てん使しの悪あく魔ま Tenshi no Akuma?), a devil who embodies the fear of angels, and a Public Safety Devil Hunter from Tokyo Special Division 4. He serves as a supporting character in the Public Safety Saga.",
                "price" => "80000",
                "category_id" => 1,
                "cosrent_id" => 1,
                "size" => CostumeSize::L->value,
                "brand" => "Local Quality",
            ],
            [
                "name" => "Denji",
                "description" => "Denji (デンジ?) is the titular protagonist of the Chainsaw Man manga and anime series. He is the main protagonist of the Public Safety Saga and the co-protagonist of the Academy Saga.",
                "price" => "70000",
                "category_id" => 1,
                "cosrent_id" => 1,
                "size" => CostumeSize::L->value,
                "brand" => "Local Quality",
            ],
            [
                "name" => "Hu Tao",
                "description" => "Hu Tao (Chinese: 胡桃 Hú Táo) is a playable Pyro character in Genshin Impact.Hu Tao's antics and eccentricity belies her role as the 77th Director of the Wangsheng Funeral Parlor and her talent as a poet. Nevertheless, she treats the parlor's operations with utmost importance, and holds funeral ceremonies with the highest dignity and solemnity.",
                "price" => "150000",
                "category_id" => 2,
                "cosrent_id" => 1,
                "size" => CostumeSize::M->value,
                "brand" => "Local Quality",
            ],
            [
                "name" => "Keqing Skin",
                "description" => "Keqing (Chinese: 刻晴 Kèqíng) is a playable Electro character in Genshin Impact.As the Yuheng of the Liyue Qixing, she is someone who seeks her own answers instead of idly letting chaos run amok in Liyue. She chooses her own path with her own power and ability, instead of letting the gods determine her fate.",
                "price" => "100000",
                "category_id" => 2,
                "cosrent_id" => 1,
                "size" => CostumeSize::M->value,
                "brand" => "Local Quality",
            ],
            [
                "name" => "Yae Miko",
                "description" => "Yae Miko (Japanese: 八重神子 Yae Miko), also known as Guuji Yae (Japanese: 宮司 Guuji) or the Guuji, is a playable Electro character in Genshin Impact.A kitsune of many facets, Yae Miko oversees the Grand Narukami Shrine, owns the Yae Publishing House, and is Eternity's servant and friend.",
                "price" => "130000",
                "category_id" => 2,
                "cosrent_id" => 1,
                "size" => CostumeSize::M->value,
                "brand" => "Local Quality",
            ],
        ];

        //costume rikkayu
        $rikkayu = [
            [
                "name" => "Alya | Alisa Mikhailovna Kujou",
                "description" => "Alisa Mikhailovna Kujou (アリサ・ミハイロヴナ・九条くじょう Arisa Mihairovuna Kujō? ; Russian:  Алиса Михайловна Кудзё), also known as Alya, is the main female protagonist and the titular protagonist of the series. She is a first-year student at Seirei Private Academy. Alisa is an honor student with the highest grades in the school and serves as the Treasurer for the student council. She is widely regarded as one of the two most beautiful girls in her grade, alongside Yuki Suou, and is known as the Solitary Princess.",
                "price" => "80000",
                "category_id" => 1,
                "cosrent_id" => 2,
                "size" => CostumeSize::M->value,
                "brand" => "Local Brand",
            ],
            [
                "name" => "Bocchi | Hitori Goto",
                "description" => "Hitori Gotoh (後ご藤とう ひとり Gotō Hitori), an extremely timid and introverted first-year student in high school often referred by her bandmates as Bocchi-chan (ぼっちちゃん),[2] is the titular main protagonist of the manga and anime series, Bocchi the Rock!. She is in the first year of Shuka High School and is in charge of the guitar and lyrics of the band, Kessoku Band.",
                "price" => "80000",
                "category_id" => 1,
                "cosrent_id" => 2,
                "size" => CostumeSize::M->value,
                "brand" => "Local Brand",
            ],
            [
                "name" => "Kirito | Kirigaya Kazuto",
                "description" => "Kirigaya Kazuto (桐ヶ谷 和人, Kirigaya Kazuto?), born as Narusaka Kazuto (鳴坂 和人なるさか かずと, Narusaka Kazuto?)[1], and known as Kirito (キリト, Kirito?) in «Sword Art Online» (SAO), «ALfheim Online» (ALO), «Gun Gale Online» (GGO), «Project Alicization», and Unital Ring, is the protagonist of the main Sword Art Online series.",
                "price" => "80000",
                "category_id" => 1,
                "cosrent_id" => 2,
                "size" => CostumeSize::M->value,
                "brand" => "Local Brand",
            ],
            [
                "name" => "Kafka",
                "description" => "Kafka is a playable character in Honkai: Star Rail.A member of the Stellaron Hunters who is calm, collected, and beautiful. Her record on the wanted list of the Interastral Peace Corporation only lists her name and her hobby. People have always imagined her to be elegant, respectable, and in pursuit of things of beauty even in combat.",
                "price" => "120000",
                "category_id" => 2,
                "cosrent_id" => 2,
                "size" => CostumeSize::M->value,
                "brand" => "Local Brand",
            ],
            [
                "name" => "Welt",
                "description" => "Welt Yang, real name Joachim Nokianvirtanen, is a playable character in Honkai: Star Rail.An animator by trade, Welt is a seasoned member of the Astral Express Crew and the former sovereign of Anti-Entropy who has saved Earth from annihilation time and time again. He inherited the name of the world, 'Welt'",
                "price" => "130000",
                "category_id" => 2,
                "cosrent_id" => 2,
                "size" => CostumeSize::L->value,
                "brand" => "Local Brand",
            ],
            [
                "name" => "Danheng",
                "description" => "Dan Heng (Chinese: 丹恒) is a playable character in Honkai: Star Rail.The cold and reserved train guard and archivist of the Astral Express. Wielding a spear named Cloud-Piercer, he joined the Express crew to escape his secluded past.",
                "price" => "130000",
                "category_id" => 2,
                "cosrent_id" => 2,
                "size" => CostumeSize::L->value,
                "brand" => "Local Brand",
            ],
        ];

        foreach ($costume_gungadya as $costume) {
            Costum::create($costume);
        }

        foreach ($rikkayu as $cos) {
            Costum::create($cos);
        }
    }
}
