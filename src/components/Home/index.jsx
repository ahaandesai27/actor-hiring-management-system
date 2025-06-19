import { useUser } from "../User/user";
import SearchBar from "./SearchBar";
import apiurl from "../../apiurl";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, User, FileText, Search, MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  const { userName } = useUser();
  const navigate = useNavigate();

  const handleAddRole = () => {
    navigate('/roles/add');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleCreatePost = () => {
    navigate('/posts/add');
  };

  const handleBrowseRoles = () => {
    navigate('/roles');
  };

  const handleGoToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="text-white min-h-screen bg-mydark">
      {/* Hero Section */}
      <div className="px-6 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-5xl text-gold mb-4">
            Welcome, {userName}
          </h1>
          <p className="text-gray-300 text-lg">
            Your entertainment industry hub awaits
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <SearchBar />
        </div>

        {/* CTA Buttons */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="text-4xl mb-2 font-bold text-center text-white mb-6">
            Quick Actions
          </div>
          
          {/* First row - 3 buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Go to Profile */}
            <button
              onClick={handleGoToProfile}
              className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex flex-col items-center gap-3 shadow-lg"
            >
              <User className="w-8 h-8" />
              <span>My Profile</span>
            </button>

            {/* Create Post */}
            <button
              onClick={handleCreatePost}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex flex-col items-center gap-3 shadow-lg"
            >
              <FileText className="w-8 h-8" />
              <span>Create Post</span>
            </button>

            <button
              onClick={handleGoToChat}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex flex-col items-center gap-3 shadow-lg"
            >
              <MessageCircle className="w-8 h-8" />
              <span>Messages</span>
            </button>
          </div>

          {/* Second row - 2 buttons centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Browse Roles */}
            <button
              onClick={handleBrowseRoles}
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex flex-col items-center gap-3 shadow-lg"
            >
              <Search className="w-8 h-8" />
              <span>Browse Roles</span>
            </button>

            {/* Add Role */}
            <button
              onClick={handleAddRole}
              className="bg-gold hover:bg-yellow-600 text-black p-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex flex-col items-center gap-3 shadow-lg"
            >
              <Plus className="w-8 h-8" />
              <span>Add Role</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
