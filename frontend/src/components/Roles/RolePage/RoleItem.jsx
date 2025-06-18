import React from "react";
import { useNavigate } from "react-router-dom";

const RoleItem = ({ role, userName, username, onApplyRole }) => {
  const navigate = useNavigate();

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

  const isRoleOffered = (role) => {
    return role.offered_to && role.offered_to !== null;
  };

  const isOfferedToCurrentUser = (role) => {
    return role.offered_to === userName;
  };

  const handleApplyForRole = () => {
    if (onApplyRole) {
      onApplyRole(role.role_id);
    } else {
      navigate(`../roles/apply/${role.role_id}`);
    }
  };

  const handleViewApplicants = () => {
    window.location.href = `/roles/${role.role_id}/applicants`;
  };

  return (
    <div className="role-card">
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
          <div className="mt-4 p-3 rounded-lg border-2 border-white">
            {isOfferedToCurrentUser(role) ? (
              <div className="border-green-500 text-green-800">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🎉</span>
                  <strong>Role has been offered to you!</strong>
                </div>
              </div>
            ) : (
              <div className="border-yellow">
                <div className="flex items-center">
                  <span className="text-xl mr-2">📋</span>
                  <strong className="text-red">
                    This role has been offered.
                  </strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {userName === username ? (
          <button
            onClick={handleViewApplicants}
            style={{ backgroundColor: "#22c55e", important: "true" }}
          >
            <div align="center">View Role Applicants</div>
          </button>
        ) : (
          <button
            onClick={handleApplyForRole}
            disabled={
              isDeadlinePassed(role.deadline) || isRoleOffered(role)
            }
            className={
              isDeadlinePassed(role.deadline) || isRoleOffered(role)
                ? "bg-gray-500 cursor-not-allowed opacity-50"
                : "hover:bg-opacity-80"
            }
            title={
              isRoleOffered(role)
                ? "This role has already been offered"
                : isDeadlinePassed(role.deadline)
                ? "Application deadline has passed"
                : ""
            }
          >
            <div align="center">
              {isRoleOffered(role)
                ? "Role Offered"
                : isDeadlinePassed(role.deadline)
                ? "Deadline Passed"
                : "Apply for role"}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default RoleItem;