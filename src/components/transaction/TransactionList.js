"use client";

import useTransaction from "@/hook/useTransaction";
import React, { useEffect } from "react";

const TransactionList = () => {
  const { transactions, isLoadingTransaction, fetchTransaction } =
    useTransaction();

  useEffect(() => {
    fetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        All Transactions
      </h2>

      {isLoadingTransaction ? (
        <p className="text-gray-500">Loading transactions...</p>
      ) : transactions?.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <ul className="space-y-4  overflow-y-auto pr-2">
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
  );
};

export default TransactionList;
