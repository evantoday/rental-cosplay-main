<?php

namespace App\Enums;

enum OrderStatus: string
{
    case AWAITING_PAYMENT = 'awaiting_payment';
    case PENDING = 'waiting_confirmation';
    case CONFIRMED = 'confirmed';
    case REJECTED = 'rejected';
    case CANCELLED = 'cancelled';
    case DONE = 'done';
}
