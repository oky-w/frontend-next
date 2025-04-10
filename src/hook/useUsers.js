import { useState } from "react";
import useError from "@/hook/useError";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { error, isVisible, showError, hideError } = useError();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const result = await response.json();
      setUsers(result?.data || []);
      hideError();
    } catch (err) {
      showError(err?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      const result = await response.json();

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      hideError();
    } catch (err) {
      showError(err?.message || "Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (updatedUser) => {
    const { id, username, email } = updatedUser;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, username, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit user.");
      }

      const result = await response.json();

      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          return { ...user, username, email };
        }
        return user;
      });

      setUsers(updatedUsers);

      hideError();
    } catch (err) {
      showError(err?.message || "Failed to edit user.");
    } finally {
      setIsLoading(false);
    }
  };

  const detailUser = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("User not found");
      }

      const result = await response.json();
      const { data } = result;

      setUserDetails(data || {});
      hideError();
    } catch (err) {
      showError(err?.message || "Failed to fetch user details.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    isLoading,
    error,
    isVisible,
    deleteUser,
    editUser,
    detailUser,
    showError,
    hideError,
    userDetails,
    setUserDetails,
    setUsers,
    fetchUsers,
  };
};

export default useUsers;
