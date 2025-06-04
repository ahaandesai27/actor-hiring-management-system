import { useState
       , useEffect  
       } from "react";
import { Camera, Save, X } from "lucide-react";
import axios from "axios";
import '../ProfilePage/styles.css';
import { useUser } from "../../User/user";
import apiurl from "../../../apiurl";

function EditProfile() {
  const {userName} = useUser();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [years_of_experience, setYoe] = useState("");
  const [rating, setRating] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchProfessional() {
      try {
        // fetch details from database 
        const response = await axios.get(`${apiurl}/professional/${userName}`);
        const professionalData = response.data;
        console.log(professionalData);
        setName(professionalData.full_name);
        setProfession(
          professionalData.profession.charAt(0).toUpperCase() +
            professionalData.profession.slice(1)
        );
        setYoe(professionalData.years_of_experience);
        setRating(professionalData.rating);
        if (professionalData.profile_picture) {
          setImagePreview(profile_picture);
        } else {
          setImagePreview("https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg");
        }
        
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }

    fetchProfessional();
  }, [userName]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "profile_picture");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
        formData
      );
      const data = response.data;
      console.log(data.secure_url);
      setImagePreview(data.secure_url);
      setSelectedFile(null);
      alert("Image uploaded!");
    } catch (error) {
      console.error(error);
      alert("Image upload failed!");
    }
  };

  const handleSave = async () => {
    try {
      const info = {
        full_name: name,
        profession,
        years_of_experience,
        rating,
        profile_picture: imagePreview
      }
      await axios.put(`${apiurl}/professional/${userName}`, {info});
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
            {/* Image Upload */}
            <div>
              <label className="edit-label">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="image-upload-btn">
                <Camera className="w-6 h-6" />
                Click to select new image
              </label>
              <button
                type="button"
                className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
                onClick={handleUploadClick}
                disabled={!selectedFile}
              >
                Upload
              </button>
            </div>
                        
            {/* Name */}
            <div>
              <label className="edit-label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="edit-input"
                placeholder="Enter full name"
              />
            </div>
            
            {/* Profession */}
            <div>
              <label className="edit-label">Profession</label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="edit-input"
                placeholder="Enter profession"
              />
            </div>
            
            {/* Years of Experience */}
            <div>
              <label className="edit-label">Years of Experience</label>
              <input
                type="number"
                value={years_of_experience}
                onChange={(e) => setYoe(e.target.value)}
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
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
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