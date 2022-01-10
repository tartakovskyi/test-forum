<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Thread;


class ThreadRepository
{

	public function getThreads($limit)
    {

    	return response()->json(Thread::with('user:id,login,userpic')->withCount('posts')->latest()->take($limit)->get(), 200);
    }


	public function store(Request $request)
    {

    	$validated = $request->validate([
            'title' => 'string|required',
            'user_id' => 'numeric|exists:App\Models\User,id|required'
        ]);

        return Thread::create($request->all());
    }


    public function update(Request $request, $thread)
    {

        $validated = $request->validate([
            'title' => 'string|required'
        ]);

        
        return $thread->update([
            'title' => $request->title
        ]);
    }

}




?>