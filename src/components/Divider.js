import React from "react";

const Divider = ({ text }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="divider divider-primary">{text || "Divider"}</div>
    </div>
  );
};

export default Divider;
