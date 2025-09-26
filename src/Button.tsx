import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};

const CustomButton: React.FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#A4BCD7",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 18px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
        transition: "all 0.2s ease-in-out",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
