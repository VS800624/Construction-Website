<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TempImage;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

class DeleteOldTempImages extends Command
{
    protected $signature = 'tempImages:cleanup';
    protected $description = 'Delete temporary images older than 1 day';

    public function handle()
    {
        $yesterday = Carbon::now()->subDay();

        // Fetch images older than 1 day
        $oldImages = TempImage::where('created_at', '<', $yesterday)->get();

        foreach ($oldImages as $image) {
            $filePath = public_path('uploads/temp/' . $image->name);
            $thumbPath = public_path('uploads/temp/thumb/' . $image->name);

            // Delete files if they exist
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
            if (File::exists($thumbPath)) {
                File::delete($thumbPath);
            }

            // Delete record from DB
            $image->delete();
        }

        $this->info('Old temp images deleted successfully.');
    }
}
