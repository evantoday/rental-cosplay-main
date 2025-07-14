<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserStatus;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Yogameleniawan\SearchSortEloquent\Traits\Sortable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Yogameleniawan\SearchSortEloquent\Traits\Searchable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use Searchable;
    use Sortable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => UserStatus::class,
        ];
    }

    public function isBanned(): bool
    {
        return $this->status === UserStatus::Banned->value;
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function biodata()
    {
        return $this->hasOne(Biodata::class);
    }
}
