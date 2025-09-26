import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GiftVideo from "./GiftVideo";
import CustomButton from "./Button";

const GiftReceivedPage: React.FC = () => {
  const { id } = useParams();
  const giftId = Number(id);
  const navigate = useNavigate();

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
        gap: "20px",
      }}
    >
      <h2
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "30px",
          color: "#4A76A8", // 🎨 matches your gift box color
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)", // subtle shadow for readability
        }}
      >
        Happy Birthday #{giftId}
      </h2>
      {giftId === 1 && (
        <>
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              color: "#94A3B8",
              width: "90%",
              fontSize: "16px",
            }}
          >
            Treat yourself with some new skincare ✨
          </span>
          <a
            href="/giftcard.jpg"
            download="giftcard.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/giftcard.jpg"
              alt="Gift card"
              style={{
                width: "90%",
                cursor: "pointer",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
          </a>
        </>
      )}
      {giftId === 2 && (
        <>
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              color: "#333",
              width: "90%",
            }}
          >
            You are invited to go on a date with me on{" "}
            <strong>04/11/2025</strong> for{" "}
            <strong>
              {" "}
              "The Chorus of the Finnish National Opera 80 years anniversary
              concert"
            </strong>
          </span>
          <a
            href="/concertTickets.jpg"
            download="concertTickets.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/concertTickets.jpg"
              alt="Concert Ticket"
              style={{
                width: "50%",
                cursor: "pointer",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
          </a>
        </>
      )}
      {giftId === 3 && <GiftVideo />}
      <br />
      <CustomButton onClick={() => navigate("/gifts")} style={{ marginTop: "20px" }}>
        See other gifts
      </CustomButton>
    </div>
  );
};

export default GiftReceivedPage;
