import React, { useState, useRef } from 'react';
import apiurl from '../../apiurl';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const search = async (text) => {
    if (!text) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${apiurl}/professional/search/${text}`);
      setResults(response.data.professionals);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    clearTimeout(timeoutRef.current);       // cancels a previously scheduled search if any 
    timeoutRef.current = setTimeout(() => search(value), 300);          // waits 300 seconds and then searches 
    // as useRef does not cause re renders, we use that as opposed to useState
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-mydark dark:bg-mydark text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {loading && <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Loading...</div>}

      {results.length > 0 ? (
        <div className="absolute z-10 w-full mt-2 bg-mydark dark:bg-mydark border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
          {results.map((result, i) => (
            <div
              key={i}
              className="p-3 hover:bg-mydark dark:hover:bg-mydark cursor-pointer transition-colors"
              onClick={() => window.location.href = `/profile/${result.username}`}
            >
              {result.username}
            </div>
          ))}
        </div>
      ) : (
        !loading && query && (
          <div className="absolute z-10 w-full mt-2 bg-mydark dark:bg-mydark border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
            <div className="p-3 text-gray-500 dark:text-gray-400">No results found</div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;
