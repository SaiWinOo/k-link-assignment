<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function index(): JsonResponse
    {
        $products = Product::filter()->
        latest()->paginate(10);
        return response()->json([
            'message' => 'success',
            'data' => [
                'products' => $products,
            ]
        ]);
    }

    public function store(ProductCreateRequest $request): JsonResponse
    {
        $attributes = $request->only('title', 'description', 'price', 'tag_id');
        if ($request->has('image')) {
            $img_name = $request->file('image')->store('public/products');
            $attributes['image'] = $img_name;
        }

        Product::create($attributes);
        return response()->json([
            'message' => 'success',
            'data' => [
                'message' => 'Product is created!'
            ]
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $product = Product::where('id', $id)->first();
        if (!$product) {
            return response()->json([
                'message' => 'fail',
                'errors' => [
                    'message' => 'No product was found',
                ]
            ],404);
        }

        return response()->json([
            'message' => 'success',
            'data' => [
                'product' => $product,
            ]
        ]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'image' => 'nullable|mimes:png,jpg,jpeg',
        ]);
        $product = Product::where('id', $id)->first();

        if (!$product) {
            return response()->json([
                'message' => 'fail',
                'errors' => [
                    'message' => 'No product was found',
                ]
            ],404);
        }

        $request->title && $product->title = $request->title;
        $request->description && $product->description = $request->description;
        $request->price && $product->price = $request->price;
        $request->tag_id && $product->tag_id = $request->tag_id;
        if ($request->has('image')) {
            $img_name = $request->file('image')->store('public/products');
            $product->image = $img_name;
        }
        $product->update();
        return response()->json([
            'message' => 'success',
            'data' => [
                'product' => $product,
            ]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $product = Product::where('id', $id)->first();

        if (!$product) {
            return response()->json([
                'message' => 'fail',
                'errors' => [
                    'message' => 'No product was found',
                ]
            ],404);
        }

        $product->delete();
        if($product->originImage){
            Storage::delete($product->originImage);
        }
        return response()->json([
            'message' => 'success',
            'data' => [
                'message' => 'Product is deleted!'
            ]
        ]);
    }


}
