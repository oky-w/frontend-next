import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import Alert from "@/components/Alert";
import NotFound from "@/components/NotFound";

function CustomersList({
  customers,
  isLoading,
  error,
  isVisible,
  hideError,
  // onEdit,
  // onDelete,
  onDetail,
}) {
  if (isLoading) {
    return <Loading text="Loading customers..." />;
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

  if (customers.length === 0) {
    return (
      <NotFound
        message="No customers found."
        details="There are no customers to display. Please create a customer."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table table-zebra w-full shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="text-lg font-medium">UserID</th>
            <th className="text-lg font-medium">Fullname</th>
            <th className="text-lg font-medium">Date of Birth</th>
            <th className="text-lg font-medium">Address</th>
            <th className="text-lg font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr key={customer?.id}>
              <td className="text-base">{customer?.user_id}</td>
              <td className="text-base">{customer?.full_name}</td>
              <td className="text-base">{customer?.date_of_birth}</td>
              <td className="text-base">{customer?.address}</td>
              <td>
                <button
                  onClick={() => onDetail(customer?.id)}
                  className="btn btn-soft btn-sm btn-success mr-2"
                >
                  Details
                </button>
                {/* <button
                  onClick={() => onEdit(customer?.id)}
                  className="btn btn-soft btn-sm btn-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(customer?.id)}
                  className="btn btn-soft btn-sm btn-error"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersList;
