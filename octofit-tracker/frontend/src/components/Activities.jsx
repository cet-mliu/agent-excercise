import { useEffect, useState } from 'react';

// API endpoint: -8000.app.github.dev/api/activities
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/activities`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id} className="list-group-item">
            {activity.description} — {activity.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
