import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useUser} from '../../User/user';

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';

  const date = new Date(dateStr);
  if (isNaN(date)) return 'N/A';

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // function to get ordinal suffix for the day
  function getOrdinal(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  return `${day}${getOrdinal(day)} ${month}, ${year}`;
}

function capitalizeFirst(str) {
  if (!str) return 'N/A';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ApplyRolePage() {
  const { userName } = useUser();
  const { roleId } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetch(`http://localhost:5000/roles/${roleId}`);
        if (!res.ok) throw new Error('Failed to fetch role');
        const data = await res.json();
        setRole(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchRole();
  }, [roleId]);

  const handleApply = async () => {
  try {
    const response = await axios.post('http://localhost:5000/professional/apply', {
      username: userName,
      role_id: roleId,
    });
    alert(response.data.message);
  } catch (e) {
    // axios throws error for non 2xx responses
    if (e.response) {
      if (e.response.status === 403) {
        alert("Cannot apply for this role as profile does not match!");
      } else if (e.response.status === 404) {
        alert("Professional or role not found.");
      } else {
        alert(e.response.data.message || "Error in applying for role!");
      }
    } else {
      console.log(e);
      alert("Network or server error!");
    }
  }
};


  if (!role)
    return (
      <main className="min-h-screen w-full flex bg-black text-white p-10 text-xl font-semibold">
        Loading role data...
      </main>
    );

  return (
    <main className="min-h-screen w-full bg-black text-white p-10 flex flex-col">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 tracking-wide">
        Role Details
      </h1>

      <section className="pr-6 space-y-8 mb-8">
        <div>
          <div className="text-2xl font-bold text-yellow-300 mb-2">Information</div>
          <p className="text-red-400 text-lg">{role.information || 'N/A'}</p>
        </div>

        <div className="flex flex-wrap gap-6">
          {[
            { label: "Role For", value: capitalizeFirst(role.role_for) },
            { label: "Start Date", value: formatDate(role.start_date) },
            { label: "End Date", value: formatDate(role.end_date) },
            { label: "Pay", value: role.pay !== null ? role.pay : "N/A" },
            { label: "Creator", value: role.creator || "N/A" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="border-2 border-red-600 rounded-lg p-4 min-w-[140px] flex flex-col"
            >
              <div className="text-xl font-bold text-yellow-300 mb-1">{label}</div>
              <p className="text-red-400 text-lg">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <button
        onClick={handleApply}
        className="self-start bg-red-700 hover:bg-red-800 transition-colors rounded-lg py-4 px-10 text-white text-3xl font-bold"
      >
        Apply
      </button>
    </main>
  );
}
