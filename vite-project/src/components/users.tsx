import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./Users.scss"; // Import file scss

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

  const { data, isLoading, isError, isPlaceholderData, refetch } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => fetchUsers(page, pageSize),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  const closeModal = () => setSelectedUser(null);

  return (
    <div className="users-page-container">
      <div className="controls-header">
        <button
          className="btn-fancy"
          onClick={() => refetch()}
          disabled={isLoading}
        >
          {isLoading ? "⌛ FETCHING..." : "🚀 REFRESH USERS"}
        </button>

        <div className="size-selector-group">
          <span>ROWS PER PAGE:</span>
          <div className="select-wrapper">
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
