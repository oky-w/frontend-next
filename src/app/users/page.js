"use client";

import UsersList from "@/components/users/UsersList";
import useUsers from "@/hook/useUsers";
import EditUserModal from "@/components/users/EditUserModal";
import { useEffect, useState } from "react";
import DetailUserModal from "@/components/users/DetailUserModal";

export default function UsersPage() {
  const {
    users,
    isLoading,
    error,
    isVisible,
    hideError,
    deleteUser,
    editUser,
    detailUser,
    userDetails,
    fetchUsers,
  } = useUsers();

  const [editingUser, setEditingUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = async (userId) => {
    await detailUser(userId);
    setShowDetails(true);
  };

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.id === userId);

    setEditingUser(user);
  };

  const handleSaveUser = async (updatedUser) => {
    updatedUser.id = editingUser.id;
    await editUser(updatedUser);
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <p className="mb-4">
          This is a list of all users fetched from the backend API.
        </p>

        <UsersList
          users={users}
          isLoading={isLoading}
          error={error}
          isVisible={isVisible}
          hideError={hideError}
          onEdit={handleEditUser}
          onDelete={deleteUser}
          onDetail={handleViewDetails}
        />

        {userDetails && showDetails && (
          <DetailUserModal
            user={userDetails}
            onClick={() => setShowDetails(false)}
          />
        )}

        <EditUserModal
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
        />
      </div>
    </>
  );
}
