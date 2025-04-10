"use client";

import { useState } from "react";

const TransactionForm = ({ onSubmit, fromAccountNumber }) => {
  const [toAccountNumber, setToAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("transfer");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      from_account_number: fromAccountNumber,
      to_account_number:
        transactionType === "transfer" ? toAccountNumber : undefined,
      amount: parseFloat(amount),
      transaction_type: transactionType,
    };

    onSubmit(payload);

    // Reset form
    setToAccountNumber("");
    setAmount("");
    setTransactionType("transfer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Transaction Type</label>
        <select
          className="select select-bordered w-full"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="transfer">Transfer</option>
          <option value="withdraw">Withdraw</option>
        </select>
      </div>

      {transactionType === "transfer" && (
        <div>
          <label className="block mb-1">To Account Number</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={toAccountNumber}
            onChange={(e) => setToAccountNumber(e.target.value)}
            required
          />
        </div>
      )}

      <div>
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          className="input input-bordered w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min={10000}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Submit Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
