import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const Header = ({ username }) => {
    const [name, setName] = useState('Shah Rukh Khan');
    const [profession, setProfession] = useState('Actor');
    const [yoe, setYoe] = useState('25');
    const [rating, setRating] = useState(9.5);
    const [followers, setFollowers] = useState(10);
    const [following, setFollowing] = useState(15);
    const [workingAt, setWorkingAt] = useState("XYZ ORG");
    const [ownerOf, setOwnerOf] = useState("ABC ORG");
    const [imageUrl, setImageUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [about, setAbout] = useState("About me.");

    useEffect(() => {
        async function fetchProfessional() {
            try {
                const response = await axios.get(`http://localhost:5000/professional/${username}`);
                const professionalData = response.data;
                setName(professionalData.full_name);
                setProfession(professionalData.profession.charAt(0).toUpperCase() + professionalData.profession.slice(1));
                setYoe(professionalData.years_of_experience);
                setRating(professionalData.rating);
                setFollowers(professionalData.followerCount);
                setFollowing(professionalData.followingCount);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
        
        fetchProfessional();
    }, [username]);

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <div className="pfp" style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={imageUrl} alt='Profile Picture' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#333' }}>@{username}</div>
                    <div style={{ fontSize: '20px', color: '#555' }}>{name}</div>
                </div>
            </div>
            <div style={{ fontSize: '1.2rem', marginTop: '20px', color: '#666' }}>
                <div>{profession} | {yoe}+ Years of Experience | <b>{rating}/10</b></div>
                <div>Currently working at <b>{workingAt}</b></div>
                <div>Owner of <b>{ownerOf}</b></div>
            </div>
            <div style={{ fontSize: '1rem', marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '40px', color: '#777' }}>
                <u><b>{followers}</b> Followers</u>
                <u><b>{following}</b> Following</u>
            </div>
            {(profession === "Director" || profession === "Producer") && (
                <button
                    onClick={() => window.location.href = `http://localhost:5173/profile/${username}/roles`}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    View all Roles
                </button>
            )}
        </div>
    );
};

export default Header;
