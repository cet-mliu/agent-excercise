import { useEffect, useState } from 'react';

// API endpoint: -8000.app.github.dev/api/workouts
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/workouts`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id} className="list-group-item">
            {workout.name} — {workout.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
