import React from 'react';

const Loading = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-mydark">
      {/* Spinning loader */}
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-800 border-t-gold rounded-full animate-spin`}></div>
        
        {/* Inner ring - counter rotating */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4'
        } border-2 border-transparent border-b-red-600 rounded-full animate-spin`} 
        style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-4 text-gold font-semibold text-lg animate-pulse">
        {message}
      </div>
      
      {/* Animated dots */}
      <div className="mt-2 flex space-x-1">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

// Alternative minimal loading component
export const SimpleLoading = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} border-3 border-gray-700 border-t-gold rounded-full animate-spin`}></div>
    </div>
  );
};

// Loading overlay component
export const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-mydark border-2 border-gold rounded-lg p-8 text-center">
        <Loading message={message} size="large" />
      </div>
    </div>
  );
};

export default Loading;