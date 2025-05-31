import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiurl from "../../../apiurl";
import Filmography from "./Filmography";
import Posts from "../../Posts/index";
import Roles from "../../Roles/RolePage/RolePage";
import { useUser } from "../../User/user";
import Follows from "./Follows"; // import your Follows component
import "./styles.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with inline rgba for semi-transparent black */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.50)" }}
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative w-80 bg-white rounded-xl shadow-lg p-6 max-h-[70vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
          aria-label="Close modal"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};


const ProfilePage = () => {
  const username = useParams().username || useUser().userName;
  const accountUser = useUser().userName;

  const [activeTab, setActiveTab] = useState("posts");
  const [name, setName] = useState("Shah Rukh Khan");
  const [profession, setProfession] = useState("Actor");
  const [yoe, setYoe] = useState("25");
  const [rating, setRating] = useState(9.5);
  const [followers, setFollowers] = useState(10);
  const [following, setFollowing] = useState(15);
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [about, setAbout] = useState("About me.");
  const [isFollowing, setIsFollowing] = useState(false);

  // NEW: Modal state
  const [showModal, setShowModal] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(true);

  useEffect(() => {
    async function fetchProfessional() {
      try {
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

        if (accountUser != username) {
          let followResponse = await axios.get(
            `${apiurl}/connections/follows?professional1=${accountUser}&professional2=${username}`
          );
          setIsFollowing(followResponse.data.isFollowing);
        }
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
    <div className="bg-gray text-white">
      {/* Header Section */}
      <div className="px-10 py-10">
        <div className="flex flex-row my-10 gap-6">
          <div className="pfp">
            <img src={imageUrl} alt="Profile Picture" />
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
          {accountUser != username && (
            <div className="flex space-x-6 mt-4">
              <button className="msg-btn" onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
              <button className="msg-btn">Message</button>
            </div>
          )}
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
      </nav>

      {/* Content Section */}
      <div className="bg-gray">
        {activeTab === "filmography" && <Filmography username={username} />}
        {activeTab === "posts" && <Posts username={username} />}
        {activeTab === "likes" && <Posts username={username} liked={true} />}
        {activeTab === "roles" && <Roles username={username} />}
      </div>

      {/* Modal for Followers / Following List */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Follows username={username} following={showFollowingList} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
