import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiurl from "../../../apiurl";
import Filmography from "./Filmography";
import Posts from "../../Posts/index";
import Roles from "../../Roles/RolePage/RolePage";
import { useUser } from "../../User/user";
import Follows from "./Follows/Follows"; 
import Modal from "./Follows/Modal";
import AppliedRoles from './AppliedRoles';
import addToChat from "./addToChat";
import "./styles.css";


const ProfilePage = () => {
  const username = useParams().username || useUser().userName;
  const accountUser = useUser().userName;
  const navigate = useNavigate();

  function addChatAndNavigate(accountUser, username) {
    addToChat(accountUser, username);
    navigate('/chat');
  }

  // Active tab for navbar
  const [activeTab, setActiveTab] = useState("posts");

  // Profile data
  const [name, setName] = useState("Shah Rukh Khan");
  const [profession, setProfession] = useState("Actor");
  const [yoe, setYoe] = useState("25");
  const [rating, setRating] = useState(9.5);
  const [followers, setFollowers] = useState(10);
  const [following, setFollowing] = useState(15);
  const [isFollowing, setIsFollowing] = useState(false);

  // Profile picture
  const [imageUrl, setImageUrl] = useState("https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(true);

  useEffect(() => {
    async function fetchProfessional() {
      try {
        // fetch details from database 
        const response = await axios.get(`${apiurl}/professional/${username}`);
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
        if (professionalData.profile_picture) {
          setImageUrl(professionalData.profile_picture);
        }

        if (accountUser != username) {
          let followResponse = await axios.get(
            `${apiurl}/connections/follows?professional1=${accountUser}&professional2=${username}`
          );
          setIsFollowing(followResponse.data.isFollowing);
        }

        // fetch profile picture
        
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }

    fetchProfessional();
  }, [username]);

  async function handleFollow() {
    try {
      if (isFollowing === false) {
        await axios.post(`${apiurl}/connections/follow`, {
          professional1: accountUser,
          professional2: username,
        });

        alert("Followed successfully!");
        setIsFollowing(true);
      } else {
        await axios.delete(`${apiurl}/connections/unfollow`, {
          data: {
            professional1: accountUser,
            professional2: username,
          },
        });

        alert("Unfollowed successfully!");
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Follow/unfollow request failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  }

  // New handler for edit profile navigation
  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  // New handlers to open modal with followers or following
  const openFollowers = () => {
    setShowFollowingList(false);
    setShowModal(true);
  };

  const openFollowing = () => {
    setShowFollowingList(true);
    setShowModal(true);
  };

  return (
    <div className="bg-mydark text-white">
      {/* Header Section */}
      <div className="px-10 py-10">
        <div className="flex flex-row my-10 gap-6">
          <div className="pfp">
            <img src={imageUrl} />
          </div>
          <div className="my-7 flex flex-row items-center">
            <div className="basis-64">
              <div className="text-3xl">@{username}</div>
              <div>
                <div className="flex space-x-6 mt-4">
                  {/* Add cursor pointer and onClick to open modals */}
                  <div
                    className="foll-btn cursor-pointer hover:underline"
                    onClick={openFollowing}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") openFollowing();
                    }}
                  >
                    {following} Following
                  </div>
                  <div
                    className="foll-btn cursor-pointer hover:underline"
                    onClick={openFollowers}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") openFollowers();
                    }}
                  >
                    {followers} Followers
                  </div>
                </div>
              </div>
            </div>
            <div className="font-bold text-2xl basis-128 ml-20 italic border-2 border-yellow-600 rounded-md px-4 py-1 text-gold">
              {rating}/10
            </div>
          </div>
        </div>

        <div>
          <div className="text-3xl text-red-600">{name}</div>
          <div className="text-xl text-gold">
            {profession} | {yoe}+ Years of Experience
          </div>
          <div className="flex space-x-6 mt-4">
            {accountUser != username ? (
              <>
                <button className="msg-btn" onClick={handleFollow}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button className="msg-btn" onClick={() => addChatAndNavigate(accountUser, username)}>Message</button>
              </>
            ) : (
              <button 
                className="bg-gold hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="nav-bar">
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
        <button
          className={activeTab === "filmography" ? "active" : ""}
          onClick={() => setActiveTab("filmography")}
        >
          Filmography
        </button>
        <button
          className={activeTab === "likes" ? "active" : ""}
          onClick={() => setActiveTab("likes")}
        >
          Likes
        </button>
        {(profession === "Director" || profession == "Producer") && (
          <button
            className={activeTab === "roles" ? "active" : ""}
            onClick={() => setActiveTab("roles")}
          >
            Roles
          </button>
        )}
        {(profession === "Actor") && (
          <button
            className={activeTab === "applications" ? "active" : ""}
            onClick={() => setActiveTab("applications")}
          >
            Roles
          </button>
        )}
      </nav>

      {/* Content Section */}
      <div className="bg-mydark">
        {activeTab === "filmography" && <Filmography username={username} />}
        {activeTab === "posts" && <Posts username={username} />}
        {activeTab === "likes" && <Posts username={username} liked={true} />}
        {activeTab === "roles" && <Roles username={username} />}
        {activeTab === "applications" && <AppliedRoles username={username} />}
      </div>

      {/* Modal for Followers / Following List */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Follows username={username} following={showFollowingList} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
