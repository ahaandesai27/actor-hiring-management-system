import React, { useState } from "react";
import { Camera } from "lucide-react";
import apiurl from "../../../apiurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';
pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

const defaultProfilePic = "https://i.pinimg.com/736x/62/01/0d/62010d848b790a2336d1542fcda51789.jpg";

function SignIn() {
  const [stage, setStage] = useState(1);

  // Stage 1: Auth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Stage 2: Resume/Paragraph
  const [resume, setResume] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Stage 3: Profile Info
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("actor");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [rating, setRating] = useState(5.0);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(false);

  const navigate = useNavigate();

  // Handle profile picture selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Upload to Cloudinary
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

  // Stage 1: Submit username/password
  const handleStage1 = (e) => {
    e.preventDefault();
    setStage(2);
  };

  // PDF extraction
  const handlePdfSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfLoading(true);
      setPdfFile(file);
      try {
        const reader = new FileReader();
        reader.onload = async function () {
          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          setResume(text);
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        alert("Failed to read PDF.");
      }
      setPdfLoading(false);
    } else {
      alert("Please select a PDF file.");
    }
  };

  // Stage 2: Submit resume/paragraph to AI
  const handleStage2 = async (e) => {
    e.preventDefault();
    setLoadingAI(true);
    try {
      const response = await axios.post(`${apiurl}/ai/get-data`, { resume: resume });
      // Assume response.data contains: { full_name, profession, years_of_experience, rating }
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

  // Stage 3: Final submit
  const handleStage3 = async (e) => {
    e.preventDefault();
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center pt-12">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form
          className="space-y-6 p-10 rounded-lg border border-gray-500 relative bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg"
          onSubmit={stage === 1 ? handleStage1 : stage === 2 ? handleStage2 : handleStage3}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#ffbf00]">
              {stage === 1 && "Sign Up"}
              {stage === 2 && "Upload Resume or Write Bio"}
              {stage === 3 && "Review & Complete Profile"}
            </h1>
          </div>

          {stage === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">Username</label>
                <input
                  type="text"
                  required
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffbf00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
              <div className="text-md text-center">
                <span className="text-white font-semibold">Already have an account? </span>
                <a href="/login" className="font-semibold text-red-600 hover:text-[#ffbf00]">Log in</a>
              </div>
            </>
          )}

          {stage === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">
                  Upload your resume (PDF) or write a short paragraph about yourself
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfSelect}
                  className="block w-full text-white mt-2"
                />
                <div className="my-2 text-gray-400 text-xs">or</div>
                <textarea
                  rows={6}
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Paste your resume or write about your experience..."
                  required={!pdfFile}
                />
              </div>
              <button
                type="submit"
                disabled={loadingAI || pdfLoading || !resume}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffbf00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loadingAI || pdfLoading ? "Processing..." : "Next"}
              </button>
              <button
                type="button"
                className="w-full mt-2 text-sm text-gray-400 hover:text-red-400"
                onClick={() => setStage(1)}
              >
                Back
              </button>
            </>
          )}

          {stage === 3 && (
            <>
              {/* Profile Picture */}
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
              {/* Full Name */}
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
              {/* Profession */}
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
              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-medium leading-6 text-white">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="edit-input block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Years of experience"
                />
              </div>
              {/* Rating */}
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
                onClick={() => setStage(2)}
              >
                Back
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;