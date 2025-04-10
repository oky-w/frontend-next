"use client";

import { useState, useCallback } from "react";
import useError from "@/hook/useError";

const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
  const [message, setMessage] = useState("");

  const { error, isVisible, showError, hideError } = useError();

  const fetchTransactionByAccountId = useCallback(
    async (accountNumber) => {
      setIsLoadingTransaction(true);
      try {
        const res = await fetch(`/api/transaction/account/${accountNumber}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const result = await res.json();
        setTransactions(result?.data || []);
        hideError();
      } catch (err) {
        showError(err.message || "Something went wrong.");
      } finally {
        setIsLoadingTransaction(false);
      }
    },
    [hideError, showError]
  );

  const submitTransaction = useCallback(
    async (payload, accountNumber) => {
      try {
        const res = await fetch("/api/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to process transaction");

        setMessage("Transaction successful");
        await fetchTransactionByAccountId(accountNumber);
      } catch (err) {
        setMessage("Transaction failed: " + err.message);
      }

      setTimeout(() => setMessage(""), 3000);
    },
    [fetchTransactionByAccountId]
  );

  const fetchTransaction = useCallback(async () => {
    setIsLoadingTransaction(true);
    try {
      const res = await fetch("/api/transaction", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const result = await res.json();
      setTransactions(result?.data || []);
      hideError();
    } catch (err) {
      showError(err.message || "Something went wrong.");
    } finally {
      setIsLoadingTransaction(false);
    }
  }, [hideError, showError]);

  return {
    transactions,
    isLoadingTransaction,
    fetchTransactionByAccountId,
    submitTransaction,
    fetchTransaction,
    message,
    error,
    isVisible,
    hideError,
  };
};

export default useTransaction;
