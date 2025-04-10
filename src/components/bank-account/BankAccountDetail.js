"use client";
import React from "react";

const BankAccountDetail = ({ account, onClose }) => {
  if (!account) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-md border border-base-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Bank Account Detail</h2>
          <button className="btn btn-sm btn-error" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Account Name:</span> {account.id}
          </p>
          <p>
            <span className="font-semibold">Account Number:</span>{" "}
            {account.account_number}
          </p>
          <p>
            <span className="font-semibold">Balance:</span> {account.balance}
          </p>
          <p>
            <span className="font-semibold">Account Type:</span>{" "}
            {account.account_type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankAccountDetail;
