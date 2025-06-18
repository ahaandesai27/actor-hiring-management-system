import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiurl from "../../../../apiurl";

const Follows = ({ username, following = true }) => {
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    async function fetchData() {
      try {
        const endpoint = following ? "following" : "followers";
        const response = await axios.get(`${apiurl}/connections/${username}/${endpoint}`);
        setFollows(response.data || []);
      } catch (err) {
        console.error("Failed to fetch follows", err);
        setFollows([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username, following]);

  if (loading)
    return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-[#262626] rounded-xl shadow-md text-gray-100">
      <div className="text-2xl text-gold font-semibold text-center mb-4">
        {following ? "Following" : "Followers"}
      </div>
      {follows.length === 0 ? (
        <p className="text-center text-gray-500">
          No {following ? "following" : "followers"} found.
        </p>
      ) : (
        <div>
          {follows.map((user, index) => {
            const username = typeof user === "string" ? user : user.username;

            return (
              <div
                key={index}
                onClick={() => window.location.href = `/profile/${username}`}
                className="py-2 px-4 text-center hover:text-red-500 rounded-md transition cursor-pointer"
              >
                {username}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Follows;
