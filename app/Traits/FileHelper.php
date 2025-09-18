<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait FileHelper
{
    public function generateUniqueFileName($file)
    {
        $originalFileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $baseName = pathinfo($originalFileName, PATHINFO_FILENAME);

        // Use Str::slug for a clean and URL-friendly filename
        $cleanBaseName = Str::slug($baseName);

        // Include a random component for uniqueness
        $uniqueIdentifier = Str::orderedUuid();
        $uuidString = $uniqueIdentifier->toString();


        $fileName = "{$cleanBaseName}-{$uuidString}.{$extension}";

        return $fileName;
    }
}
