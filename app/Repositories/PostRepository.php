<?php

namespace App\Repositories;

use App\Models\Post;


class PostRepository
{

	private $posts;
	private $tree = [];

	
	public function getTree($threadId)
	{

		$this->posts = Post::where('thread_id', $threadId)->with(['user' => function($query) {
			$query->with('role');
		}])->get()->toArray();

		return $this->buildTree();
	}


	private function buildTree($parentId = 0) {
		$branch = [];

		foreach ($this->posts as $post) {
			if ($post['parent_id'] == $parentId) {
				$children = $this->buildTree($post['id']);
				if ($children) {
					$post['children'] = $children;
				}
				$branch[] = $post;
			}
		}

		return $branch;
	}

}


?>