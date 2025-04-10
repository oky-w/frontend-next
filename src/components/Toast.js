import React from "react";

const Toast = ({ message, type, onClick }) => {
  let typeClass = "";

  switch (type) {
    case "success":
      typeClass = "alert-success";
      break;
    case "error":
      typeClass = "alert-error";
      break;
    case "info":
      typeClass = "alert-info";
      break;
    case "warning":
      typeClass = "alert-warning";
      break;
    default:
      typeClass = "alert-info";
  }

  return (
    <div className="toast toast-top toast-end" onClick={onClick}>
      <div className={`alert ${typeClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
