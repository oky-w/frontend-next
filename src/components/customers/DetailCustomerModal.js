import React from "react";

const DetailCustomerModal = ({ customer, onClose }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-xl mb-4">Customer Details</h2>
        <p>
          <strong>FullName:</strong> {customer?.full_name}
        </p>
        <p>
          <strong>Date of Birth:</strong> {customer?.date_of_birth}
        </p>
        <p>
          <strong>Address:</strong> {customer?.address}
        </p>
        <p>
          <strong>UserID</strong> {customer?.user_id}
        </p>
        <br />
        <p>
          <strong>Username:</strong> {customer?.user?.username}
        </p>
        <p>
          <strong>Email:</strong> {customer?.user?.email}
        </p>
        <p>
          <strong>Role:</strong> {customer?.user?.role}
        </p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCustomerModal;
