import React, { useState
              ,  useEffect 
              } from "react";
import axios from 'axios';
import Filmography from "./Filmography";
import Posts from "./Posts";
import Likes from "./Likes";
import '../styles.css'

const MainContents = ({username}) => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="bg-gray text-white">
      <nav className="nav-bar">
        <button className={activeTab === "posts" ? "active" : ""} onClick={() => setActiveTab("posts")}>
          Posts
        </button>
        <button className={activeTab === "filmography" ? "active" : ""} onClick={() => setActiveTab("filmography")}>
          Filmography
        </button>
        <button className={activeTab === "likes" ? "active" : ""} onClick={() => setActiveTab("likes")}>
          Likes
        </button>
      </nav>

      {/* Content Section */}
      <div className="bg-gray">
        {activeTab === "filmography" && <Filmography username = {username}/>}
        {activeTab === "posts" && <Posts />}
        {activeTab === "likes" && <Likes />}
      </div>
    </div>
  );
};


export default MainContents;
