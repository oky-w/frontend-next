import React from "react";

const NotFound = ({ message, details }) => {
  return (
    <div className="text-center p-4">
      <div className="card bg-base-100 shadow-md max-w-xs mx-auto">
        <div className="card-body">
          <h2 className="card-title text-xl text-red-500">{message}</h2>
          <p className="text-base text-gray-500">{details}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
