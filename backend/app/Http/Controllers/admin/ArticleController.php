<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    // This method will fetch all the articles
    public function index() {
        $article = Article::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }

    // This method will insert articles in DB
    public function store(Request $request){

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:articles,slug'
        ]);

        if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $article = new Article();
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

      // Store temp  image here
          if($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now'). $article->id. '.' .$ext;
                
                // Making image small here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $smallPath = public_path('uploads/articles/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($smallPath);

                // Making image large here
                $largePath = public_path('uploads/articles/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($largePath);

                $article->image = $fileName;
                $article->save();

                 // ✅ Only delete temp image if both versions exist
                if (file_exists($smallPath) && file_exists($largePath)) {
                    @unlink($sourcePath); // delete temp file
                    $tempImage->delete(); // delete DB record
                }
            }
        }

         return response()->json([
            'status' => true,
            'message' => 'Article added successfully'
        ]);
    }

     // This method will fetch single article
    public function show($id) {

        $article = Article::find($id);

        if ($article == null) {
            return response()->json([
                'status' => false,
                'messsage' => 'Article not found'
            ]);
        }
        
        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }

    // This method will update articles in DB
    public function update (Request $request, $id) {

        $article = Article::find($id);

         if($article == null) {
            return response()->json([
                'status' => false,
                'message' => "Article not found."
            ]);
        }

        $request->merge(['slug' => Str::slug($request->slug)]);

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug'  => 'required|unique:services,slug,' .$id. ',id'
        ]);

         if ($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
        
        $article->title = $request->title;
        $article->slug = Str::slug($request->slug);
        $article->author = $request->author;
        $article->content = $request->content;
        $article->status = $request->status;
        $article->save();

         // Store temp  image here
          if($request->imageId > 0) {
             $oldImage = $article->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now'). $article->id. '.' .$ext;
                
                // Making image small here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $smallPath = public_path('uploads/articles/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(450, 300);
                $image->save($smallPath);

                // Making image large here
                $largePath = public_path('uploads/articles/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($largePath);

                $article->image = $fileName;
                $article->save();
   
                if ($oldImage != ''){
                    File::delete(public_path('uploads/articles/large/'.$oldImage));
                    File::delete(public_path('uploads/articles/small/'.$oldImage));
                }

                 // ✅ Only delete temp image if both versions exist
                if (file_exists($smallPath) && file_exists($largePath)) {
                    @unlink($sourcePath); // delete temp file
                    $tempImage->delete(); // delete DB record
                }
            }
        }

         return response()->json([
            'status' => true,
            'message' => 'Article updated successfully'
        ]);
    }

    // This method will delete article from DB
    public function destroy($id) {
        $article = Article::find($id);

        if ($article == null) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ]);
        }

        
        if ($article->image != ''){
            File::delete(public_path('uploads/articles/large/'.$article->image));
            File::delete(public_path('uploads/articles/small/'.$article->image));
        }

        $article->delete();

        return response()-> json([
            'status' => true,
            'message' => 'Article deleted successfully'
        ]);
    }
}
