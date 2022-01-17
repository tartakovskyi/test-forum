import React from 'react'
import Post from './Post'


function PostList({ posts, counter, editPost, level, parent, scrollToParent }) {


  return (
    <div className={'topic_comments level-' + level}>
    {posts && posts.map(post => <Post 
      post={post} 
      level={level}
      parent={parent}
      key={post.id}
      counter={counter}
      editPost={editPost}
      scrollToParent={scrollToParent}
    />)}    
    </div>
  )
}


export default PostList