<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $roles = ['admin', 'user'];
        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        User::create([
            'name' => 'Sai Win Oo',
            'email' => 'saiwinoo52@gmail.com',
            'password' => 'password',
            'role_id' => 2,
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'password',
            'role_id' => 1,
        ]);


        $tags = [
            'Electronics',
            'Laptops',
            'Smartphones',
            'Clothing',
            'Men\'s Fashion',
            'Women\'s Fashion',
            'Accessories',
            'Home Appliances',
            'Furniture',
            'Books',
            'Sports Gear',
            'Beauty Products',
            'Toys',
            'Jewelry',
            'Outdoor Equipment',
            'Gaming',
            'Health and Wellness',
            'Automotive',
            'Pet Supplies',
            'Art and Crafts'
        ];
        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        };

    }
}
