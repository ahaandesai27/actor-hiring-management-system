import React, { useState } from "react";
import "./App.css";

const SubContent = () => {
    const [profession, setProfession] = useState("Actor");
    const [experience, setExperience] = useState(0);
    const [rating, setRating] = useState(5.0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [currentFilm, setCurrentFilm] = useState("None");
    const [organization, setOrganization] = useState("None");
    // these are the states for this case, info will be taken from the
    // DB when implemented later on

  return (
    <>
        <div className="subcontent-container">
            <div className="subcontent-row">
                <label>Profession:</label>
                <select value={profession} onChange={(e) => setProfession(e.target.value)}>
                    <option value="Actor">Actor</option>
                    <option value="Director">Director</option>
                    <option value="Producer">Producer</option>
                </select>
                {/*this region also needs to be changed, since it 
                    will interact with the DB before getting the info
                    for now I am keeping it like so */}
            </div>
            
            <div className="subcontent-row">
                <label>Years of Experience:</label>
                <input 
                type="number" 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)}
                />
                {/*same as above */}
            </div>
            
            <div className="subcontent-row">
                <label>Rating (out of 10):</label>
                <input 
                type="number" 
                value={rating} 
                step="0.1"
                max="10"
                onChange={(e) => setRating(e.target.value)}
                />
            </div>
            
            <div className="subcontent-row">
                <label>Followers:</label>
                <input 
                type="number" 
                value={followers} 
                onChange={(e) => setFollowers(e.target.value)}
                />
            </div>
            
            <div className="subcontent-row">
                <label>Following:</label>
                <input 
                type="number" 
                value={following} 
                onChange={(e) => setFollowing(e.target.value)}
                />
            </div>
            
            <div className="subcontent-row">
                <label>Currently working on:</label>
                <input 
                type="text" 
                value={currentFilm} 
                onChange={(e) => setCurrentFilm(e.target.value)}
                />
            </div>
            
            <div className="subcontent-row">
                <label>Owner of Organization:</label>
                <input 
                type="text" 
                value={organization} 
                onChange={(e) => setOrganization(e.target.value)}
                />
            </div>
        </div>
    </>
  );
};

export default SubContent;
