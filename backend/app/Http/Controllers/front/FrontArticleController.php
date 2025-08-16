<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class FrontArticleController extends Controller
{
    //This method will return all active articles
     public function index() {
        $article = Article::orderBy('created_at','DESC')
                                ->where('status',1)->get();
        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }

    // This method will return latest active articles
    public function latestArticles(Request $request) {
        $article = Article::orderBy('created_at','DESC')
                                ->where('status',1)
                                ->limit($request->limit)->get();

        return response()->json([
            'status' => true,
            'data' => $article
        ]); 
    }

    //  This method will return single article 
    public function article($id) {
        $article = Article::find($id);

        if ($article == null) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }
}
