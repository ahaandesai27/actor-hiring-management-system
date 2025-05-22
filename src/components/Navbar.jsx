import { ArrowRight, FilmIcon, Award, Users, MapPin } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-black text-gray-100">
      <nav
        className="container bg-red-600 mx-auto flex justify-between items-center py-4 px-6"
        style={{
          backgroundColor: "rgba(255, 200, 0, 0.29)",
        }}
      >
        <div className="flex items-center space-x-2">
          <FilmIcon className="h-6 w-6 text-red-600" />
          <span className="text-xl text-white font-bold">ProdCast</span>
        </div>

        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-white hover:text-yellow-300">
            Home
          </a>
          <a href="#how-it-works" className="text-white hover:text-yellow-300">
            Profile
          </a>
          <a href="#testimonials" className="text-white hover:text-yellow-300">
            Roles
          </a>
          <a href="#testimonials" className="text-white hover:text-yellow-300">
            Locations
          </a>
        </div>

        <button className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium">
          Get Started
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
