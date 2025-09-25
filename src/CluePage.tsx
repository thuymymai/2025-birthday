import { useState } from "react";
import { useParams } from "react-router-dom";
import BackgroundLayout from "./BackgroundLayout";
import confetti from "canvas-confetti";

// ---- Data ----
type Clue = {
  id: number;
  question: string;
  answer: string;
  hint?: string;
  type?: "text" | "date";
};

const clues: Clue[] = [
  {
    id: 1,
    question: "Do you remember when we first met?",
    answer: "2023-05-11", // format: YYYY-MM-DD
    type: "date",
  },
  { id: 2, question: "What’s 5 + 7?", answer: "12" },
  { id: 3, question: "Find the note under the sofa 🛋️", answer: "SOFA" },
];

// ---- Clue Page ----
const CluePage: React.FC = () => {
  const { id } = useParams();
  const clueId = Number(id);
  const clue = clues.find((c) => c.id === clueId);
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(
    localStorage.getItem(`clue-${clueId}`) === "true"
  );

  if (!clue) return <p>Clue not found</p>;

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === clue.answer.toUpperCase()) {
      localStorage.setItem(`clue-${clueId}`, "true");
      setSolved(true);
      confetti();
      alert("🎉 Correct! Scan the next QR to continue!");
    } else {
      alert("❌ Try again!");
    }
  };

  return (
    <BackgroundLayout>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "36px",
            fontWeight: 600,
            marginBottom: "16px",
            color: "#4A76A8",
            textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          Clue {clue.id}
        </h1>

        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "24px",
            marginBottom: "24px",
            color: "#333",
          }}
        >
          {clue.question}
        </p>

        {!solved ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              type={clue.type === "date" ? "date" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={clue.type === "date" ? "" : "Type your answer..."}
              style={{
                border: "2px solid #4A76A8",
                padding: "10px 14px",
                borderRadius: "8px",
                outline: "none",
                fontSize: "16px",
                fontFamily: "inherit",
                marginRight: "8px",
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#4A76A8",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 600,
                transition: "background 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b5e85")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#4A76A8")
              }
            >
              Submit
            </button>
          </div>
        ) : (
          <p
            style={{
              color: "green",
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            ✅ Solved!
          </p>
        )}
      </div>
    </BackgroundLayout>
  );
};

export default CluePage;
