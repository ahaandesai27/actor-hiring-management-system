import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useUser} from '../../User/user';
import apiurl from '../../../apiurl';

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';

  const date = new Date(dateStr);
  if (isNaN(date)) return 'N/A';

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // function to get ordinal suffix for the day
  function getOrdinal(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
}

function capitalizeFirst(str) {
  if (!str) return 'N/A';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ApplyRolePage() {
  const { userName } = useUser();
  const { roleId } = useParams();
  const [role, setRole] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [paragraph, setParagraph] = useState('');

  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch(`http://localhost:5000/roles/${roleId}`);
        if (!res.ok) throw new Error('Failed to fetch role');
        const data = await res.json();
        setRole(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchRole();
  }, [roleId]);

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handleVideoUpload = async () => {
    if (!selectedVideo) {
      alert("Please select a video first.");
      return;
    }
    
    setUploadingVideo(true);
    const formData = new FormData();
    formData.append("video", selectedVideo);
    
    try {
      const response = await axios.post('http://localhost:8000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setVideoUrl(response.data.video_url);
      alert("Video uploaded successfully!");
    } catch (error) {
      alert("Video upload failed!");
    }
    setUploadingVideo(false);
  };

  const handleApply = async () => {
    // Safeguards
    if (!paragraph.trim()) {
      alert("Please write a paragraph about why you're interested in this role.");
      return;
    }

    if (selectedVideo && !videoUrl) {
      alert("Please upload your selected video before applying.");
      return;
    }

    try {
      const object = {
        username: userName,
        role_id: roleId,  
        audition_url: videoUrl || null,
        paragraph: paragraph || null,
      }
      console.log("Applying with data:", object);
      const response = await axios.post(`${apiurl}/professional/apply`, object);
      alert(response.data.message);
    } catch (e) {
      // axios throws error for non 2xx responses
      console.log(e);
      if (e.response) {
        if (e.response.status === 403) {
          alert("Cannot apply for this role as profile does not match!");
        } else if (e.response.status === 404) {
          alert("Professional or role not found.");
        } else {
          alert(e.response.data.message || "Error in applying for role!");
        }
      } else {
        alert("Network or server error!");
      }
    }
  };

  if (!role)
    return (
      <main className="min-h-screen w-full flex bg-black text-white p-10 text-xl font-semibold">
        Loading role data...
      </main>
    );

  return (
    <main className="min-h-screen w-full bg-black text-white p-10 flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 tracking-wide">
        Role Details
      </h1>

      <section className="pr-6 space-y-8 mb-8">
        <div>
          <div className="text-2xl font-bold text-yellow-300 mb-2">Information</div>
          <p className="text-red-400 text-lg">{role.information || 'N/A'}</p>
        </div>

        <div className="flex flex-wrap gap-6">
          {[
            { label: "Role For", value: capitalizeFirst(role.role_for) },
            { label: "Start Date", value: formatDate(role.start_date) },
            { label: "End Date", value: formatDate(role.end_date) },
            { label: "Pay", value: role.pay !== null ? role.pay : "N/A" },
            { label: "Creator", value: role.creator || "N/A" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="border-2 border-red-600 rounded-lg p-4 min-w-[140px] flex flex-col"
            >
              <div className="text-xl font-bold text-yellow-300 mb-1">{label}</div>
              <p className="text-red-400 text-lg">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Paragraph Section */}
      <section className="mb-8">
        <div className="text-2xl font-bold text-yellow-300 mb-4">
          Application Paragraph <span className="text-red-400">*</span>
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="Write a brief paragraph about why you're interested in this role and what makes you a good fit... (Required)"
            className={`w-full h-32 p-4 bg-mydark border-2 rounded-lg text-white placeholder-gray-400 resize-vertical focus:outline-none transition-colors ${
              paragraph.trim() ? 'border-red-600 focus:border-yellow-400' : 'border-red-500 focus:border-red-400'
            }`}
            maxLength={1000}
            required
          />
          <div className="text-gray-400 text-sm">
            {paragraph.length}/1000 characters {!paragraph.trim() && <span className="text-red-400">(Required)</span>}
          </div>
        </div>
      </section>

      {/* Video Upload Section */}
      <section className="mb-8">
        <div className="text-2xl font-bold text-yellow-300 mb-4">Upload Audition Video</div>
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
            className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
          />
          {selectedVideo && !videoUrl && (
            <div className="text-yellow-400 text-lg">
              ⚠️ Video selected but not uploaded. Please upload before applying.
            </div>
          )}
          {selectedVideo && (
            <button
              onClick={handleVideoUpload}
              disabled={uploadingVideo}
              className="self-start bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 px-6 text-white text-lg font-semibold disabled:opacity-50"
            >
              {uploadingVideo ? "Uploading..." : "Upload Video"}
            </button>
          )}
          {videoUrl && (
            <>
              <p className="text-green-400 text-lg">✓ Video uploaded successfully!</p>
              <video 
                controls 
                className="w-full max-w-md border-2 border-yellow-400 rounded-lg"
                src={videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </>
          )}
          {selectedVideo && !videoUrl && (
            <div className="text-yellow-400 text-lg">
              Preview (upload to save):
              <video 
                controls 
                className="w-full max-w-md border-2 border-gray-400 rounded-lg mt-2"
                src={URL.createObjectURL(selectedVideo)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </section>

      <button
        onClick={handleApply}
        className={`self-start transition-colors rounded-lg py-4 px-10 text-white text-3xl font-bold ${
          paragraph.trim() && (!selectedVideo || videoUrl) 
            ? 'bg-red-700 hover:bg-red-800' 
            : 'bg-gray-600 cursor-not-allowed opacity-75'
        }`}
        disabled={!paragraph.trim() || (selectedVideo && !videoUrl)}
      >
        Apply
      </button>
    </main>
  );
}
