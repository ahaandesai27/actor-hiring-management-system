import { useState, useEffect, useRef } from "react";
import axios from "axios";
import apiurl from "../../apiurl";
import { useParams } from "react-router-dom";
import { useUser } from '../User/user';
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
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
      setLikedPosts(new Set(likedResponse.data.postIds));
      
      response = await axios.get(`${apiurl}/post/${postId}/comments`);
      setComments(response.data);
    }
    fetchComments();
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMs = now - postTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;
    return `${diffInYears}y ago`;
  };

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

  const handleLike = async (post_id) => {
    const isLiked = likedPosts.has(post_id);

    // Update UI immediately using hash maps for O(1) lookups and updates
    const newLikedPosts = new Set(likedPosts);
    const newPostLikeCounts = { ...postLikeCounts };
    
    if (isLiked) {
      newLikedPosts.delete(post_id);
      newPostLikeCounts[post_id] = (newPostLikeCounts[post_id] || 0) - 1;
    } else {
      newLikedPosts.add(post_id);
      newPostLikeCounts[post_id] = (newPostLikeCounts[post_id] || 0) + 1;
    }
    
    setLikedPosts(newLikedPosts);
    setPostLikeCounts(newPostLikeCounts);

    try {
      if (isLiked) {
        await axios.delete(`${apiurl}/post/like`, {
          data: { professional: userName, post_id },
        });
        alert("Unliked successfully!");
      } else {
        await axios.post(`${apiurl}/post/like`, {
          professional: userName,
          post_id,
        });
        alert("Liked successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Action failed.");
      
      // Revert changes on error using hash maps
      const revertedLikedPosts = new Set(likedPosts);
      const revertedPostLikeCounts = { ...postLikeCounts };
      
      setLikedPosts(revertedLikedPosts);
      setPostLikeCounts(revertedPostLikeCounts);
    }
  };

  const formatNumber = () => {
    // idk
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-mydark border-b border-gold p-4 top-0 z-10">
        <h1 className="text-3xl text-center p-4 font-bold text-gold">Posts</h1>
      </div>

      {/* Parent Post */}
      <div key={post?.post_id} className="bg-mydark border-b border-gold p-2">
        {/* Post Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {post?.creator.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gold">@{post?.creator}</p>
                <p className="text-sm text-gray-500">
                  {formatTimeAgo(post?.time)}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-white text-lg">{post?.contents}</p>
        </div>

        {/* Post Actions */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleLike(post?.post_id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                likedPosts.has(post?.post_id)
                  ? "text-red-600 bg-red-50 hover:bg-red-100"
                  : "like-button"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  likedPosts.has(post?.post_id) ? "fill-current" : ""
                }`}
              />
              <span className="font-medium">{postLikeCounts[post?.post_id] || post?.likes}</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 rounded-full reply-button">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Reply</span>
            </button>
          </div>
        </div>
      </div>

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