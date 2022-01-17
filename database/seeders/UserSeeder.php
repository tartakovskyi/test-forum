<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        User::create(
            [
                'login' => 'admin',
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'test@test.com',
                'phone' => '0681234567',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'role_id' => 1,
                'userpic' => 'admin.jpg'
            ]
        );

        User::factory(25)->create();
    }
}
