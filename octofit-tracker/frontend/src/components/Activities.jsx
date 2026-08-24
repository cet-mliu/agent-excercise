import { useEffect, useState } from 'react';
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/api/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Activity Type</th>
            <th>Duration (min)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.username}</td>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
              <td>{new Date(activity.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Activities;