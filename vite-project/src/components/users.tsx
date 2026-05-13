import { Pagination } from "antd";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  type IUser,
  type UserApiError,
  type UserValidationErrors,
  useCreateUser,
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "../hooks/useUsers";
import "./styles.scss";

type ModalMode = "create" | "edit";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("edit");
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState<UserValidationErrors>({});
  const [deleteTarget, setDeleteTarget] = useState<IUser | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, isFetching, isPlaceholderData, refetch } =
    useGetUsers(page, pageSize);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const isSubmitting =
    createUser.isPending || updateUser.isPending || deleteUser.isPending;

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedUser(null);
    setFormValues({ name: "", email: "" });
    setFormErrors({});
  };

  const openEditModal = (user: IUser) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormValues({ name: user.name, email: user.email });
    setFormErrors({});
  };

  const closeModal = () => {
    setModalMode("edit");
    setSelectedUser(null);
    setFormErrors({});
    setFormValues({ name: "", email: "" });
  };

  const handleApiError = (error: UserApiError) => {
    if (error.errors) {
      setFormErrors(error.errors);
      return;
    }

    setFormErrors({ email: "Request failed. Please try again." });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({});

    try {
      if (modalMode === "create") {
        await createUser.mutateAsync(formValues);
        setSuccessMessage("Create user successfully.");
        setPage(1);
      } else if (selectedUser) {
        await updateUser.mutateAsync({
          id: selectedUser.id,
          payload: formValues,
        });
        setSuccessMessage("Update user successfully.");
      }

      closeModal();
    } catch (error) {
      handleApiError(error as UserApiError);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const shouldMoveToPreviousPage = page > 1 && data?.users.length === 1;

    await deleteUser.mutateAsync(deleteTarget.id);
    if (shouldMoveToPreviousPage) {
      setPage((currentPage) => Math.max(currentPage - 1, 1));
    }
    setDeleteTarget(null);
    setSuccessMessage("Delete user successfully.");
  };

  const totalRecords = data?.total || 0;
  const isUserModalOpen = modalMode === "create" || Boolean(selectedUser);

  return (
    <div className="users-page-container">
      <div className="controls-header">
        <div className="header-actions">
          <button className="btn-fancy" onClick={openCreateModal} type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Create user
          </button>
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
        </div>

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={isPlaceholderData ? "is-muted" : ""}>
              {data?.users.map((u) => (
                <tr key={u.id} onClick={() => openEditModal(u)}>
                  <td>
                    <b>#{u.id}</b>
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={(event) => {
                        event.stopPropagation();
                        setDeleteTarget(u);
                      }}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination-bar">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalRecords}
          showSizeChanger={false}
          showTotal={(total) => `Total ${total} records`}
          onChange={(nextPage) => setPage(nextPage)}
        />
      </div>

      {isUserModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <form
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <div className="modal-title">
              <span className="user-avatar">
                {(formValues.name || "U").charAt(0)}
              </span>
              <div>
                <h2>{modalMode === "create" ? "Create user" : "Update user"}</h2>
                <p>
                  {modalMode === "create"
                    ? "Add a new user profile"
                    : "Edit user name and email"}
                </p>
              </div>
            </div>
            {modalMode === "edit" && selectedUser && (
              <div className="form-group">
                <label>ID</label>
                <input type="text" value={selectedUser.id} readOnly />
              </div>
            )}
            <div className="form-group">
              <label>Name</label>
              <input
                className={formErrors.name ? "input-error" : ""}
                type="text"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
              {formErrors.name && (
                <span className="field-error">{formErrors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className={formErrors.email ? "input-error" : ""}
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
              {formErrors.email && (
                <span className="field-error">{formErrors.email}</span>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal} type="button">
                Cancel
              </button>
              <button className="btn-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div
            className="modal-content modal-compact"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">
              <span className="user-avatar">!</span>
              <div>
                <h2>Delete user</h2>
                <p>Are you sure you want to delete {deleteTarget.name}?</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                disabled={isSubmitting}
                onClick={handleDelete}
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="modal-overlay" onClick={() => setSuccessMessage("")}>
          <div
            className="modal-content modal-compact"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">
              <span className="user-avatar">OK</span>
              <div>
                <h2>Success</h2>
                <p>{successMessage}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-submit"
                onClick={() => setSuccessMessage("")}
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
