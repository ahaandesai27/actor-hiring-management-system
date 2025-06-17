import React from "react";
import { Camera } from "lucide-react";
import { useProfileImageUpload } from "./hooks/useProfileImageUpload";

const defaultProfilePic = "https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg";

function ProfileImageUploader({ profilePicture, setProfilePicture }) {
  const {
    selectedFile,
    uploadingPic,
    handleFileSelect,
    handleUploadClick
  } = useProfileImageUpload(setProfilePicture);

  return (
    <div className="flex flex-col items-center">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-2 border border-gray-400"
        onError={(e) => { e.target.src = defaultProfilePic; }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="image-upload-btn flex items-center gap-2 cursor-pointer text-white">
        <Camera className="w-5 h-5" />
        Select Image
      </label>
      <button
        type="button"
        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded mt-2"
        onClick={handleUploadClick}
        disabled={!selectedFile || uploadingPic}
      >
        {uploadingPic ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default ProfileImageUploader;