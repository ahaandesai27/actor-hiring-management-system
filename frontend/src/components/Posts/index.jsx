import {
  useState, useEffect
  , useRef
} from "react";
import axios from "axios";
import apiurl from "../../apiurl";
import { useUser } from "../User/user";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import "./style.css";

import CreatePost from "./createPost";

const Posts = ({ username = "", liked = false }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [postLikeCounts, setPostLikeCounts] = useState({});
  const { userName } = useUser();
  const postRef = useRef(null);

  useEffect(() => {
    async function fetchPosts() {
      let response;
      if (username != "") {
        if (liked) {
          response = await axios.get(`${apiurl}/post/liked/${username}`);
        } else {
          response = await axios.get(`${apiurl}/post/creator/${username}`);
        }
      } else {
        response = await axios.get(`${apiurl}/post`);
      }

      const postsResponse = response.data;
      postsResponse.sort((a, b) => new Date(b.time) - new Date(a.time));
      setPosts(postsResponse);

      // Initialize hash map for like counts
      const likeCounts = {};
      postsResponse.forEach(post => {
        likeCounts[post.post_id] = post.likes;
      });
      setPostLikeCounts(likeCounts);

      if (!liked) {
        response = await axios.get(`${apiurl}/post/liked/${userName}`);
      }
      const postIds = response.data.map(post => post.post_id);
      setLikedPosts(new Set(postIds));
    }
    fetchPosts();
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

  const checkLiked = async (post_id) => {
    let res = likedPosts.has(post_id);
    return res;
  };


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

  return (
    <div className="max-w-6xl mx-auto">
      
      {(username !== userName) && <div className="bg-mydark border-b border-gold p-4 top-0 z-10">
        <h1 className="text-3xl text-center p-4 font-bold text-gold">Posts</h1>
      </div>}

      {(username == userName && <CreatePost /> )}
      
      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post) => (
          <div key={post.post_id} className="bg-mydark border-b border-gold p-2">
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
                  onClick={() => handleLike(post.post_id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${likedPosts.has(post.post_id)
                    ? "text-red-600 hover:bg-red-100"
                    : "like-button"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 ${likedPosts.has(post.post_id) ? "fill-current" : ""
                      }`}
                  />
                  <span className="font-medium">{postLikeCounts[post.post_id] || post.likes}</span>
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
        ))}
      </div>

      {/* Load More Button */}
      <div className="p-6 text-center">
        <button className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default Posts;