import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import { PageWrapper } from "./AnimatedRoutes";

const SolvedReveal: React.FC = () => {
  const navigate = useNavigate();

  const fullText =
    "Looking at this picture, I hope you can feel your grandma’s encouraging words again — that quiet strength reminding you that you’ve truly made it. She would be so proud of everything you’ve become.";

  return (
    <PageWrapper>
      <div style={{ textAlign: "center", padding: "20px" }}>
        {/* Inline CSS keyframes */}
        <style>
          {`
          @keyframes fadeInImage {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
        </style>

        {/* Fading image */}
        <img
          src={`${import.meta.env.BASE_URL}puzzle.jpeg`}
          alt="Solved"
          style={{
            width: "80%",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            opacity: 0,
            animation: "fadeInImage 3s ease-in forwards",
          }}
        />

        {/* Typewriter text */}
        <p
          style={{
            fontFamily: "'Roboto Mono', monospace",
            color: "#94A3B8",
            width: "90%",
            fontSize: "14px",
            marginTop: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          {fullText}
        </p>

        <CustomButton
          onClick={() => navigate("/gift/3/received")}
          style={{ marginTop: "20px" }}
        >
          Open gift
        </CustomButton>
      </div>
    </PageWrapper>
  );
};

export default SolvedReveal;
