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
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      {/* CSS Injection cho Hover và Animation */}
      <style>{`
        .btn-gradient {
          background: linear-gradient(45deg, #FF512F 0%, #DD2476 51%, #FF512F 100%);
          background-size: 200% auto;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: 0.5s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        .btn-gradient:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(221, 36, 118, 0.3);
        }
        .btn-gradient:active {
          transform: translateY(0);
        }
        
        .table-container {
          max-height: 400px; /* Giới hạn chiều cao cho ~10 items */
          overflow-y: auto;
          border-radius: 12px;
          border: 1px solid #eee;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        th {
          position: sticky;
          top: 0;
          background-color: #f8f9fa;
          color: #555;
          font-weight: 600;
          padding: 15px;
          text-align: left;
          border-bottom: 2px solid #dee2e6;
          z-index: 1;
        }

        td {
          padding: 12px 15px;
          border-bottom: 1px solid #f0f0f0;
        }

        tr:nth-child(even) {
          background-color: #fafafa; /* Màu dòng chẵn */
        }

        tr:hover {
          background-color: #f1f7ff; /* Highlight khi hover dòng */
        }

        /* Tùy chỉnh thanh scroll cho đẹp */
        .table-container::-webkit-scrollbar {
          width: 6px;
        }
        .table-container::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
      `}</style>

      <button className="btn-gradient" onClick={getUsers} disabled={loading}>
        {loading ? "⌛ Loading..." : "🚀 Get All Users"}
      </button>

      {users.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <li key={u.id} style={{ display: "contents" }}>
                  <tr>
                    <td style={{ fontWeight: "bold", color: "#888" }}>
                      #{u.id}
                    </td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                  </tr>
                </li>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {users.length === 0 && !loading && (
        <p style={{ color: "#999", fontStyle: "italic" }}>
          No data available. Click the button to fetch.
        </p>
      )}
    </div>
  );
}
