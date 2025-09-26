import React from "react";

type Props = {
  children: React.ReactNode;
};

const BackgroundLayout: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundLayout;
