import { ArrowLeft } from "lucide-react";

const BackNavbar = ({ label }) => {
  return (
    <div className="w-full bg-black text-white">
      <nav
        className="w-full flex items-center py-5 px-8"
        style={{ backgroundColor: "rgba(255, 200, 0, 0.29)" }}
      >
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-white hover:text-yellow-300 font-semibold text-lg"
        >
          <ArrowLeft className="h-7 w-7 mr-3" />
          {label}
        </button>
      </nav>
    </div>
  );
};

export default BackNavbar;
