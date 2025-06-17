import { useState } from "react";
import { Camera } from "lucide-react";
import axios from "axios";

function EditImage({ imageUrl, onImageUpdate }) {
    const [imagePreview, setImagePreview] = useState(imageUrl);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            onImageUpdate(URL.createObjectURL(file)); 
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
            setImagePreview(data.secure_url);
            // Call the parent component's function to update the profile data
            onImageUpdate(data.secure_url);
            setSelectedFile(null);
            alert("Image uploaded!");
        } catch (error) {
            console.error(error);
            alert("Image upload failed!");
        }
    };

    return (
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
    );
}

export default EditImage;