import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackNavbar from "../../Back";
import axios from "axios";
import apiurl from "../../../apiurl";

function ViewRoleApplicants() {
  const { role_id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [roleFor, setRoleFor] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await axios.get(
          `http://localhost:5000/roles/${role_id}/applicants`
        );
        const data = res.data;

        if (data.length > 0) {
          setRoleFor(data[0].role_for);
          setApplicants(data[0].Professionals);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchApplicants();
  }, [role_id]);

  const openVideoModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setShowVideoModal(true);
    setAiAnalysis(null);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideo(null);
    setAiAnalysis(null);
    setLoadingAnalysis(false);
  };

  const getAiAnalysis = async () => {
    if (!currentVideo) return;

    setLoadingAnalysis(true);
    try {
      const response = await axios.post("http://localhost:8000/analyze", {
        url: currentVideo,
      });
      setAiAnalysis(response.data.analysis);
    } catch (error) {
      console.error("AI Analysis failed:", error);
      setAiAnalysis("Failed to analyze video. Please try again.");
    }
    setLoadingAnalysis(false);
  };

  const handleOfferRole = async (applicantUsername) => {
    // Confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to offer this role to ${applicantUsername}?`
    );
    
    if (!confirmed) return;

    try {
      const response = await axios.patch(`${apiurl}/roles/${role_id}/offer`, {
        offered_to: applicantUsername,
      });
      
      if (response.status === 200) {
        alert(`Role successfully offered to ${applicantUsername}!`);
        // Optionally, you can refresh the applicants list or redirect
        window.location.reload();
      } else {
        alert("Failed to offer role. Please try again.");
      }
    } catch (error) {
      console.error("Error offering role:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Failed to offer role"}`);
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div
      className="h-full"
      style={{ backgroundColor: "var(--mydark)" }}
    >
      <BackNavbar label={"Profile"} />
      <h2
        className="text-3xl font-bold text-center mb-10"
        style={{ color: "var(--gold)" }}
      >
        Applicants for Role #{role_id}{" "}
        <span className="text-white">({roleFor})</span>
      </h2>

      <div className="overflow-x-auto">
        {applicants.length > 0 ? (
          <table className="w-4/5 mx-auto border border-[var(--gold)] rounded-lg overflow-hidden shadow-md text-left">
            <thead>
              <tr
                style={{ backgroundColor: "var(--dark-red)" }}
                className="text-white"
              >
                <th className="px-6 py-3 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                  Username
                </th>
                <th className="px-6 py-3 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                  Rating
                </th>
                <th className="px-6 py-3 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                  Paragraph
                </th>
                <th className="px-6 py-3 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                  Audition Video
                </th>
                <th className="px-6 py-3 border-b border-[var(--gold)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.username} className="text-white">
                  <td className="px-6 py-4 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                    {applicant.username}
                  </td>
                  <td className="px-6 py-4 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                    {applicant.rating}
                  </td>
                  <td className="px-6 py-4 border-b border-[var(--gold)] border-r border-[var(--gold)] max-w-xs">
                    <div className="truncate" title={applicant.Applications.paragraph}>
                      {applicant.Applications.paragraph}
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                    {applicant.Applications.audition_url ? (
                      <button
                        onClick={() => openVideoModal(applicant.Applications.audition_url)}
                        className="text-[var(--gold)] hover:underline hover:text-yellow-300 transition-colors"
                      >
                        View Video
                      </button>
                    ) : (
                      <span className="text-gray-400">No video</span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b border-[var(--gold)]">
                    <button
                      onClick={() => handleOfferRole(applicant.username)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
                    >
                      Offer Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-20">
            <div className="bg-[var(--dark-red)] border border-[var(--gold)] rounded-lg p-8 w-1/2 mx-auto">
              <h3 className="text-2xl font-semibold text-[var(--gold)] mb-4">
                No Applicants Yet
              </h3>
              <p className="text-white text-lg">
                This role hasn't received any applications yet. Check back later!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[var(--mydark)] border-2 border-[var(--gold)] rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[var(--gold)]">Audition Video</h3>
              <button
                onClick={closeVideoModal}
                className="text-white hover:text-[var(--gold)] text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <video
                controls
                className="w-full max-w-2xl border-2 border-[var(--gold)] rounded-lg"
                src={currentVideo}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex gap-4 mb-4">
              <button
                onClick={getAiAnalysis}
                disabled={loadingAnalysis}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {loadingAnalysis ? 'Analyzing...' : 'Get AI Analysis'}
              </button>
              <button
                onClick={closeVideoModal}
                className="bg-[var(--dark-red)] hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>

            {aiAnalysis && (
              <div className="bg-[var(--dark-red)] border border-[var(--gold)] rounded-lg p-4">
                <h4 className="text-xl font-bold text-[var(--gold)] mb-3">AI Analysis</h4>
                <p className="text-white whitespace-pre-wrap">{aiAnalysis}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewRoleApplicants;
