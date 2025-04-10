"use client";

import TransactionList from "@/components/transaction/TransactionList";

export default function Transactions() {
  return (
    <>
      <div className="container mx-auto p-4">
        <TransactionList />
      </div>
    </>
  );
}
