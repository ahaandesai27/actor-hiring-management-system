import { Film } from "lucide-react";
import { useUser } from "../User/user";

const Navbar = () => {
  const { userName } = useUser();

  return (
    <nav
      className="w-full flex items-center justify-between py-4 px-4 sm:px-6 text-gray-100"
      style={{
        backgroundColor: "rgba(255, 200, 0, 0.29)",
      }}
    >
      {/* Left: Logo */}
      <div className="flex w-32 items-center space-x-2">
        <Film className="h-6 w-6 text-red-600" />
        <span className="text-xl text-white font-bold">ProdCast</span>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex space-x-6 items-center justify-center flex-1">
        <a href="/home" className="text-white hover:text-yellow-300 text-center">
          Home
        </a>
        <a href="/profile" className="text-white hover:text-yellow-300 text-center">
          Profile
        </a>
        <a href="/roles" className="text-white hover:text-yellow-300 text-center">
          Roles
        </a>
        <a href="/posts" className="text-white hover:text-yellow-300 text-center">
          Posts
        </a>
        <a href="/chat" className="text-white hover:text-yellow-300 text-center">
          Chat
        </a>
      </div>

      {/* Right: Button or Empty Space */}
      <div className="w-32 flex justify-end">
        {!userName && (
          <button className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium">
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
