import { useState } from "react";
import useError from "@/hook/useError";
import { useAuth } from "@/store/useAuthStore";

const useBankAccount = () => {
  const [bankAccount, setBankAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error, isVisible, showError, hideError } = useError();
  const [bankAccountDetails, setBankAccountDetails] = useState(null);

  const fetchBankAccount = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bank-account/userid/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers.");
      }

      const result = await response.json();

      setBankAccount(result?.data || []);
      hideError();
      setIsLoading(false);
    } catch (err) {
      showError(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const detailBankAccount = async (bankAccountId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bank-account/${bankAccountId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Customer not found");
      }

      const result = await response.json();
      const { data } = result;

      setBankAccountDetails(data || {});
      hideError();
    } catch (err) {
      showError(err?.message || "Failed to fetch customer details.");
    } finally {
      setIsLoading(false);
    }
  };

  const detailByUserId = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bank-account/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Customer not found");
      }

      const result = await response.json();
      const { data } = result;

      setBankAccountDetails(data || {});
      hideError();
    } catch (err) {
      showError(err?.message || "Failed to fetch customer details.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bankAccount,
    isLoading,
    error,
    isVisible,
    hideError,
    showError,
    bankAccountDetails,
    fetchBankAccount,
    detailBankAccount,
    detailByUserId,
  };
};

export default useBankAccount;
