import { useUser } from "../User/user";

export default function HomePage() {
  const { userName } = useUser();

  return (
    <div className="text-white">
      <div>Welcome, {userName} </div>

      <div>Roles for you</div>

      <div>Posts</div>
    </div>
  );
}
