import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import apiurl from '../../../../apiurl';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import './postStyles.css'
import { useUser } from '../../../User/user';

const Posts = ({username}) => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const { userName } = useUser();
    const postRef = useRef();

    useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get(`${apiurl}/post/creator/${username}`);
            const postsResponse = response.data;
            postsResponse.sort((a, b) => new Date(b.time) - new Date(a.time));
            setPosts(response.data);
        }
        fetchPosts();
    }, [])

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

      if (diffInMinutes < 1) return 'just now';
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInDays < 7) return `${diffInDays}d ago`;
      if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
      if (diffInMonths < 12) return `${diffInMonths}mo ago`;
      return `${diffInYears}y ago`;
    };

    const handlePost = async () => {
      // api request 
      await axios.post(`${apiurl}/post`, 
        {
          "contents": postRef.current.value,
          "creator": userName
        }
      )

      alert("Posted successfully!");
      window.location.reload();

    }

    const handleLike = () => {
      // post request
    }

    const formatNumber = () => {
      // number of likes
    }

    return (
    <div className="max-w-6xl mx-auto">
      {(username == userName && 
      <div>
        <div className='text-3xl text-center font-bold mt-2'>Create Post</div>
        <textarea ref={postRef} className='bg-mydark p-5 w-full rounded-md mt-4 border border-gold focus:outline-none focus:ring-0 focus:border-transparent' placeholder="What's Happening?"></textarea>
        <div className='flex justify-center items-center'>
          <button className='p-2 rounded-md bg-green-500 text-black font-bold w-32 mt-3 hover:bg-green-700' onClick={handlePost}>Submit</button>
        </div>
      </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-0">
        {posts.map((post) => (
          <div key={post.post_id} className="bg-gray border-b border-gold p-2">
            {/* Post Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {post.creator.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gold">@{post.creator}</p>
                    <p className="text-sm text-gray-500">{formatTimeAgo(post.time)}</p>
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                    likedPosts.has(post.post_id)
                      ? 'text-red-600 bg-red-50 hover:bg-red-100'
                      : 'like-button'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${likedPosts.has(post.post_id) ? 'fill-current' : ''}`} 
                  />
                  <span className="font-medium">{formatNumber(post.likes)}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full reply-button">
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
}

export default Posts;