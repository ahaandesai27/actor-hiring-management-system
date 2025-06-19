import {
  useState, useEffect, useRef, useCallback
} from "react";
import axios from "axios";
import apiurl from "../../apiurl";
import { useUser } from "../User/user";
import { Loader2 } from "lucide-react";
import "./style.css";

import CreatePost from "./createPost";
import PostItem from "./PostItem";

const Posts = ({ username = "", liked = false, recommended = false, pagination = true }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [postLikeCounts, setPostLikeCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { userName } = useUser();
  const observer = useRef();

  const POSTS_PER_PAGE = 8;

  // Ref for the last post element to observe - when we land on this element, the page will change and the fetch happens again
  // as dependecies change 
  const lastPostElementRef = pagination ? useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]) : null;      // disable pagniation whenever required by setting the ref to null

  const fetchPosts = async (pageNum = 1, append = false) => {
    if (loading) return;
    setLoading(true);

    try {
      let response;
      const offset = (pageNum - 1) * POSTS_PER_PAGE;

      if (recommended) {
        response = await axios.get(`${apiurl}/recommend/${userName}/recommended-posts`);
      } 
      else if (username !== "") {
        if (liked) {
          response = await axios.get(`${apiurl}/post/liked/${username}?limit=${POSTS_PER_PAGE}&skip=${offset}`);
        } else {
          response = await axios.get(`${apiurl}/post/creator/${username}?limit=${POSTS_PER_PAGE}&skip=${offset}`);
        }
      } else {
        response = await axios.get(`${apiurl}/post?limit=${POSTS_PER_PAGE}&offset=${offset}`);
      }

      const postsResponse = response.data;
      
      // Check if we got fewer posts than requested (indicates no more posts)
      if (postsResponse.length <= POSTS_PER_PAGE) {
        setHasMore(false);
      }

      if (append) {
        setPosts(prevPosts => [...prevPosts, ...postsResponse]);
      } else {
        setPosts(postsResponse);
      }

      // Update like counts for new posts
      const likeCounts = { ...postLikeCounts };
      postsResponse.forEach(post => {
        likeCounts[post.post_id] = post.likes;
      });
      setPostLikeCounts(likeCounts);

      // Fetch liked posts for the current user (only on initial load)
      if (pageNum === 1 && !liked) {
        const likedResponse = await axios.get(`${apiurl}/post/liked/${userName}`);
        const postIds = likedResponse.data.map(post => post.post_id);
        setLikedPosts(new Set(postIds));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset state when username or liked prop changes
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPosts(1, false);
  }, [username, liked]);

  useEffect(() => {
    // Load more posts when page changes (but not on initial load) - when page changes, more posts are fetched 
    if (page > 1) {
      fetchPosts(page, true);
    }
  }, [page]);

  const handleLikeToggle = (postId, newIsLiked) => {
    // Update UI immediately using hash maps for O(1) lookups and updates
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
      
      {(username !== userName && recommended == false) && <div className="bg-mydark border-b border-gold p-4 top-0 z-10">
        <h1 className="text-3xl text-center p-4 font-bold text-gold">Posts</h1>
      </div>}

      {(username === userName && <CreatePost />)}
      
      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post, index) => (
          <PostItem
            key={post.post_id}
            post={post}
            isLiked={likedPosts.has(post.post_id)}
            likeCount={postLikeCounts[post.post_id] || post.likes}
            currentUser={userName}
            onLikeToggle={handleLikeToggle}
            ref={index === posts.length - 1 ? lastPostElementRef : null}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="p-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
            <span className="text-white">Loading more posts...</span>
          </div>
        </div>
      )}

      {/* End of Posts Message */}
      {!hasMore && posts.length > 0 && (
        <div className="p-6 text-center">
          <p className="text-gray-500">You've reached the end of the posts!</p>
        </div>
      )}

      {/* No Posts Message */}
      {!loading && posts.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-gray-500">No posts found.</p>
        </div>
      )}
    </div>
  );
};

export default Posts;