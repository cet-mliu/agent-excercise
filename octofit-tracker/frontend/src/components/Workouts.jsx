import { useEffect, useState } from 'react';
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/api/workouts`)
      .then((res) => res.json())
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Workouts;