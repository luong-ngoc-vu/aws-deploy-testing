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
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <style>{`
        /* Button với hiệu ứng Gradient và Animation */
        .btn-fancy {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
          margin-bottom: 25px;
        }

        .btn-fancy:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(79, 172, 254, 0.6);
          filter: brightness(1.1);
        }

        /* Container cho table để xử lý bo góc và scroll */
        .table-wrapper {
          max-height: 400px;
          overflow-y: auto;
          border-radius: 12px; /* Bo góc cho cả bảng */
          border: 1px solid #ddd;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left; /* Căn trái toàn bộ text */
        }

        th {
          position: sticky;
          top: 0;
          background-color: #333;
          color: white;
          padding: 15px;
          font-weight: 600;
          z-index: 10;
        }

        td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          color: #444;
        }

        /* Phân biệt màu sắc hàng chẵn - lẻ */
        tbody tr:nth-child(odd) {
          background-color: #ffffff;
        }

        tbody tr:nth-child(even) {
          background-color: #f8f9fa; /* Màu xám nhạt cho hàng chẵn */
        }

        /* Hiệu ứng khi hover vào từng dòng */
        tbody tr:hover {
          background-color: #e9ecef;
        }

        /* Tùy chỉnh thanh cuộn */
        .table-wrapper::-webkit-scrollbar {
          width: 8px;
        }
        .table-wrapper::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }
      `}</style>

      <button className="btn-fancy" onClick={getUsers} disabled={loading}>
        {loading ? "Connecting..." : "Fetch User List"}
      </button>

      {users.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
