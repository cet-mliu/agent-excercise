import { useEffect, useState } from 'react';
// API endpoint: -8000.app.github.dev/api/teams
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/teams`;
function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Teams;