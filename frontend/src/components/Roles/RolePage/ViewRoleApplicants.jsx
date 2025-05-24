import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewRoleApplicants() {
    const { role_id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [roleFor, setRoleFor] = useState('');

    useEffect(() => {
        async function fetchApplicants() {
            try {
                const res = await axios.get(`http://localhost:5000/roles/${role_id}/applicants`);
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
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>
                Applicants for Role #{role_id} ({roleFor})
            </h2>

            <table style={{
                width: '60%',
                margin: '30px auto',
                borderCollapse: 'collapse',
                textAlign: 'left',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#007BFF', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant) => (
                        <tr key={applicant.username}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{applicant.username}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{applicant.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewRoleApplicants;
