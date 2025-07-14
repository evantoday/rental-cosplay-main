<?php

namespace App\Models;

use App\Enums\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Yogameleniawan\SearchSortEloquent\Traits\Sortable;
use Yogameleniawan\SearchSortEloquent\Traits\Searchable;

class Order extends Model
{
    use Searchable;
    use Sortable;
    protected $table = "order";

    protected $fillable = [
        "cosrent_id",
        "costum_id",
        "user_id",
        "status",
        "tanggal_mulai_rental",
        "tanggal_kembali_kostum",
        "bukti_pembayaran",
        "deadline_payment"
    ];

    protected $guarded = [
        "created_at",
        "updated_at"
    ];

    public function cast()
    {
        return [
            "status" => OrderStatus::class
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cosrent()
    {
        return $this->hasMany(Cosrent::class);
    }

    public function costum()
    {
        return $this->belongsTo(Costum::class);
    }
}
