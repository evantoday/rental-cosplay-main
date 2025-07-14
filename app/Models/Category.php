<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "category";

    protected $fillable = [
        "name",
    ];

    protected $guarded = [
        "created_at",
        "updated_at"
    ];

    public function costum()
    {
        return $this->hasMany(Costum::class);
    }
}
