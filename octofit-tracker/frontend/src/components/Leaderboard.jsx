import { useEffect, useState } from 'react';

// API endpoint: -8000.app.github.dev/api/leaderboard
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/leaderboard`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.username}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
