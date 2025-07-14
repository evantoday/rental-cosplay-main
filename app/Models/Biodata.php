<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Biodata extends Model
{
    protected $table = 'biodata';

    protected $fillable = [
        'user_id',
        'phone_whatsapp',
        'parents_phone',
        'full_address',
        'instagram',
        'tiktok',
        'friends_social_media',
        'ktp',
        'selfie_with_ktp',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
