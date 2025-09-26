import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";

const SolvedReveal: React.FC = () => {
  const navigate = useNavigate();

  const fullText =
    "Looking at this picture, I hope you can feel your grandma’s encouraging words again — that quiet strength reminding you that you’ve truly made it. She would be so proud of everything you’ve become.";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `url(${
          import.meta.env.BASE_URL
        }2.png) center/cover no-repeat`,
        textAlign: "center",
        gap: "10px",
        paddingTop: "20px",
      }}
    >
      {" "}
      <style>
        {`
          @keyframes fadeInImage {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <img
        src={`${import.meta.env.BASE_URL}puzzle.jpeg`}
        alt="Solved"
        style={{
          width: "75%",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          opacity: 0,
          animation: "fadeInImage 3s ease-in forwards",
        }}
      />
      <p
        style={{
          fontFamily: "'Roboto Mono', monospace",
          color: "#94A3B8",
          width: "90%",
          fontSize: "14px",
          whiteSpace: "pre-wrap",
        }}
      >
        {fullText}
      </p>
      <CustomButton onClick={() => navigate("/gift/3/received")}>
        Open gift
      </CustomButton>
    </div>
  );
};

export default SolvedReveal;
