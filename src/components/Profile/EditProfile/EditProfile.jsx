import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import axios from "axios";
import '../ProfilePage/styles.css';
import { useUser } from "../../User/user";
import apiurl from "../../../apiurl";
import EditImage from "./EditImage";

function EditProfile() {
  const { userName } = useUser();
  
  // Single profile object to manage all data
  const [profileData, setProfileData] = useState({
    full_name: "",
    profession: "",
    years_of_experience: "",
    rating: "",
    profile_picture: ""
  });

  const [imagePreview, setImagePreview] = useState("https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg");

  useEffect(() => {
    async function fetchProfessional() {
      try {
        // fetch details from database 
        const response = await axios.get(`${apiurl}/professional/${userName}`);
        const professionalData = response.data;

        // Set the entire profile object at once
        setProfileData({
          full_name: professionalData.full_name,
          profession: professionalData.profession.charAt(0).toUpperCase() + professionalData.profession.slice(1),
          years_of_experience: professionalData.years_of_experience,
          rating: professionalData.rating,
          profile_picture: professionalData.profile_picture || ""
        });
        
        if (professionalData.profile_picture) {
          setImagePreview(professionalData.profile_picture);
        }
        
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }

    fetchProfessional();
  }, [userName]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle image update from EditImage component
  const handleImageUpdate = (newImageUrl) => {
    setImagePreview(newImageUrl);
    handleInputChange('profile_picture', newImageUrl);
  };

  const handleSave = async () => {
    try {
      // Send the entire profile object
      await axios.put(`${apiurl}/professional/${userName}`, { info: profileData });
      alert("Profile saved successfully!");
    } catch (error) {
      alert("Failed to save profile!");
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="bg-gray text-white min-h-screen">
        {/* Header Section */}
        <div className="px-10 py-10">
          <h2 className="text-3xl font-bold text-center mb-8" style={{color: 'red'}}>
            Edit Profile
          </h2>
          
          <div className="flex flex-row my-10 gap-6 justify-center items-center">
            {/* Profile Picture Section */}
            <div className="pfp relative">
              <img 
                src={imagePreview} 
                alt="Profile"
                onError={(e) => {
                  e.target.src = "https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg";
                }}
              />
            </div>
            
            {/* Profile Info Preview */}
            <div className="my-7 flex flex-row items-center">
              <div className="basis-64">
                <div className="text-3xl">@{userName}</div>
              </div>
            </div>
          </div>
          
          {/* Edit Form */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Image Upload Component */}
            <EditImage 
              imageUrl={imagePreview} 
              onImageUpdate={handleImageUpdate}
            />
                        
            {/* Name */}
            <div>
              <label className="edit-label">Full Name</label>
              <input
                type="text"
                value={profileData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="edit-input"
                placeholder="Enter full name"
              />
            </div>
            
            {/* Profession */}
            <div>
              <label className="edit-label">Profession</label>
              <input
                type="text"
                value={profileData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
                className="edit-input"
                placeholder="Enter profession"
              />
            </div>
            
            {/* Years of Experience */}
            <div>
              <label className="edit-label">Years of Experience</label>
              <input
                type="number"
                value={profileData.years_of_experience}
                onChange={(e) => handleInputChange('years_of_experience', e.target.value)}
                className="edit-input"
                placeholder="Years of experience"
                min="0"
                max="50"
              />
            </div>
            
            {/* Rating */}
            <div>
              <label className="edit-label">Rating (out of 10)</label>
              <input
                type="number"
                value={profileData.rating}
                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                className="edit-input"
                placeholder="Rating"
                min="0"
                max="10"
                step="0.1"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-8">
              <button onClick={handleSave} className="save-btn">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;