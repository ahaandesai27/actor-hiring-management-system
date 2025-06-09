import { Film } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="w-full flex justify-between items-center py-4 px-4 sm:px-6 text-gray-100"
      style={{
        backgroundColor: "rgba(255, 200, 0, 0.29)",
      }}
    >
      <div className="flex items-center space-x-2">
        <Film className="h-6 w-6 text-red-600" />
        <span className="text-xl text-white font-bold">ProdCast</span>
      </div>
      <div className="hidden md:flex space-x-6">
        <a href="/" className="text-white hover:text-yellow-300">
          Home
        </a>
        <a href="/profile" className="text-white hover:text-yellow-300">
          Profile
        </a>
        <a href="/roles" className="text-white hover:text-yellow-300">
          Roles
        </a>
        <a href="/posts" className="text-white hover:text-yellow-300">
          Posts
        </a>
      </div>
      <button className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium">
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;