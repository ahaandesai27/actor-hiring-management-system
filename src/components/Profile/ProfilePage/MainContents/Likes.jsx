// Likes Component
import React, { useState
              ,  useEffect 
              } from "react";
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

export default Likes;