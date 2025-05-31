import axios from "axios";
import { useEffect, useState } from "react";
import apiurl from "../../../apiurl";

const Follows = ({ username, following = true }) => {
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="max-w-md mx-auto mt-6 p-4 bg-gray-900 rounded-xl shadow-md text-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {following ? "Following" : "Followers"}
      </h2>
      {follows.length === 0 ? (
        <p className="text-center text-gray-500">
          No {following ? "following" : "followers"} found.
        </p>
      ) : (
        <ul className="divide-y divide-gray-700">
          {follows.map((user, index) => (
            <li
              key={index}
              className="py-2 px-4 hover:bg-gray-800 rounded-md transition cursor-default"
            >
              {typeof user === "string" ? user : user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Follows;
