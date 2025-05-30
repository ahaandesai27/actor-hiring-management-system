import React from "react";
import { ArrowRight, FilmIcon, Award, Users, MapPin } from "lucide-react";

const LandingPage = () => {
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
            Features
          </a>
          <a href="#how-it-works" className="text-white hover:text-yellow-300">
            How It Works
          </a>
          <a href="#testimonials" className="text-white hover:text-yellow-300">
            Testimonials
          </a>
        </div>

        <button
          className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium"
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          Get Started
        </button>
      </nav>

      <div className="flex justify-center items-center py-22 bg-black-900 text-gray-100 px-6">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Building digital networks for{" "}
            <p className="text-red-600">film professionals.</p>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            The complete platform for connecting, hiring, and managing talent
            across the film industry, helping you build exceptional productions
            and creative teams.
          </p>
          <div className="flex space-x-4 justify-center">
            <button className="bg-yellow-300 text-black hover:bg-red-600 px-6 py-3 rounded-md flex items-center font-medium">
              Start exploring <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-md">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="bg-black py-10 border-y border-yellow-300 shadow-[0px_0px_8px_#FFD700]">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-400 mb-8">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-gray-400 text-lg font-medium">
              <p align="center">Universal</p>
            </div>

            <div className="text-gray-400 text-lg font-medium">Paramount</div>
            <div className="text-gray-400 text-lg font-medium">A24</div>
            <div className="text-gray-400 text-lg font-medium">Warner Bros</div>
            <div className="text-gray-400 text-lg font-medium">Netflix</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div
            className="p-6 rounded-lg"
            style={{
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "2px solid #FFD700",
              backgroundColor: "rgba(250, 201, 24, 0.16)", // Goldish with transparency
            }}
          >
            <div className="h-14 w-14 bg-red-600/20 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Profiles</h3>
            <p className="text-gray-300">
              Create detailed portfolios showcasing your work history, skills,
              and expertise in the film industry.
            </p>
          </div>

          <div
            className="p-6 rounded-lg border border-yellow-300"
            style={{
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "2px solid #FFD700",
              backgroundColor: "rgba(250, 201, 24, 0.16)", // Goldish with transparency
            }}
          >
            <div className="h-14 w-14 bg-red-600/20 rounded-lg flex items-center justify-center mb-6">
              <FilmIcon className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Project Roles</h3>
            <p className="text-gray-300">
              Post and find opportunities for every sector of film production,
              from pre-production to post.
            </p>
          </div>

          <div
            className="p-6 rounded-lg border border-yellow-300"
            style={{
              padding: "1.5rem",
              borderRadius: "0.5rem",
              border: "2px solid #FFD700",
              backgroundColor: "rgba(250, 201, 24, 0.16)", // Goldish with transparency
            }}
          >
            <div className="h-14 w-14 bg-red-600/20 rounded-lg flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-red-500" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-3">Connections</h3>
              <p className="text-gray-300">
                Share updates, exchange feedback, and collaborate with
                professionals through posts, comments, and direct messaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 border-y border-yellow-300 shadow-[0px_0px_8px_#FFD700]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to transform your film hiring process?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of film professionals already using ProdCast to hire
            exceptional professionals.
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-md text-lg font-medium"
          onClick={() => {
            window.location.href = "/login";
          }}>
            Get Started for Free
          </button>
          <p className="mt-4 text-gray-400">No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="bg-gray-900 py-12 border-t border-gray-800"
        style={{
          backgroundColor: "rgba(255, 200, 0, 0.29)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <FilmIcon className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold">ProdCast</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Connecting film professionals with the perfect projects and
                teams since 2025.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
