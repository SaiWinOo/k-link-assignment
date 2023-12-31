<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{

    public function index()
    {
        return response()->json([
            'message' => 'success',
            'data' => [
                'tags' => Tag::all()
            ]
        ]);
    }
}
