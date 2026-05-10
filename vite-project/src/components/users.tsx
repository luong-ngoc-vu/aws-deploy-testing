import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

const fetchUsers = async (
  page: number,
  pageSize: number,
): Promise<IApiResponse> => {
  const res = await fetch(
    `https://d1qcsdbpz6o0bc.cloudfront.net/users?page=${page}&page_size=${pageSize}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => fetchUsers(page, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const closeModal = () => setSelectedUser(null);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <style>{`
        .controls-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        
        .btn-fancy {
          background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
          color: white; border: none; padding: 12px 28px; border-radius: 30px;
          font-weight: bold; cursor: pointer; transition: 0.3s;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
        }
        .btn-fancy:hover { transform: translateY(-2px); filter: brightness(1.1); }

        .table-wrapper {
          max-height: 480px; overflow-y: auto; border-radius: 12px;
          border: 1px solid #eee; box-shadow: 0 10px 25px rgba(0,0,0,0.05); background: white;
        }

        table { width: 100%; border-collapse: collapse; text-align: left; cursor: pointer; }
        th { position: sticky; top: 0; background: #2d3436; color: white; padding: 16px; z-index: 5; }
        td { padding: 14px 16px; border-bottom: 1px solid #f1f1f1; color: #444; }
        tbody tr:nth-child(even) { background-color: #f9fbfd; }
        tbody tr:hover { background-color: #edf2f7; }

        .pagination-bar {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 20px; padding: 15px; background: #fff; border-radius: 12px; border: 1px solid #eee;
        }

        .btn-page {
          padding: 8px 16px; border: 1px solid #dee2e6; background: white;
          border-radius: 6px; cursor: pointer; font-weight: 500;
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Modal Styles */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white; padding: 30px; border-radius: 20px; width: 450px; position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: slideUp 0.3s ease;
        }
        .form-group { margin-bottom: 18px; text-align: left; }
        .form-group label { display: block; font-weight: bold; color: #2d3436; margin-bottom: 8px; font-size: 13px; }
        .form-group input { width: 100%; padding: 12px; border: 2px solid #f0f0f0; border-radius: 10px; outline: none; }
        .modal-footer { display: flex; justify-content: flex-end; margin-top: 25px; }
        .btn-cancel { padding: 12px 30px; border-radius: 10px; border: none; background: #0984e3; color: white; font-weight: bold; cursor: pointer; }
        
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      <div className="controls-header">
        <h2 style={{ margin: 0 }}>User Management</h2>

        <div>
          <span
            style={{
              marginRight: "10px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Rows per page:
          </span>
          <select
            style={{ padding: "8px", borderRadius: "8px" }}
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
        {isLoading ? (
          <div style={{ padding: "50px", textAlign: "center" }}>
            Loading users...
          </div>
        ) : isError ? (
          <div style={{ padding: "50px", textAlign: "center", color: "red" }}>
            Error loading data.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody style={{ opacity: isPlaceholderData ? 0.5 : 1 }}>
              {data?.users.map((u) => (
                <tr key={u.id} onClick={() => setSelectedUser(u)}>
                  <td>
                    <b>#{u.id}</b>
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination-bar">
        <div style={{ fontSize: "14px", color: "#666" }}>
          Page <b>{page}</b> of <b>{data?.pages || 1}</b>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn-page"
            disabled={page <= 1}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
          >
            Previous
          </button>
          <button
            className="btn-page"
            disabled={page >= (data?.pages || 1)}
            onClick={() => setPage((old) => old + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Information</h2>
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
