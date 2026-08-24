import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id} className="list-group-item">
            {activity.type} - {activity.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
