import React from "react";

interface Props {
  onClick: () => void;
}

const FloatingActionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        backgroundColor: "#6200ea",
        color: "#fff",
        fontSize: "24px",
      }}
      onClick={onClick}
    >
      +
    </button>
  );
};

export default FloatingActionButton;
