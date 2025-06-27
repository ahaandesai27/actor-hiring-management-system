import React from "react";
import axios from "axios";
import apiurl from "../../apiurl";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";

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

const PostItem = React.forwardRef(({ 
  post, 
  isLiked, 
  likeCount, 
  currentUser, 
  onLikeToggle 
}, ref) => {
  const handleLike = async () => {
    // Optimistically update UI
    onLikeToggle(post.post_id, !isLiked);

    try {
      if (isLiked) {
        await axios.delete(`${apiurl}/post/like`, {
          data: { professional: currentUser, post_id: post.post_id },
        });
        alert("Unliked successfully!");
      } else {
        await axios.post(`${apiurl}/post/like`, {
          professional: currentUser,
          post_id: post.post_id,
        });
        alert("Liked successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Action failed.");
      // Revert the change on error
      onLikeToggle(post.post_id, isLiked);
    }
  };

  return (
    <div 
      ref={ref}
      className="bg-mydark border-b border-gold p-2"
    >
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
              <div className="text-white font-semibold text-sm">
                {post.creator.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <button
                className="font-semibold text-gold"
                onClick={() => {
                  window.location.href = `/profile/${post.creator}`;
                }}
              >
                @{post.creator}
              </button>
              <p className="text-sm text-gray-500">
                {formatTimeAgo(post.time)}
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
        <p className="text-white text-lg">{post.contents}</p>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
              isLiked
                ? "text-red-600 hover:bg-red-100"
                : "like-button"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
            />
            <span className="font-medium">{likeCount}</span>
          </button>

          <button
            className="flex items-center space-x-2 px-3 py-2 rounded-full reply-button"
            onClick={() => {
              window.location.href = `/posts/${post.post_id}`;
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
});

PostItem.displayName = 'PostItem';

export default PostItem;