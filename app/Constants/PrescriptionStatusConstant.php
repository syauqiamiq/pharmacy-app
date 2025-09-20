<?php

namespace App\Constants;

class PrescriptionStatusConstant
{
    public const DRAFT = "DRAFT";
    public const PENDING_VALIDATION = "PENDING_VALIDATION";
    public const VALIDATED = "VALIDATED";
    public const ON_HOLD = "ON_HOLD";
    public const DISPENSING = "DISPENSING";
    public const DISPENSED = "DISPENSED";
    public const DONE = "DONE";
    public const REJECTED = "REJECTED";
    public const CANCELED = "CANCELED";
    public const RETURN = "RETURN";
    public const EXPIRED = "EXPIRED";
}
