import { useState, useEffect, useRef } from "react";
import axios from "axios";
import apiurl from "../../apiurl";
import { useParams } from "react-router-dom";
import { useUser } from '../User/user';
import { MessageCircle } from "lucide-react";
import PostItem from "./PostItem";
import "./style.css";

const PostComments = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [postLikeCounts, setPostLikeCounts] = useState({});
  const { postId } = useParams();
  const { userName } = useUser();
  const newComment = useRef();

  useEffect(() => {
    console.log("Component mounted");
    async function fetchComments() {
      let response = await axios.get(`${apiurl}/post/${postId}`);
      console.log(response.data);
      setPost(response.data);
      
      // Initialize hash map for like count
      setPostLikeCounts({ [response.data.post_id]: response.data.likes });
      
      // Check if post is already liked
      let likedResponse = await axios.get(`${apiurl}/post/liked/${userName}`);
      const postIds = likedResponse.data.map(post => post.post_id);
      setLikedPosts(new Set(postIds));
      
      response = await axios.get(`${apiurl}/post/${postId}/comments`);
      setComments(response.data);
    }
    fetchComments();
  }, []);

  const handlePostComment = async () => {
    await axios.post(`${apiurl}/comment`,
      {
        post: postId,
        contents: newComment.current.value,
        creator: userName
      }
    )
    alert("Commented successfully!");
    window.location.reload();
  }

  const handleLikeToggle = (postId, newIsLiked) => {
    const newLikedPosts = new Set(likedPosts);
    const newPostLikeCounts = { ...postLikeCounts };
    
    if (newIsLiked) {
      newLikedPosts.add(postId);
      newPostLikeCounts[postId] = (newPostLikeCounts[postId] || 0) + 1;
    } else {
      newLikedPosts.delete(postId);
      newPostLikeCounts[postId] = (newPostLikeCounts[postId] || 0) - 1;
    }
    
    setLikedPosts(newLikedPosts);
    setPostLikeCounts(newPostLikeCounts);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-mydark border-b border-gold p-4 top-0 z-10">
        <h1 className="text-3xl text-center p-4 font-bold text-gold">Posts</h1>
      </div>

      {/* Parent Post using PostItem component */}
      {post && (
        <PostItem
          post={post}
          isLiked={likedPosts.has(post.post_id)}
          likeCount={postLikeCounts[post.post_id] || post.likes}
          currentUser={userName}
          onLikeToggle={handleLikeToggle}
        />
      )}

      {/* Comment Input */}
      <div className="p-6 border-t border-gold bg-mydark">
        <textarea
          ref={newComment}
          placeholder="Write a comment..."
          className="w-full p-3 rounded-md bg-mydark text-white border border-gold focus:outline-none focus:ring-2 focus:ring-gold"
          rows={3}
        />
        <div className="mt-3 text-right">
          <button
            onClick={handlePostComment}
            className="px-4 py-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-600 transition-colors"
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* Comments Feed */}
      <div className="space-y-0">
        {comments.map((comment) => (
          <div
            key={comment.comment_id}
            className="ml-6 bg-mydark border-l-4 border-gold p-3 rounded-md"
          >
            {/* Comment Header */}
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {comment.creator.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gold text-sm">
                  @{comment.creator}
                </p>
              </div>
            </div>
            {/* Comment Content */}
            <p className="text-white text-base">{comment.contents}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="p-6 text-center">
        <button className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
          Load More Comments
        </button>
      </div>
    </div>
  );
};

export default PostComments;