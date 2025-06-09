import { useEffect, useState } from "react";
import axios from "axios";
import apiurl from "../../../apiurl";
import "./RolePagestyles.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../User/user";

function RolePage({ username = "" }) {
  // initially empty
  const [roles, setRoles] = useState([]);
  // initially false
  const [sortedByDate, setSortByDate] = useState(false);
  const [creator, setCreator] = useState("");
  const [roleFor, setRoleFor] = useState("");
  const [payLL, setPayLL] = useState(null);
  const [payHL, setPayHL] = useState(null);
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
        let response;
        if (username !== "") {
          response = await axios.get(
            `${apiurl}/professional/${username}/created_roles`
          );
        } else {
          response = await axios.get(`${apiurl}/roles/search`);
        }
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

  const applyForRole = async (role_id) => {
    navigate(`../roles/apply/${role_id}`);
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

      {/* the map is used to go thru each element obtained from
                    the DB
                    it is all wrapped inside a Card element
                    the key={index} is required so that react can identify them
                    the .toLocaleString() is used to convert it into readable date */}
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
              </div>

              {userName == username ? (
                <button
                  onClick={() => {window.location.href = `/roles/${role.role_id}/applicants`}}
                  style={{ backgroundColor: '#22c55e', important: 'true' }}
                >
                  <div align="center">
                    View Role Applicants
                  </div>
                </button>
              ) : (
                <button onClick={() => applyForRole(role.role_id)}>
                  <div align="center">Apply for role</div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RolePage;
