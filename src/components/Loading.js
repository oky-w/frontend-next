import React from "react";

const Loading = ({ text }) => {
  return (
    <div className="text-center p-4">
      <span className="loading loading-dots loading-lg"></span>
      <p className="mt-4 text-lg">{text || "Loading..."}</p>
    </div>
  );
};

export default Loading;
