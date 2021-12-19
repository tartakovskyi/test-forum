<?php

namespace App\Repositories;

use App\Models\Post;


class PostRepository
{

	private $posts;
	private $tree = [];

	
	public function getTree($threadId, $limit = 10)
	{

		$this->posts = Post::where('thread_id', $threadId)->with(['user' => function($query) {
			$query->with('role');
		}])->get()->toArray();

		$tree = $this->buildTree();
		usort($tree, function($a, $b) {
			if ($a['created_at'] == $b['created_at']) {
				return 0;
			}
			return ($a['created_at'] > $b['created_at']) ? -1 : 1;
		});

		return array_slice($tree, 0, $limit);
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