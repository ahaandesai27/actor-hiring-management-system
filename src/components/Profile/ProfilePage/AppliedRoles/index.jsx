import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import apiurl from "../../../../apiurl";
import { useUser } from "../../../User/user";
import "./AppliedRolesStyles.css";

// ...existing code...

function RolePage({ username = "" }) {
  // initially empty
  const [roles, setRoles] = useState([]);
  // initially false
  const [sortedByDate, setSortByDate] = useState(false);
  const [creator, setCreator] = useState("");
  const [roleFor, setRoleFor] = useState("");
  const [payLL, setPayLL] = useState(null);
  const [payHL, setPayHL] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const navigate = useNavigate();
  const { userName } = useUser();

  // this is a useEffect, this thing will run only once
  // per page reload
  // this is used because we want to get the roles data only
  // once. '[]' has been put to tell react to run this only when it empty
  // ie. when first opened or reloaded
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await axios.get(`${apiurl}/professional/${username}/applied_roles`);
        setRoles(response.data);
        } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
    fetchRoles();
  }, [username]);
  // arrow syntax for a function
  const sortRolesByDate = () => {
    // [...] creates a shallow copy, avoids direct changes
    // the thing inside sort is comparing the two dates, puts the
    // newest one first
    // after which the states are updated.
    const sorted = [...roles].sort(
      (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );
    setRoles(sorted);
    setSortByDate(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/roles/search?creator=${creator}&role_for=${roleFor}&pay_ll=${payLL}&pay_hl=${payHL}`
    );
    setRoles(response.data);
  };

  const clear = async (event) => {
    event.preventDefault();
    const response = await axios.get(`http://localhost:5000/roles/search`);
    setRoles(response.data);
  };
  const trimText = (text, maxLength = 75) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    return deadlineDate < currentDate;
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return "No deadline";
    const deadlineDate = new Date(deadline);
    return deadlineDate.toLocaleDateString();
  };

  const applyForRole = async (role_id) => {
    navigate(`../roles/apply/${role_id}`);
  };

  const openApplicationModal = (role) => {
    setSelectedApplication(role);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedApplication(null);
  };

  const isRoleOffered = (role) => {
    return role.offered_to && role.offered_to !== null;
  };

  const isOfferedToCurrentUser = (role) => {
    return role.offered_to === userName;
  };

  return (
    <div>
      {username === "" && (
        <h2 className="roles-header py-6">Available Roles</h2>
      )}
      {username === "" && (
        <form onSubmit={handleSubmit} className="px-6">
          <div className="text-red-600 text-2xl font-bold mb-5">Filters</div>
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              className="p-2 bg-gold rounded-lg"
            />

            <select
              value={roleFor}
              onChange={(e) => setRoleFor(e.target.value)}
              className="p-3 bg-gold rounded-lg"
            >
              <option value="">Select Role</option>
              <option value="actor">Actor</option>
              <option value="director">Director</option>
              <option value="producer">Producer</option>
            </select>

            <input
              type="number"
              placeholder="Pay Lower Limit"
              value={payLL}
              onChange={(e) => setPayLL(e.target.value)}
              className="p-2 bg-gold rounded-lg"
            />

            <input
              type="number"
              placeholder="Pay Upper Limit"
              value={payHL}
              onChange={(e) => setPayHL(e.target.value)}
              className="p-2 bg-gold rounded-lg"
            />
          </div>
          <br />

          <button
            type="submit"
            className="bg-red-600 p-2 rounded-lg mt-5 w-32 mr-3"
          >
            Search
          </button>
          <button
            className="bg-green-600 p-2 rounded-lg mt-5 w-32 mr-3"
            onClick={sortRolesByDate}
          >
            {" "}
            Sort By Date{" "}
          </button>
          <button
            className="bg-blue-400 p-2 rounded-lg mt-5 w-32"
            onClick={clear}
          >
            {" "}
            Clear{" "}
          </button>
        </form>
      )}

      <div className="roles-list">
        {roles.map((role, index) => (
          <div key={index} className="role-card">
            <div className="role-card-content">
              <h3 className="movie-name">{role.Film.title}</h3>

              <div className="role-info-grid">
                <div>
                  <strong>Role Type:</strong> {trimText(role.information)}
                </div>
                <div>
                  <strong>Creator:</strong> {role.creator}
                </div>
                <div>
                  <strong>Pay:</strong> {role.pay}
                </div>
                <div>
                  <strong>Role For:</strong> {role.role_for}
                </div>
                <div>
                  <strong>Deadline:</strong>{" "}
                  <span
                    className={
                      isDeadlinePassed(role.deadline)
                        ? "text-red-500 font-bold"
                        : "text-green-600"
                    }
                  >
                    {formatDeadline(role.deadline)}
                    {isDeadlinePassed(role.deadline) && " (Expired)"}
                  </span>
                </div>
              </div>

              {/* Role Offered Status */}
              {isRoleOffered(role) && (
                <div className="mt-4 p-3 rounded-lg border-2">
                  {isOfferedToCurrentUser(role) ? (
                    <div>
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">🎉</span>
                        <strong>Congratulations! This role has been offered to you!</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-100 border-red-500 text-red-800">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">❌</span>
                        <strong>This role has been offered to {role.offered_to}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => openApplicationModal(role)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 transition-colors"
              >
                View My Application
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[var(--mydark)] border-2 border-[var(--gold)] rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[var(--gold)]">
                My Application for {selectedApplication.Film.title}
              </h3>
              <button
                onClick={closeApplicationModal}
                className="text-white hover:text-[var(--gold)] text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Role Offered Status in Modal */}
            {isRoleOffered(selectedApplication) && (
              <div className="mb-6 p-4 rounded-lg border-2">
                {isOfferedToCurrentUser(selectedApplication) ? (
                  <div className="bg-green-100 border-green-500 text-green-800">
                    <div className="flex items-center justify-center">
                      <span className="text-3xl mr-3">🎉</span>
                      <div className="text-center">
                        <strong className="text-xl">Congratulations!</strong>
                        <p className="mt-1">This role has been offered to you!</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-100 border-red-500 text-red-800">
                    <div className="flex items-center justify-center">
                      <span className="text-2xl mr-3">❌</span>
                      <div className="text-center">
                        <strong>Role Not Available</strong>
                        <p className="mt-1">This role has been offered to {selectedApplication.offered_to}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Application Paragraph */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[var(--gold)] mb-3">Application Paragraph</h4>
              <div className="bg-[var(--dark-red)] border border-[var(--gold)] rounded-lg p-4">
                <p className="text-white whitespace-pre-wrap">
                  {selectedApplication.paragraph || "No paragraph provided"}
                </p>
              </div>
            </div>

            {/* Audition Video */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-[var(--gold)] mb-3">Audition Video</h4>
              {selectedApplication.audition_url ? (
                <div className="bg-[var(--dark-red)] border border-[var(--gold)] rounded-lg p-4">
                  <video
                    controls
                    className="w-full max-w-2xl border-2 border-[var(--gold)] rounded-lg"
                    src={selectedApplication.audition_url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="bg-[var(--dark-red)] border border-[var(--gold)] rounded-lg p-4">
                  <p className="text-gray-400 text-center">No audition video submitted</p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeApplicationModal}
                className="bg-[var(--dark-red)] hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolePage;
