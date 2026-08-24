import { useEffect, useState } from 'react';
// API endpoint: -8000.app.github.dev/api/activities
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/activities`;
function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(API_BASE)
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