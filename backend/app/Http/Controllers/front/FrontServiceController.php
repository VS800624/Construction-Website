<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

class FrontServiceController extends Controller
{
    //This method will return all active services
    public function index() {
        $services = Service::where('status',1)->orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    // This method will return latest active services
    public function latestServices(Request $request){
        $services = Service::where('status',1)
                            ->take($request->get('limit'))
                            ->orderBy('created_at', 'DESC')->get();
                            
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    // This method will return single service
    public function service($id) {
        $service = Service::find($id);

        if ($service == null) {
            return response()->json([
                'status' => false,
                'message' => "No service found"
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }
}
