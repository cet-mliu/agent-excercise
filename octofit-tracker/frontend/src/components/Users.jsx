import { useEffect, useState } from 'react';

// API endpoint: -8000.app.github.dev/api/users
const CODESPACE_HOST = window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev');
const API_BASE = `https://${CODESPACE_HOST}/api/users`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item">
            {user.username} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
