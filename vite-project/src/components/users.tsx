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
        /* Button Style */
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

        /* Modal Overlay */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center; z-index: 100;
          animation: fadeIn 0.3s ease;
        }

        /* Modal Box */
        .modal-content {
          background: white; padding: 30px; border-radius: 16px;
          width: 400px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }

        .close-x {
          position: absolute; top: 15px; right: 20px; font-size: 24px;
          cursor: pointer; color: #999; border: none; background: none;
        }
        .close-x:hover { color: #333; }

        .modal-header { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        
        /* Form style inside modal */
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 12px; color: #888; margin-bottom: 5px; }
        .form-group input { 
          width: 100%; padding: 10px; border: 1px solid #ddd; 
          border-radius: 8px; background: #f9f9f9; box-sizing: border-box;
        }

        .btn-cancel {
          width: 100%; padding: 10px; margin-top: 10px; border-radius: 8px;
          border: 1px solid #ddd; background: white; cursor: pointer; transition: 0.2s;
        }
        .btn-cancel:hover { background: #f5f5f5; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
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

      {/* MODAL */}
      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-header">
              <h2 style={{ margin: 0, color: "#333" }}>User Details</h2>
            </div>

            <div className="form-group">
              <label>ID</label>
              <input type="text" value={selectedUser.id} readOnly />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={selectedUser.name} readOnly />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="text" value={selectedUser.email} readOnly />
            </div>

            <button className="btn-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
