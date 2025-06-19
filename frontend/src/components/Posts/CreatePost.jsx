import { useRef, useState } from "react";
import axios from "axios";
import apiurl from "../../apiurl";
import { useUser } from "../User/user";

const CreatePost = () => {
  const { userName } = useUser();
  const postRef = useRef(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const handlePost = async () => {
    if (!postRef.current.value.trim()) {
      alert("Please enter some text to post.");
      return;
    }
    setLoadingPost(true);
    try {
      await axios.post(`${apiurl}/post`, {
        contents: postRef.current.value,
        creator: userName,
      });
      alert("Posted successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error posting. Please try again.");
    } finally {
      setLoadingPost(false);
    }
  };

  const generateWithAI = async () => {
    if (postRef.current.value.trim() === "") {
        alert("Please enter some text before generating with AI.");
        return;
    }

    setLoadingAI(true);
    try {
        const response = await axios.post(`${apiurl}/ai/enhance-post`, {
        paragraph: postRef.current.value,
        });

        let enhancedPost = response.data.enhancedPost.trim();

        // Remove starting and ending double quotes if present
        if (enhancedPost.startsWith('"') && enhancedPost.endsWith('"')) {
        enhancedPost = enhancedPost.slice(1, -1);
        }

        postRef.current.value = enhancedPost;
    } catch (error) {
        alert("AI enhancement failed. Please try again.");
    } finally {
        setLoadingAI(false);
    }
    };


  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <div className="text-3xl text-center font-bold text-gold mt-2">
          Create Post
        </div>
        <textarea
          ref={postRef}
          className="bg-mydark p-5 w-full rounded-md text-white mt-4 border border-gold focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="What's Happening?"
          disabled={loadingAI || loadingPost}
        ></textarea>
        <div className="flex justify-between mt-3 space-x-4 max-w-md">
          <button
            className={`flex-1 p-2 rounded-md font-bold text-black ${
              loadingPost
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            }`}
            onClick={handlePost}
            disabled={loadingPost || loadingAI}
          >
            {loadingPost ? "Posting..." : "Submit"}
          </button>
          <button
            className={`flex-1 p-2 rounded-md font-bold text-black ${
              loadingAI || loadingPost
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-700"
            }`}
            onClick={() => {
              postRef.current.value = "";
            }}
            disabled={loadingAI || loadingPost}
          >
            Clear
          </button>
          <button
            className={`flex-[1.5] p-2 rounded-md font-bold text-black ${
              loadingAI
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            onClick={generateWithAI}
            disabled={loadingAI || loadingPost}
          >
            {loadingAI ? "Enhancing..." : "✨ Enhance with AI"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
