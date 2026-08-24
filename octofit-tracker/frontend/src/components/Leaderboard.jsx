import { useEffect, useState } from 'react';
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/api/leaderboard`)
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
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