<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Yogameleniawan\SearchSortEloquent\Traits\Sortable;
use Yogameleniawan\SearchSortEloquent\Traits\Searchable;

class Role extends Model
{
    use HasFactory;
    use Searchable;
    use Sortable;

    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
