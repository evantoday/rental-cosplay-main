<?php

namespace App\Models;

use Carbon\Carbon;
use App\Enums\CostumeSize;
use App\Enums\CostumeStatus;
use Illuminate\Database\Eloquent\Model;
use Yogameleniawan\SearchSortEloquent\Traits\Sortable;
use Yogameleniawan\SearchSortEloquent\Traits\Searchable;

class Costum extends Model
{
    use Searchable;
    use Sortable;
    protected $table = "costum";

    protected $fillable = [
        "name",
        "description",
        "price",
        "category_id",
        "cosrent_id",
        "size",
        "brand",
        "status",
        "stock",
    ];

    protected $guarded = [
        "created_at",
        "updated_at",
    ];

    public function getStatusAttribute($value)
    {
        if ($value === CostumeStatus::Rented->value && $this->tanggal_kembali_kostum) {
            $threeDaysAgo = Carbon::now()->subDays(3);
            if (Carbon::parse($this->tanggal_kembali_kostum)->lessThanOrEqualTo($threeDaysAgo)) {
                $this->update(['status' => CostumeStatus::Ready->value]);
                return 'ready';
            }
        }

        return $value;
    }

    public function cast()
    {
        return [
            'size' => CostumeSize::class,
            'status' => CostumeStatus::class
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function cosrent()
    {
        return $this->belongsTo(Cosrent::class);
    }

    public function images_of_costum()
    {
        return $this->hasMany(ImageOfCostum::class);
    }

    public function firstImage()
    {
        return $this->hasOne(ImageOfCostum::class, 'costum_id')->oldestOfMany(); // Mengambil gambar pertama berdasarkan ID terkecil
    }

    public function partial_costumes()
    {
        return $this->hasMany(PartialCostume::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
