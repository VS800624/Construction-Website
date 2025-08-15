<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class FrontTestimonialController extends Controller
{
    // This will return all testimonials
    public function index() {
        $testimonial = Testimonial::orderBy("created_at","DESC")
                        ->where('status',1)
                        ->get();
        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }
}
