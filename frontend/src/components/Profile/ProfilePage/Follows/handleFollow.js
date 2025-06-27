import axios from 'axios';
import apiurl from '../../../../apiurl';

const handleFollow = async (accountUser, username, isFollowing, setIsFollowing) => {
    try {
      if (isFollowing === false) {
        await axios.post(`${apiurl}/connections/follow`, {
          professional1: accountUser,
          professional2: username,
        });

        setIsFollowing(true);
        return "Followed successfully!";
      } else {
        await axios.delete(`${apiurl}/connections/unfollow`, {
          data: {
            professional1: accountUser,
            professional2: username,
          },
        });

        setIsFollowing(false);
        return "Unfollowed successfully!";
      }
    } catch (error) {
      console.error("Follow/unfollow request failed:", error);
      return "Something went wrong. Please try again later.";
    }
}

export default handleFollow;