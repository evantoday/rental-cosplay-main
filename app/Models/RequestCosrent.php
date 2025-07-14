<?php

namespace App\Models;

use App\Enums\RequestStatus;
use Illuminate\Database\Eloquent\Model;
use Yogameleniawan\SearchSortEloquent\Traits\Sortable;
use Yogameleniawan\SearchSortEloquent\Traits\Searchable;

class RequestCosrent extends Model
{
    use Searchable;
    use Sortable;
    protected $table = 'request';

    protected $fillable = [
        'user_id',
        'reason_to_be_cosrent',
        'status',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public function cast(): array
    {
        return [
            'status' => RequestStatus::class,
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
