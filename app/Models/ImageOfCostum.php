<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageOfCostum extends Model
{
    protected $table = "images_of_costum";

    protected $fillable = [
        "costum_id",
        "images_link",
        "partial_costum_id"
    ];

    protected $guarded = [
        "created_at",
        "updated_at"
    ];

    public function costum()
    {
        return $this->belongsTo(Costum::class);
    }
}
