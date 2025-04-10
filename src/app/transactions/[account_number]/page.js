"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import TransactionForm from "@/components/transaction/TransactionForm";
import useTransaction from "@/hook/useTransaction";

export default function TransactionDetail() {
  const { account_number } = useParams();
  const {
    transactions,
    isLoadingTransaction,
    fetchTransactionByAccountId,
    submitTransaction,
    message,
  } = useTransaction();

  useEffect(() => {
    if (account_number) {
      fetchTransactionByAccountId(account_number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account_number]);

  const handleSubmit = (payload) => {
    submitTransaction(payload, account_number);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-primary">
        Make a Transaction
      </h1>

      {message && (
        <div
          className={`p-4 rounded-md mb-6 text-sm font-medium ${
            message.includes("success")
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message}
        </div>
      )}

      <div className="shadow-md rounded-lg p-6 mb-10">
        <TransactionForm
          fromAccountNumber={account_number}
          onSubmit={handleSubmit}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Transaction History
        </h2>

        {isLoadingTransaction ? (
          <p className="text-gray-500">Loading transactions...</p>
        ) : transactions?.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {transactions.map((tx) => (
              <li
                key={tx.id}
                className="bg-base-200 border rounded-md p-4 shadow-sm"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <span>
                    <strong>From:</strong> {tx.from_account_number}
                  </span>
                  <span>
                    <strong>To:</strong> {tx.to_account_number}
                  </span>
                  <span>
                    <strong>Amount:</strong> ${tx.amount.toLocaleString()}
                  </span>
                  <span>
                    <strong>Type:</strong> {tx.transaction_type}
                  </span>
                  <span className="col-span-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-medium ${
                        tx.status === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
