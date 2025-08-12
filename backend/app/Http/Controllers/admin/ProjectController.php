<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{
    // This method will return all projects
    public function index()
    {
        $projects = Project::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    // This method will insert a project in db
    public function store(Request $request)
    {

        //Dummy title
        //dummy-title
        // Str::slug('Dummy title) = 'dummy-title'

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project = new Project();
        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->status = $request->status;
        $project->location = $request->location;
        $project->save();


        // Store temp image here
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $project->id . '.' . $ext;

                $sourcePath = public_path('uploads/temp/' . $tempImage->name);

                // Check if source temp file exists
                if (!file_exists($sourcePath)) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Temp image file not found.'
                    ]);
                }

        try {
            // Image manager instance
            $manager = new ImageManager(Driver::class);

            // Making image small
            $smallPath = public_path('uploads/projects/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(500, 600);
            $image->save($smallPath);

            // Making image large
            $largePath = public_path('uploads/projects/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($largePath);

            // Save image name to project
            $project->image = $fileName;
            $project->save();

            // ✅ Only delete temp image if both versions exist
            if (file_exists($smallPath) && file_exists($largePath)) {
                @unlink($sourcePath); // delete temp file
                $tempImage->delete(); // delete DB record
            }

            return response()->json([
                'status' => true,
                'message' => 'Project added successfully and temp image deleted.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Image processing failed: ' . $e->getMessage()
            ]);
        }
    }
}

    }

    public function update($id, Request $request) {

        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,'.$id. ',id'
        ]);

        if ($validator->fails()) {
            return response() ->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->status = $request->status;
        $project->location = $request->location;
        $project->save();

        //  Save Temp Image here
        if($request->imageId > 0) {
            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now'). $project->id. '.' .$ext;

                
                // Making image small here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(500, 600);
                $image->save($destPath);

                // Making image large here
                $destPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();

                if ($oldImage != ''){
                    File::delete(public_path('uploads/projects/large/'.$oldImage));
                    File::delete(public_path('uploads/projects/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Project updated successfully.'
        ]);
    }

    public function show($id) {
        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }

        return response()->json([
                'status' => true,
                'data' => $project
            ]);
    }

    public function destroy($id) {
        $project = Project::find($id);

       if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ]);
        }
        
        File::delete(public_path('uploads/projects/large/'.$project->image));
        File::delete(public_path('uploads/projects/small/'.$project->image));
        
        $project->delete();

        return response()->json([
                'status' => true,
                'message' => 'Project deleted successfully'
            ]);
    }
}
