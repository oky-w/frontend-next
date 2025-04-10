import React from "react";

const DetailUserModal = ({ user, onClick }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl mb-4">User Details</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailUserModal;
