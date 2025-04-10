import { useState } from "react";
import useError from "@/hook/useError";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error, isVisible, showError, hideError } = useError();
  const [customerDetails, setCustomerDetails] = useState(null);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/customers", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers.");
      }

      const result = await response.json();

      setCustomers(result?.data || []);
      hideError();
      setIsLoading(false);
    } catch (err) {
      showError(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const detailCustomer = async (customerId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Customer not found");
      }

      const result = await response.json();
      const { data } = result;

      setCustomerDetails(data || {});
      hideError();
    } catch (err) {
      showError(err?.message || "Failed to fetch customer details.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    customers,
    isLoading,
    error,
    isVisible,
    hideError,
    showError,
    customerDetails,
    fetchCustomers,
    detailCustomer,
  };
};

export default useCustomers;
