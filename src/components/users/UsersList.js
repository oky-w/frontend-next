import { motion } from "framer-motion";
import Alert from "@/components/Alert";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";

function UsersList({
  users,
  isLoading,
  error,
  isVisible,
  hideError,
  onEdit,
  onDelete,
  onDetail,
  props,
}) {
  if (isLoading) {
    return <Loading text="Loading users..." />;
  }

  if (error && isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={() => hideError()}
      >
        <Alert message={error} type="error" />
      </motion.div>
    );
  }

  if (users.length === 0) {
    return (
      <NotFound
        message="No users found"
        details="There are no users available at the moment. Please check back later."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table table-zebra w-full shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="text-lg font-medium">Username</th>
            <th className="text-lg font-medium">Email</th>
            <th className="text-lg font-medium">Role</th>
            <th className="text-lg font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user?.id}>
              <td className="text-base">{user?.username}</td>
              <td className="text-base">{user?.email}</td>
              <td className="text-base">
                {user?.role === "admin" ? (
                  <span className="badge badge-soft badge-primary">Admin</span>
                ) : (
                  <span className="badge badge-soft badge-secondary">User</span>
                )}
              </td>
              <td>
                <button
                  onClick={() => onDetail(user?.id)}
                  className="btn btn-soft btn-sm btn-success mr-2"
                >
                  Details
                </button>
                <button
                  onClick={() => onEdit(user?.id)}
                  className="btn btn-soft btn-sm btn-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user?.id)}
                  className="btn btn-soft btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
