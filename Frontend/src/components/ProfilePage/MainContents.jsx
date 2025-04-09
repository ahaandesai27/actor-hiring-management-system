import React, { useState } from "react";

const MainContents = () => {
  const [activeTab, setActiveTab] = useState("filmography");

  return (
    <div className="main-container">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <button className={activeTab === "filmography" ? "active" : ""} onClick={() => setActiveTab("filmography")}>
          Filmography
        </button>
        <button className={activeTab === "posts" ? "active" : ""} onClick={() => setActiveTab("posts")}>
          Posts
        </button>
        <button className={activeTab === "likes" ? "active" : ""} onClick={() => setActiveTab("likes")}>
          Likes
        </button>
      </nav>

      {/* Content Section */}
      <div className="content-section">
        {activeTab === "filmography" && <Filmography />}
        {activeTab === "posts" && <Posts />}
        {activeTab === "likes" && <Likes />}
      </div>
    </div>
  );
};

// Filmography Component
const Filmography = () => {
  return (
    <div className="filmography-container">
      <h2>Filmography</h2>
      <div className="film-list">
        {/* Dummy data (Replace with DB data when available) */}
        <div className="film-box">
          <span className="film-number">1</span>
          <span className="film-name">Example Film</span>
          <p className="role-description">None</p>
          <span className="film-rating"></span>
        </div>
      </div>
    </div>
  );
};

// Posts Component
const Posts = () => {
  return (
    <div className="posts-container">
      <h2>Recent Post</h2>
      <div className="post-box">
        <p className="post-text">This is a sample post...</p>
        <img className="post-image" src="" alt="Post" />
      </div>
      <a href="/all-posts" className="view-all-posts">View All Posts</a>
    </div>
  );
};

// Likes Component
const Likes = () => {
  return (
    <div className="likes-container">
      <h2>Likes</h2>
      <p className="total-likes">Total Likes: </p>
      <div className="recent-likes">
        <p className="liked-by-others">Most recent message liked by others:</p>
        <p className="liked-by-user">Most recent message you liked:</p>
      </div>
    </div>
  );
};

export default MainContents;
