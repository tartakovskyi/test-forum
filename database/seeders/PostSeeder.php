<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Thread;
use App\Models\User;


class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $threads = Thread::pluck('id')->all();
        $users = User::pluck('id')->all();

        foreach ($threads as $threadId) {
            $count = rand(2, 25);
            $lastPost = 0;
            for ($i=0; $i < $count; $i++) {
                $parents = [0];
                $randParent = array_rand($parents);
                $randUser = array_rand($users);
                $parents[] = Post::factory()->make([
                    'thread_id' => $threadId,
                    'parent_id' => $parents[$randParent],
                    'user_id' => $users[$randUser]
                ])->id;
            }
        }
    }
}
