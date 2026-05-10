import { useState } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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

  const closeModal = () => setSelectedUser(null);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <style>{`
        /* Button Style Main */
        .btn-fancy {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          color: white; border: none; padding: 12px 25px; border-radius: 30px;
          font-weight: bold; cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4); margin-bottom: 25px;
        }
        .btn-fancy:hover { transform: scale(1.05); filter: brightness(1.1); }

        /* Table Style */
        .table-wrapper {
          max-height: 400px; overflow-y: auto; border-radius: 12px;
          border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        table { width: 100%; border-collapse: collapse; text-align: left; cursor: pointer; }
        th { position: sticky; top: 0; background: #333; color: white; padding: 15px; z-index: 10; }
        td { padding: 12px 15px; border-bottom: 1px solid #eee; color: #444; }
        tbody tr:nth-child(even) { background-color: #f8f9fa; }
        tbody tr:hover { background-color: #e9ecef; }

        /* Modal Layout */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center; z-index: 100;
        }
        .modal-content {
          background: white; padding: 30px; border-radius: 16px;
          width: 450px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }
        .close-x {
          position: absolute; top: 15px; right: 20px; font-size: 24px;
          cursor: pointer; color: #999; border: none; background: none;
        }

        /* Form Details */
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { 
          display: block; 
          font-weight: bold; /* Bold label */
          color: #333; 
          margin-bottom: 8px; 
          font-size: 14px;
        }
        .form-group input { 
          width: 100%; padding: 12px; border: 1px solid #e0e0e0; 
          border-radius: 8px; background: #fdfdfd; box-sizing: border-box;
          outline: none; color: #555;
        }

        /* Modal Footer */
        .modal-footer {
          display: flex;
          justify-content: flex-end; /* Căn phải button */
          margin-top: 25px;
        }
        .btn-cancel {
          padding: 10px 25px; border-radius: 8px;
          border: none; 
          background: #007bff; /* Màu xanh */
          color: white;
          font-weight: 600;
          cursor: pointer; 
          transition: 0.2s;
        }
        .btn-cancel:hover { background: #0056b3; box-shadow: 0 4px 10px rgba(0,123,255,0.3); }

        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      <button className="btn-fancy" onClick={getUsers} disabled={loading}>
        {loading ? "⌛ Loading..." : "🚀 Get User Data"}
      </button>

      {users.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} onClick={() => setSelectedUser(u)}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={closeModal}>
              &times;
            </button>

            <h2
              style={{ textAlign: "left", marginBottom: "25px", color: "#222" }}
            >
              Information
            </h2>

            <div className="form-group">
              <label>ID</label>
              <input type="text" value={selectedUser.id} readOnly />
            </div>

            <div className="form-group">
              <label>NAME</label>
              <input type="text" value={selectedUser.name} readOnly />
            </div>

            <div className="form-group">
              <label>EMAIL</label>
              <input type="text" value={selectedUser.email} readOnly />
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
