<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class FrontMemberController extends Controller
{
    public function index() {
        $members = Member::orderBy("created_at","DESC")
                    ->where("status",1)->get();
        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }
}
