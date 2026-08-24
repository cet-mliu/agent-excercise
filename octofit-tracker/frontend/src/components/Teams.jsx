import { useEffect, useState } from 'react';

// API endpoint: -8000.app.github.dev/api/teams
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/teams`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id} className="list-group-item">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
