"use client";

import { useState } from "react";
import CustomersList from "@/components/customers/CustomersList";
import DetailCustomerModal from "@/components/customers/DetailCustomerModal";
import useCustomers from "@/hook/useCustomers";
import { useEffect } from "react";

export default function Customers() {
  const {
    customers,
    isLoading,
    isVisible,
    hideError,
    error,
    customerDetails,
    detailCustomer,
    fetchCustomers,
  } = useCustomers();

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewDetails = async (customerId) => {
    await detailCustomer(customerId);
    setShowDetails(true);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Customers List</h1>
        <p className="mb-4">This is a list of customers and their details.</p>

        <CustomersList
          customers={customers}
          isLoading={isLoading}
          error={error}
          isVisible={isVisible}
          hideError={hideError}
          onDetail={handleViewDetails}
        />

        {customerDetails && showDetails && (
          <DetailCustomerModal
            customer={customerDetails}
            onClose={() => setShowDetails(false)}
          />
        )}
      </div>
    </>
  );
}
