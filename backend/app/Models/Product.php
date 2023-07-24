<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    public function getImageAttribute(): string
    {
        return env('APP_URL') . Storage::url($this->attributes['image']);
    }

    public function getOriginImageAttribute(): string
    {
        return $this->attributes['image'];
    }

    public function scopeFilter($query)
    {
        return $query->when(request('search'), function ($query) {
            $query->where('title', 'like', '%' . request('search') . '%')->orWhere('description', 'like', '%' . request('search') . '%');
        })->when(request('tag'), function ($query) {
            if(request('tag') === 'all'){
                return;
            }
            return $query->where('tag_id', request('tag'));
        });
    }

}
