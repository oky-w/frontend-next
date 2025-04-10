"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EditUserModal = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="text-xl mb-4">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username || ""} // Ensure value is always a string
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""} // Ensure value is always a string
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditUserModal;
