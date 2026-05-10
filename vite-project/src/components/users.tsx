import { useEffect, useState } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IApiResponse {
  users: IUser[];
  total: number;
  pages: number;
  current_page: number;
}

export default function Users() {
  // States
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Pagination States
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Tự động fetch khi thay đổi page hoặc pageSize
  useEffect(() => {
    fetchUsers();
  }, [page, pageSize]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Endpoint giả định, bạn thay bằng URL thật của Flask
      const res = await fetch(
        `https://your-api-domain.com/users?page=${page}&page_size=${pageSize}`,
      );
      const data: IApiResponse = await res.json();
      setUsers(data.users);
      setTotalPages(data.pages);
    } catch (err) {
      console.error("Lỗi kết nối API:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedUser(null);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <style>{`
        /* --- Button & Controls --- */
        .controls-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .btn-fancy {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          color: white; border: none; padding: 12px 28px; border-radius: 30px;
          font-weight: bold; cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
        }
        .btn-fancy:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .btn-fancy:disabled { background: #ccc; cursor: not-allowed; box-shadow: none; }

        .select-size {
          padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd;
          outline: none; cursor: pointer; font-weight: 500;
        }

        /* --- Table Styling --- */
        .table-wrapper {
          max-height: 480px; overflow-y: auto; border-radius: 12px;
          border: 1px solid #eee; box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          background: white;
        }

        table { width: 100%; border-collapse: collapse; text-align: left; cursor: pointer; }
        
        th { 
          position: sticky; top: 0; background: #2d3436; color: white; 
          padding: 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; z-index: 5;
        }

        td { padding: 14px 16px; border-bottom: 1px solid #f1f1f1; color: #444; font-size: 15px; }
        
        tbody tr:nth-child(even) { background-color: #f9fbfd; }
        tbody tr:hover { background-color: #edf2f7; transition: 0.2s; }

        /* --- Pagination Bar --- */
        .pagination-bar {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 20px; padding: 15px; background: #fff; border-radius: 12px;
          border: 1px solid #eee;
        }

        .btn-page {
          padding: 8px 16px; border: 1px solid #dee2e6; background: white;
          border-radius: 6px; cursor: pointer; font-weight: 500; transition: 0.2s;
        }
        .btn-page:hover:not(:disabled) { background: #f8f9fa; border-color: #adb5bd; }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        /* --- Modal Styling --- */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.6); display: flex;
          justify-content: center; align-items: center; z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: white; padding: 30px; border-radius: 20px;
          width: 100%; max-width: 450px; position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .close-x {
          position: absolute; top: 20px; right: 20px; font-size: 28px;
          cursor: pointer; color: #aaa; border: none; background: none; line-height: 1;
        }

        .form-group { margin-bottom: 18px; }
        .form-group label { 
          display: block; font-weight: bold; color: #2d3436; 
          margin-bottom: 8px; font-size: 13px; text-transform: uppercase;
        }
        .form-group input { 
          width: 100%; padding: 12px; border: 2px solid #f0f0f0; 
          border-radius: 10px; background: #fcfcfc; box-sizing: border-box;
          font-size: 15px; color: #555; outline: none;
        }

        .modal-footer { display: flex; justify-content: flex-end; margin-top: 25px; }
        
        .btn-cancel {
          padding: 12px 30px; border-radius: 10px; border: none; 
          background: #0984e3; color: white; font-weight: bold;
          cursor: pointer; transition: 0.3s;
        }
        .btn-cancel:hover { background: #074b83; transform: translateY(-1px); }

        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      <div className="controls-header">
        <button className="btn-fancy" onClick={fetchUsers} disabled={loading}>
          {loading ? "⌛ FETCHING..." : "🚀 REFRESH USERS"}
        </button>

        <div>
          <span
            style={{
              marginRight: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            ROWS:
          </span>
          <select
            className="select-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={100}>100</option>
            <option value={1000}>1000</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.id} onClick={() => setSelectedUser(u)}>
                  <td style={{ fontWeight: "bold" }}>#{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#999",
                  }}
                >
                  {loading ? "Loading data..." : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-bar">
        <div style={{ fontSize: "14px", color: "#636e72" }}>
          Trang <b>{page}</b> / <b>{totalPages}</b>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn-page"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <button
            className="btn-page"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-x" onClick={closeModal}>
              &times;
            </button>

            <h2
              style={{ marginTop: 0, marginBottom: "25px", color: "#2d3436" }}
            >
              User Details
            </h2>

            <div className="form-group">
              <label>User ID</label>
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
