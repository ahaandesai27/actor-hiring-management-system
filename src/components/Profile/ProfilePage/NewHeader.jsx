import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const Header = ({ username }) => {
  const [name, setName] = useState("Shah Rukh Khan");
  const [profession, setProfession] = useState("Actor");
  const [yoe, setYoe] = useState("25");
  const [rating, setRating] = useState(9.5);
  const [followers, setFollowers] = useState(10);
  const [following, setFollowing] = useState(15);
  const [workingAt, setWorkingAt] = useState("XYZ ORG");
  const [ownerOf, setOwnerOf] = useState("ABC ORG");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [about, setAbout] = useState("About me.");

  useEffect(() => {
    async function fetchProfessional() {
      try {
        const response = await axios.get(
          `http://localhost:5000/professional/${username}`
        );
        const professionalData = response.data;
        setName(professionalData.full_name);
        setProfession(
          professionalData.profession.charAt(0).toUpperCase() +
            professionalData.profession.slice(1)
        );
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
    <div className="bg-gray text-white px-10 py-10">
      {/* image and username */}
      <div className="flex flex-row my-10 gap-6">
        <div className="pfp">
          <img src={imageUrl} alt="Profile Picture"/>
        </div>
        <div className="my-7 flex flex-row items-center">
            <div className="basis-64">
              <div className="text-3xl">@{username}</div>
              <div className="flex space-x-6 mt-4">
                <div className="foll-btn">{following} Following</div>
                <div className="foll-btn">{followers} Followers</div>
              </div>
            </div>
            <div
                className="font-bold text-2xl basis-128 ml-20 italic border-2 border-yellow-600 rounded-md px-4 py-1 text-gold"
            >
                {rating}/10
            </div>
        </div>
      </div>

      <div>
        <div className="text-3xl text-red-600">{name}</div>   
        <div className="text-xl text-gold">
          {profession} | {yoe}+ Years of Experience
        </div>
        <div className="text-xl">
          Currently working at <span className="font-bold text-red-600">{workingAt}</span>
        </div>
        <div className="text-xl">
          Owner of <span className="font-bold text-red-600">{ownerOf}</span>
        </div>
      </div>
      {(profession === "Director" || profession === "Producer") && (
        <button
          onClick={() =>
            (window.location.href = `http://localhost:5173/profile/${username}/roles`)
          }
        >
          View all Roles
        </button>
      )}
    </div>
  );
};

export default Header;
