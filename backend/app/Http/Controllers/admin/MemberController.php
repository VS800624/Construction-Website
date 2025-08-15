<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MemberController extends Controller
{
    // This method will return all members
    public function index() {

        $members = Member::orderBy("created_at","DESC") ->get();

        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    // This method will store/insert members 
    public function store (Request $request) {

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        return response()->json([
            'status' => true,
            'message' => 'Member added successfully.'
        ]);

        // Save Temp Image here
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$member->id . '.' . $ext;

                // Making image  here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $desPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($desPath);

                $member->image = $fileName;
                $member->save();

                 // ✅ Only delete temp image if both versions exist
                if (file_exists($desPath) ) {
                    @unlink($sourcePath); // delete temp file
                    $tempImage->delete(); // delete DB record
                }

            }
        }
    }

     // This method will return single members data 
    public function show ($id) { 
        $member = Member::find($id);

        if ($member == null){
            return response()->json([
            'status' => false,
            'message' => "Member not found"
        ]);
        }
        
        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }

     // This method will update a single member data 
    public function update ($id, Request $request) {

        $member = Member::find($id);
  
        if ($member == null){
            return response()->json([
            'status' => false,
            'message' => "Member not found"
        ]);
        }
        
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        // Save Temp Image here
        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$member->id . '.' . $ext;

                // Making image  here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $desPath = public_path('uploads/members/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($desPath);

                $member->image = $fileName;
                $member->save();

                 
                if ($oldImage != ''){
                    File::delete(public_path('uploads/members/'.$oldImage));
                }
                
                // ✅ Only delete temp image if both versions exist
                if (file_exists($desPath)) {
                    @unlink($sourcePath); // delete temp file
                    $tempImage->delete(); // delete DB record
                }

            }
        }

         return response()->json([
            'status' => true,
            'message' => 'Member updated successfully.'
        ]);
    }

     // This method will delete a member from DB
    public function destroy ($id) {
        $member = Member::find($id);

         if ($member == null){
            return response()->json([
            'status' => false,
            'message' => "Member not found."
        ]);
        }

         if ($member->image != ''){
            File::delete(public_path('uploads/members/'.$member->image));
         }
        $member->delete();

        return response()->json([
            'status' => true,
            'message' => "Member deleted successfully."
        ]);
    }
}
