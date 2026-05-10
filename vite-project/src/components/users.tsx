import { useState } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://d1qcsdbpz6o0bc.cloudfront.net/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={getUsers}>{loading ? "Loading..." : "Get Users"}</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
