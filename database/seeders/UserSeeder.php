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
                'login' => 'VVT',
                'first_name' => 'Volodymyr',
                'last_name' => 'Tartakovskyi',
                'email' => 'km170682tvv@gmail.com',
                'phone' => '0686425099',
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
                'role' => 1,
                'userpic' => 'volodymyr.jpg'
            ]
        );

        User::factory(25)->create();
    }
}
