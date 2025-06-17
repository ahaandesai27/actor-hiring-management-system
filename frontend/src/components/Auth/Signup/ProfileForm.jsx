import ProfileImageUploader from "./ProfileImageUploader";

function ProfileForm({
  fullName, setFullName,
  profession, setProfession,
  yearsOfExperience, setYearsOfExperience,
  rating, setRating,
  profilePicture, setProfilePicture,
  onSubmit, onBack
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#ffbf00]">
          Review & Complete Profile
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileImageUploader 
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
        />
        
        <div>
          <label className="block text-sm font-medium leading-6 text-white">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="edit-input block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Full Name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium leading-6 text-white">Profession</label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="edit-input block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="actor">Actor</option>
            <option value="director">Director</option>
            <option value="producer">Producer</option>
            <option value="support">Support</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium leading-6 text-white">Years of Experience</label>
          <input
            type="number"
            min="0"
            max="50"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="edit-input block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus-ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Years of experience"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium leading-6 text-white">Rating (out of 10)</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="edit-input block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Rating"
          />
        </div>
        
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffbf00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Complete Sign Up
        </button>
        <button
          type="button"
          className="w-full mt-2 text-sm text-gray-400 hover:text-red-400"
          onClick={onBack}
        >
          Back
        </button>
      </form>
    </>
  );
}

export default ProfileForm;
