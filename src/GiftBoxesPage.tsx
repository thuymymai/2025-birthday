import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        background: `url(${
          import.meta.env.BASE_URL
        }2.png) center/cover no-repeat`,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "30px",
          color: "#4A76A8",
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          marginBottom: "20px",
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
              src={`${import.meta.env.BASE_URL}gift_closed.webp`}
              alt={`Gift ${id}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: opened[id] ? "blur(1px) brightness(0.7)" : "none",
                transition: "all 0.3s ease",
              }}
            />

            {opened[id] && (
              <div
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-5deg)",
                  background:
                    "repeating-linear-gradient(45deg, #a4bcd7, #a4bcd7 12px, #94aac7 12px, #94aac7 24px)",
                  color: "white",
                  padding: "5px 30px",
                  fontWeight: "bold",
                  fontSize: "22px",
                  textAlign: "center",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  boxShadow: "4px 4px 12px rgba(0,0,0,0.3)",
                  border: "2px dashed rgba(255,255,255,0.6)",
                  clipPath:
                    "polygon(5% 0%, 95% 0%, 100% 20%, 95% 40%, 100% 60%, 95% 80%, 100% 100%, 5% 100%, 0% 80%, 5% 60%, 0% 40%, 5% 20%)",
                }}
              >
                Yours
              </div>
            )}
          </div>
        ))}
      </div>

      {allReceived && (
        <button
          onClick={handleReset}
          style={{
            position: "fixed",
            bottom: "65px",
            right: "10px",
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
