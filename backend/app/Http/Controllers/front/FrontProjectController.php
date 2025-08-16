<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class FrontProjectController extends Controller
{
    // This method will return latest active projects
    public function latestProjects(Request $request) {
        $projects = Project::orderBy('created_at','DESC')
                            ->where('status',1)
                            ->limit($request->limit)->get();

        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

//This method will return all active projects
    public function index(){
        $projects = Project::orderBy('created_at','DESC')
                            ->where('status',1)->get();

        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    // This method will return single project
    public function project($id){
        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found.'
            ]);

        }
        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }
}
