// Posts Component
import React, { useState
              ,  useEffect 
              } from "react";
const Posts = () => {
  return (
    <div className="bg-grey posts-container h-max">
      <h2>Recent Post</h2>
      <div className="post-box">
        <p className="post-text">This is a sample post...</p>
        <img className="post-image" src="" alt="Post" />
      </div>
      <a href="/all-posts" className="view-all-posts">View All Posts</a>
    </div>
  );
};

export default Posts;

