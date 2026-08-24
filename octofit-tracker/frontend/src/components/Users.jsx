import { useEffect, useState } from 'react';
const codespaceName = import.meta.env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Users;