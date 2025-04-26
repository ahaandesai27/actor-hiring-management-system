import React, { useState
              ,  useEffect 
              } from "react";
import axios from 'axios';
import './styles.css'

const MainContents = ({username}) => {
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
        {activeTab === "filmography" && <Filmography username = {username}/>}
        {activeTab === "posts" && <Posts />}
        {activeTab === "likes" && <Likes />}
      </div>
    </div>
  );
};

// Filmography Component
const Filmography = ({ username }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Fetch the filmography data from the API
    axios.get(`http://localhost:5000/professional/${username}/films`)
      .then(response => {
        setFilms(response.data.Films);
      })
      .catch(error => {
        console.error("Error fetching the filmography data", error);
      });
  }, [username]);

  return (
    <div className="filmography-container">
      <h2>Filmography</h2>
      <div className="film-list">
      {films.map((film, index) => (
        <div key={index} className="film-box">
          <div className="film-box-header">
            <span className="film-number">{index + 1}</span>
            <span className="film-name">{film.title}</span>
          </div>
          
          <div className="film-content">
            <p className="genre">{film.genre}</p>
            
            <div className="film-details">
              <p className="release-date">
                <span className="detail-label">Release Date:</span>
                <span className="detail-value">{film.release_date}</span>
              </p>
              
              <p className="film-rating">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">
                  <span className="rating-value">{film.rating}</span>
                </span>
              </p>
              
              <p className="role-description">
                <span className="detail-label">Worked on:</span>
                <span className="detail-value">
                  {film.WorkedOn.start_date} to {film.WorkedOn.end_date ? film.WorkedOn.end_date : "Present"}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
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
