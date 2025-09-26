import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";

const GiftBoxesPage: React.FC = () => {
  const navigate = useNavigate();

  const [opened, setOpened] = useState<{ [key: number]: boolean }>(() => {
    const saved = localStorage.getItem("openedGifts");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("openedGifts", JSON.stringify(opened));
  }, [opened]);

  const handleClick = (id: number) => {
    if (opened[id]) {
      navigate(`/gift/${id}/received`);
    } else {
      navigate(`/gift/${id}/puzzle`);
    }
  };

  const handleReset = () => {
    setOpened({});
    localStorage.removeItem("openedGifts");
  };

  // Check if all gifts are opened
  const allReceived = [1, 2, 3].every((id) => opened[id]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/2.png') center/cover no-repeat",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          marginBottom: "20px",
          fontFamily: "'Dancing Script', cursive",
          fontSize: "30px",
          color: "#4A76A8",
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          userSelect: "none",
        }}
      >
        Choose a gift
      </div>
      <span
        style={{
          fontFamily: "'Roboto Mono', monospace",
          color: "#94A3B8",
          width: "80%",
          fontSize: "14px",
        }}
      >
        Open your gift from top to bottom**
      </span>

      {/* Gift boxes */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            style={{
              position: "relative",
              width: "250px",
              height: "180px",
              cursor: "pointer",
            }}
            onClick={() => handleClick(id)}
          >
            <img
              src={`/gift_closed.webp`}
              alt={`Gift ${id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: opened[id] ? "blur(1px) brightness(0.7)" : "none",
                transition: "all 0.3s ease",
              }}
            />

            {/* Banner overlay if solved */}
            {opened[id] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-10deg)",
                  backgroundColor: "rgba(74, 118, 168, 0.9)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "18px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                }}
              >
                Received
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reset button only if all gifts received */}
      {allReceived && (
        <button
          onClick={handleReset}
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            padding: "10px 15px",
            background: "#dbe4ef",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          🔄
        </button>
      )}
    </div>
  );
};

export default GiftBoxesPage;
