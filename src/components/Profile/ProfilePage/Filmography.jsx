import React, { useState
              ,  useEffect 
              } from "react";
import axios from "axios";
import './filmStyles.css';

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
      <div className="text-gold text-3xl py-8 text-center font-bold">Filmography</div>
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

export default Filmography;