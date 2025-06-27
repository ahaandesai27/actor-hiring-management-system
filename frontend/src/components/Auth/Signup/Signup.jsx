import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiurl from "../../../apiurl";

import CredentialsForm from "./CredentialsForm";
import ResumeUploadForm from "./ResumeUploadForm";
import ProfileForm from "./ProfileForm";
import { set } from "firebase/database";

const defaultProfilePic = "https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg";

function SignIn() {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();

  // Stage 1: Auth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Stage 2: Resume/Paragraph
  const [resume, setResume] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // Stage 3: Profile Info
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("actor");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [rating, setRating] = useState(5.0);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);

  const handleStage1Next = () => {
    setStage(2);
  };

  const handleStage2Next = async (resumeText) => {
    console.log(resumeText);
    if (!resumeText) {
      setStage(3);
      return;
    }
    setLoadingAI(true);
    try {
      const response = await axios.post(`${apiurl}/ai/get-data`, { resume: resumeText });
      const data = response.data;
      console.log(data);
      setFullName(data.full_name || "");
      setProfession(data.profession || "actor");
      setYearsOfExperience(data.years_of_experience || 0);
      setRating(data.rating || 5.0);
      setStage(3);
    } catch (error) {
      alert("AI extraction failed. Please check your input.");
    }
    setLoadingAI(false);
  };

  const handleStage3Submit = async () => {
    try {
      await axios.post(`${apiurl}/professional/`, {
        username,
        password,
        full_name: fullName,
        profession,
        years_of_experience: yearsOfExperience,
        rating,
        profile_picture: profilePicture,
      });
      alert("Sign up successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Sign up failed. Please try again.");
    }
  };

  const renderCurrentStage = () => {
    switch (stage) {
      case 1:
        return (
          <CredentialsForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onNext={handleStage1Next}
          />
        );
      case 2:
        return (
          <ResumeUploadForm
            resume={resume}
            setResume={setResume}
            onNext={handleStage2Next}
            onBack={() => setStage(1)}
            loadingAI={loadingAI}
          />
        );
      case 3:
        return (
          <ProfileForm
            fullName={fullName}
            setFullName={setFullName}
            profession={profession}
            setProfession={setProfession}
            yearsOfExperience={yearsOfExperience}
            setYearsOfExperience={setYearsOfExperience}
            rating={rating}
            setRating={setRating}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            onSubmit={handleStage3Submit}
            onBack={() => setStage(2)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center pt-12">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="space-y-6 p-10 rounded-lg border border-gray-500 relative bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg">
          {renderCurrentStage()}
        </div>
      </div>
    </div>
  );
}

export default SignIn;