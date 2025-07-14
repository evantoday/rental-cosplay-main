<?php

namespace App\Enums;

enum RequestStatus: string
{
    case Notyet = 'notyet';
    case Approved = 'approved';
    case Rejected = 'rejected';
}
