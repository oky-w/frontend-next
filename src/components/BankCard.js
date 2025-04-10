import React, { useState } from "react";

const BankCard = ({
  accountName,
  accountType,
  accountNumber,
  balance,
  onClick,
  viewTransactions,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
    if (onClick) onClick();
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{accountName}</h2>

        <p className="text-sm text-primary">
          Account Type: {isVisible ? accountType : "••••••••••••"}
        </p>

        <p className="text-sm text-amber-600">
          Account Number: {isVisible ? accountNumber : "••••••••••••"}
        </p>

        <div className="flex justify-between items-center mt-6">
          <span className="text-md font-medium text-base-content">Balance</span>
          <span className="text-2xl font-bold text-success">
            {isVisible ? balance : "$•••••"}
          </span>
        </div>

        <div className="card-actions justify-between mt-6">
          <button className="btn btn-accent btn-sm" onClick={handleToggle}>
            {isVisible ? "Hide Details" : "Show Details"}
          </button>
          <button className="btn btn-accent btn-sm" onClick={viewTransactions}>
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
