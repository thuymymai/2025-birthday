import React from "react";

type ModalProps = {
  show: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, children }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "80%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        alignSelf: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "90%",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
