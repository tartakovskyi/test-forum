<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Thread;
use App\Repositories\PostRepository;
use App\Repositories\ThreadRepository;
use Illuminate\Http\Request;


class ThreadController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['store']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        return (new ThreadRepository())->getThreads($request->limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $newThread = (new ThreadRepository())->store($request);

        if ($newThread) {
            return response()->json(['info' => 'Thread successfully created!'], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $threadInfo = Thread::with('user:id,login,userpic')->find($id);
        $postRepository = new PostRepository();
        $threadInfo['count'] = $postRepository->getCount($id);
        $posts = $postRepository->getTree($id, $request->limit);

        return compact('threadInfo', 'posts');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
