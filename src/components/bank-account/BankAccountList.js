import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import Alert from "@/components/Alert";
import NotFound from "@/components/NotFound";
import BankCard from "@/components/BankCard";

function BankAccountList({
  name,
  bankAccount,
  isLoading,
  error,
  isVisible,
  hideError,
  // onEdit,
  // onDelete,
  onDetail,
  viewTransactions,
}) {
  if (isLoading) {
    return <Loading text="Loading Bank Account..." />;
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

  if (bankAccount.length === 0) {
    return (
      <NotFound
        message="No bank Account found."
        details="There are no bankAccount to display. Please create a customer."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
        {bankAccount?.map((account) => (
          <BankCard
            key={account?.id}
            accountName={name}
            accountType={account?.account_type}
            accountNumber={account?.account_number}
            balance={account?.balance}
            onClick={() => onDetail(account)}
            viewTransactions={() => viewTransactions(account)}
          />
        ))}
      </div>
    </div>
  );
}

export default BankAccountList;
