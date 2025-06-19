import { useEffect, useState } from "react";
import axios from "axios";
import apiurl from "../../../apiurl";
import "./RolePagestyles.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../User/user";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RoleItem from "./RoleItem";

function RolePage({ username = "" }) {
  // initially empty
  const [roles, setRoles] = useState([]);
  // initially false
  const [sortedByDate, setSortByDate] = useState(false);
  const [creator, setCreator] = useState("");
  const [roleFor, setRoleFor] = useState("");
  const [payLL, setPayLL] = useState(null);
  const [payHL, setPayHL] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRoles, setTotalRoles] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { userName } = useUser();

  const ROLES_PER_PAGE = 6;

  // Fetch roles with pagination
  const fetchRoles = async (page = 1, filters = {}) => {
    console.log(page, filters);
    setLoading(true);
    try {
      let response;
      const offset = (page - 1) * ROLES_PER_PAGE;
      
      if (username !== "") {
        const url = `${apiurl}/professional/${username}/created_roles?limit=${ROLES_PER_PAGE}&skip=${offset}`;
        response = await axios.get(url);
      } else {
        const queryParams = new URLSearchParams({
          limit: ROLES_PER_PAGE,
          skip: offset,
          ...filters
        });
        const url = `${apiurl}/roles/search?${queryParams}`;
        response = await axios.get(`${apiurl}/roles/search?${queryParams}`);
      }
      
      const data = response.data;
      
      // Assuming your API returns { roles: [...], total: number }
      // If your API structure is different, adjust accordingly
      if (data.roles) {
        setRoles(data.roles);
        setTotalRoles(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / ROLES_PER_PAGE));
      } else {
        // Fallback if API returns array directly
        setRoles(data);
        setTotalRoles(data.length);
        setTotalPages(Math.ceil(data.length / ROLES_PER_PAGE));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
      setTotalRoles(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(currentPage);
    setCurrentPage(currentPage);
  }, [username, currentPage]);

  // arrow syntax for a function
  const sortRolesByDate = () => {
    // [...] creates a shallow copy, avoids direct changes
    // the thing inside sort is comparing the two dates, puts the
    // newest one first
    // after which the states are updated.
    const sorted = [...roles].sort(
      (a, b) => new Date(b.start_date) - new Date(a.start_date)
    );
    setRoles(sorted);
    setSortByDate(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1);
    const filters = {
      creator: creator || undefined,
      role_for: roleFor || undefined,
      pay_ll: payLL || undefined,
      pay_hl: payHL || undefined
    };
    // Remove undefined values
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
    
    await fetchRoles(1, filters);
  };

  const clear = async (event) => {
    event.preventDefault();
    setCreator("");
    setRoleFor("");
    setPayLL(null);
    setPayHL(null);
    setCurrentPage(1);
    await fetchRoles(1);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      const filters = {
        creator: creator || undefined,
        role_for: roleFor || undefined,
        pay_ll: payLL || undefined,
        pay_hl: payHL || undefined
      };
      Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);
      fetchRoles(page, filters);
    }
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);
  const goToPreviousPage = () => handlePageChange(currentPage - 1);
  const goToNextPage = () => handlePageChange(currentPage + 1);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2; // Show 2 pages before and after current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleApplyForRole = (roleId) => {
    navigate(`../roles/apply/${roleId}`);
  };

  return (
    <div>
      {username === "" && (
        <h2 className="roles-header py-6">Available Roles</h2>
      )}
      {username === "" && (
        <form onSubmit={handleSubmit} className="px-6">
          <div className="text-red-600 text-2xl font-bold mb-5">Filters</div>
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Creator"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              className="p-2 bg-gold rounded-lg"
            />

            <select
              value={roleFor}
              onChange={(e) => setRoleFor(e.target.value)}
              className="p-3 bg-gold rounded-lg"
            >
              <option value="">Select Role</option>
              <option value="actor">Actor</option>
              <option value="director">Director</option>
              <option value="producer">Producer</option>
            </select>

            <input
              type="number"
              placeholder="Pay Lower Limit"
              value={payLL}
              onChange={(e) => setPayLL(e.target.value)}
              className="p-2 bg-gold rounded-lg"
            />

            <input
              type="number"
              placeholder="Pay Upper Limit"
              value={payHL}
              onChange={(e) => setPayHL(e.target.value)}
              className="p-2 bg-gold rounded-lg"
            />
          </div>
          <br />

          <button
            type="submit"
            className="bg-red-600 p-2 rounded-lg mt-5 w-32 mr-3"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            className="bg-green-600 p-2 rounded-lg mt-5 w-32 mr-3"
            onClick={sortRolesByDate}
            disabled={loading}
          >
            Sort By Date
          </button>
          <button
            className="bg-blue-400 p-2 rounded-lg mt-5 w-32"
            onClick={clear}
            disabled={loading}
          >
            Clear
          </button>
        </form>
      )}

      {/* Results Info */}
      {username === "" && (
        <div className="px-6 py-2 text-gray-300">
          Showing {roles.length > 0 ? ((currentPage - 1) * ROLES_PER_PAGE) + 1 : 0} - {Math.min(currentPage * ROLES_PER_PAGE, totalRoles)} of {totalRoles} roles
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="text-gold">Loading roles...</div>
        </div>
      )}

      {/* Roles List */}
      {!loading && (
        <div className="roles-list">
          {roles.map((role, index) => (
            <RoleItem
              key={index}
              role={role}
              accountUser={userName}
              username={username}
              onApplyRole={handleApplyForRole}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && roles.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No roles found. Try adjusting your filters.
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col items-center py-6 space-y-4">
          {/* Page Info */}
          <div className="text-gray-300 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          
          {/* Pagination Buttons */}
          <div className="flex items-center space-x-2">
            {/* First Page */}
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              First
            </button>

            {/* Previous Page */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex items-center"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {getPageNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                  disabled={pageNum === '...' || pageNum === currentPage}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pageNum === currentPage
                      ? 'bg-gold text-black font-bold'
                      : pageNum === '...'
                      ? 'text-gray-400 cursor-default'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Page */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolePage;