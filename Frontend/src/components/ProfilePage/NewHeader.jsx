import { useState } from "react"
import './NewHeaderStyles.css';


const Header = () => {
    
    const [username, setUsername] = useState('iamsrk');
    const [name, setName] = useState('Shah Rukh Khan');
    const [profession, setProfession] = useState('Actor');
    const [yoe, setYoe] = useState('25');
    const [rating, setRating] = useState(9.5);
    const [followers, setFollowers] = useState(10);
    const [following, setFollowing] = useState(15);
    const [workingAt, setWorkingAt] = useState("XYZ ORG");
    const [ownerOf, setOwnerOf] = useState("ABC ORG");
    const [imageUrl, setImageUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    const [about, setAbout] = useState("I am SRK.")


    return <div style={{marginLeft: '8rem'}}>
        <div style={{display: 'flex'}}>
            <div className="pfp">
                <img src={imageUrl} alt='Profile Picture' />
            </div>
            <div>
                <div style={{fontSize: '30px'}}>@{username}</div><br />
                <div>{name}</div>
            </div>
        </div>
        <div style={{fontSize: '1.2rem', marginTop: '1rem'}}>
            <div>{profession} | {yoe}+ Years of Experience | <b>{rating}/10</b></div> 
            <div> Currently working at <b>{workingAt}</b></div> 
            <div> Owner of <b>{ownerOf}</b> </div> 
        </div>

        <div style={{ fontSize: '1rem', marginTop: '1rem', display: 'flex', gap: '2rem' }}>
            <u><b>{followers}</b> Followers</u>
            <u><b>{following}</b> Following</u>
        </div>

        {/* Please add the about me section, use textarea or something */}
    </div>

               }


export default Header;