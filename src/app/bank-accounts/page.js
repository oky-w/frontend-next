"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/useAuthStore";
import useBankAccount from "@/hook/useBankAccount";
import BankAccountList from "@/components/bank-account/BankAccountList";
import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";

export default function BankAccounts() {
  const { user } = useAuth();
  const id = user?.id;
  const router = useRouter();

  const {
    bankAccount,
    isLoading,
    isVisible,
    hideError,
    error,
    fetchBankAccount,
  } = useBankAccount();

  useEffect(() => {
    if (id) fetchBankAccount(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleViewTransactions = async (account) => {
    router.push(`/transactions/${account.account_number}`);
  };

  const renderBankAccounts = (type, label) => (
    <>
      <Divider text={label} />
      <BankAccountList
        bankAccount={bankAccount.filter(
          (acc) => acc.account_type === type && acc.user_id === id
        )}
        name={user?.username}
        isLoading={isLoading}
        error={error}
        isVisible={isVisible}
        hideError={hideError}
        onDetail={() => {}}
        viewTransactions={handleViewTransactions}
      />
    </>
  );

  return (
    <>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Bank Accounts</h1>
        {renderBankAccounts("rekening-utama", "Bank Account")}
        {renderBankAccounts("saku", "Saku Account")}
        {renderBankAccounts("deposito", "Deposito Account")}
      </div>
    </>
  );
}
