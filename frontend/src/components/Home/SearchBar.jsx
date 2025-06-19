import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import apiurl from '../../apiurl';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const search = async (text) => {
    if (!text) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${apiurl}/professional/search/${text}`);
      setResults(response.data.professionals);
      setIsOpen(true);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => search(value), 300);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleResultClick = (username) => {
    window.location.href = `/profile/${username}`;
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gold" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for actors, directors, producers..."
          className="w-full pl-12 pr-12 py-4 text-lg rounded-xl border-2 border-gold bg-mydark text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200 shadow-lg"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-mydark border-2 border-gold rounded-xl shadow-2xl overflow-hidden">
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto z-40">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="p-4 bg-black z-1 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0 flex items-center gap-3"
                  onClick={() => handleResultClick(result.username)}
                >
                  {/* Profile Avatar */}
                  {result.profile_picture ? 
                  <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <img src={result.profile_picture} /> 
                  </div>
                  : <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-black font-semibold text-sm">
                      {result.username.charAt(0).toUpperCase()}
                    </span>
                  </div>}
                  
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="text-white font-semibold">@{result.username}</div>
                    {result.full_name && (
                      <div className="text-gray-400 text-sm">{result.full_name}</div>
                    )}
                    {result.profession && (
                      <div className="text-gold text-xs">{result.profession.charAt(0)
                                                                           .toUpperCase() + result.profession.slice(1)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && query && (
              <div className="p-6 text-center">
                <div className="text-gray-400 text-lg">No results found</div>
                <div className="text-gray-500 text-sm mt-1">
                  Try searching with different keywords
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
