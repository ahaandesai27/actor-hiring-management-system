import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackNavbar from "../../Back";
import axios from "axios";

function ViewRoleApplicants() {
  const { role_id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [roleFor, setRoleFor] = useState("");

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await axios.get(
          `http://localhost:5000/roles/${role_id}/applicants`
        );
        const data = res.data;

        if (data.length > 0) {
          setRoleFor(data[0].role_for);
          setApplicants(data[0].Professionals);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchApplicants();
  }, [role_id]);

  return (
    <div
      className="h-full"
      style={{ backgroundColor: "var(--black)" }}
    >
      <BackNavbar label={"Profile"} />
      <h2
        className="text-3xl font-bold text-center mb-10"
        style={{ color: "var(--gold)" }}
      >
        Applicants for Role #{role_id}{" "}
        <span className="text-white">({roleFor})</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-3/5 mx-auto border border-[var(--gold)] rounded-lg overflow-hidden shadow-md text-left">
          <thead>
            <tr
              style={{ backgroundColor: "var(--dark-red)" }}
              className="text-white"
            >
              <th className="px-6 py-3 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                Username
              </th>
              <th className="px-6 py-3 border-b border-[var(--gold)]">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.username} className="text-white">
                <td className="px-6 py-4 border-b border-[var(--gold)] border-r border-[var(--gold)]">
                  {applicant.username}
                </td>
                <td className="px-6 py-4 border-b border-[var(--gold)]">
                  {applicant.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRoleApplicants;
