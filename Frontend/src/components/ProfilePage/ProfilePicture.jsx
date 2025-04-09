import { useState } from "react";
// the usestate is used to create hooks for consistent rendering
// [state, stateFunc] = useState(initialState) is the general initialization
// format for the useState

function ProfilePicture() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a temporary URL
      setImage(imageURL);
    }
  };
  // the above is an event handler that will change the state
  // whenever it is called, in this case, whenever the onChange
  // event is triggered, which is when a file is inputted (the image)
  // this is why this handler has the (event) tag before its definition

  return (
    <div className="profile-container">
        <label htmlFor="fileInput" className="profile-label">
            <img
            src={image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-image"
            />
        </label>
      
      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
  // the input is an element that is required to make sure
  // that the image will be taken whenever the event occurs
}

export default ProfilePicture;
