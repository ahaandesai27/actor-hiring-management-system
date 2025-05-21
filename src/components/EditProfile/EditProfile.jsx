import { useState } from "react";
// the usestate is used to create hooks for consistent rendering
// [state, stateFunc] = useState(initialState) is the general initialization
// format for the useState

function EditableProfile({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);

  const toggleEditing = () => setIsEditing(!isEditing);
  // clicking the edit button once will set this to true
  // clicking it again will set it to false

  return (
    <section className="profile-container">
        <h2>Profile</h2>
        <figure className="profile-figure">
            <img
            src={profile.image}
            alt={profile.name}
            className="profile-image"
            />
            <figcaption className="profile-figcaption">{name}</figcaption>
        </figure>

        {isEditing ? (
            <>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Edit Name"
                className="profile-input"
            />
            <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Edit Handle"
                className="profile-input"
            />
            <button onClick={toggleEditing} className="profile-button">
                Save
            </button>
            </>
        ) : (
            <>
            <p>
                <strong>Handle:</strong> {handle}
            </p>
            <button onClick={toggleEditing} className="profile-button">
                Edit Profile
            </button>
            </>
        )}
    </section>

  );
}

// Sample profile data
const profileData = {
  name: "John Doe",
  handle: "@johndoe",
  image: "https://via.placeholder.com/100"
};

export default function App() {
  return <EditableProfile profile={profileData} />;
}
