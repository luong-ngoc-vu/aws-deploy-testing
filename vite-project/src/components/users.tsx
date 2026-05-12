import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./styles.scss";

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

  const { data, isLoading, isError, isFetching, isPlaceholderData, refetch } =
    useQuery({
      queryKey: ["users", page, pageSize],
      queryFn: () => fetchUsers(page, pageSize),
      placeholderData: keepPreviousData,
      staleTime: 5000,
    });

  const closeModal = () => setSelectedUser(null);
  const totalPages = data?.pages || 1;

  return (
    <div className="users-page-container">
      <div className="controls-header">
        <button
          className="btn-fancy"
          onClick={() => refetch()}
          disabled={isFetching}
          type="button"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-2.6-6.4" />
            <path d="M21 4v6h-6" />
          </svg>
          {isFetching ? "Syncing" : "Refresh users"}
        </button>

        <div className="size-selector-group">
          <span>Rows per page</span>
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

      <div className={`glow-progress ${isFetching ? "is-active" : ""}`}>
        <span></span>
      </div>

      <div className="table-wrapper">
        {isLoading ? (
          <div className="liquid-loader" role="status" aria-live="polite">
            <div className="liquid-orb">
              <span></span>
            </div>
            <p>Loading users</p>
          </div>
        ) : isError ? (
          <div className="state-message state-error">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 8v5" />
              <path d="M12 17h.01" />
              <path d="M10.3 4.3 2.8 17.3A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.7L13.7 4.3a2 2 0 0 0-3.4 0Z" />
            </svg>
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
            <tbody className={isPlaceholderData ? "is-muted" : ""}>
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
        <div className="page-status">
          Page <b>{page}</b> of <b>{totalPages}</b>
        </div>
        <div className="page-actions">
          <button
            className="btn-page"
            disabled={page <= 1}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            type="button"
            aria-label="Previous page"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous
          </button>
          <button
            className="btn-page"
            disabled={page >= totalPages}
            onClick={() => setPage((old) => old + 1)}
            type="button"
            aria-label="Next page"
          >
            Next
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <span className="user-avatar">{selectedUser.name.charAt(0)}</span>
              <div>
                <h2>Information</h2>
                <p>User profile snapshot</p>
              </div>
            </div>
            <div className="form-group">
              <label>ID</label>
              <input type="text" value={selectedUser.id} readOnly />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={selectedUser.name} readOnly />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" value={selectedUser.email} readOnly />
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal} type="button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
