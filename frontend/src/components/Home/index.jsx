import { useUser } from "../User/user";
import SearchBar from "./SearchBar";

export default function HomePage() {
  const { userName } = useUser();

  return (
    <div className="text-white">
      <SearchBar />
      <div>Welcome, {userName} </div>

      <div>Roles for you</div>

      <div>Posts</div>
    </div>
  );
}
