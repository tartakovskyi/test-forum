<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use App\Models\Thread;
use App\Models\User;


class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Thread::factory()
        ->count(25)
        ->state(['user_id' => User::all()->random()])
        ->create();
    }
}


