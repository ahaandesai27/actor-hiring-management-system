import { useState } from "react";
import axios from "axios";

export function useProfileImageUpload(setProfilePicture) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }
    setUploadingPic(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "profile_picture");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
        formData
      );
      setProfilePicture(response.data.secure_url);
      setSelectedFile(null);
      alert("Image uploaded!");
    } catch (error) {
      alert("Image upload failed!");
    }
    setUploadingPic(false);
  };

  return {
    selectedFile,
    uploadingPic,
    handleFileSelect,
    handleUploadClick
  };
}
