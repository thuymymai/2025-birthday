// src/pages/JigsawPuzzle.tsx
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { markGiftAsOpened } from "./utils";
import { useNavigate } from "react-router-dom";

const size = 4; // ⬅️ Change to 5 for 25 pieces
const pieceSize = 80; // pixels per tile (smaller for more pieces)
const totalPieces = size * size;

const JigsawPuzzle: React.FC = () => {
  const navigate = useNavigate();

  const [pieces, setPieces] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    // Shuffle on load
    const shuffled = Array.from({ length: totalPieces }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
    setPieces(shuffled);
  }, []);

  const handleTap = (index: number) => {
    if (selected === null) {
      setSelected(index);
    } else {
      // swap positions
      const newPieces = [...pieces];
      [newPieces[selected], newPieces[index]] = [
        newPieces[index],
        newPieces[selected],
      ];
      setPieces(newPieces);
      setSelected(null);
    }
  };

  const solved = pieces.every((p, i) => p === i);

  useEffect(() => {
    if (solved && pieces.length > 0) {
      confetti({ particleCount: 250, spread: 70 });
      markGiftAsOpened(3); // 🎁 mark Gift 3 solved
    }
  }, [solved, pieces]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🧩 Jigsaw Puzzle</h2>

      {/* Puzzle grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, ${pieceSize}px)`,
          gridTemplateRows: `repeat(${size}, ${pieceSize}px)`,
          gap: "2px",
          justifyContent: "center",
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={index}
            onClick={() => handleTap(index)}
            style={{
              width: pieceSize,
              height: pieceSize,
              backgroundImage: "url('/puzzle.jpeg')", // replace with your gift image
              backgroundSize: `${size * pieceSize}px ${size * pieceSize}px`,
              backgroundPosition: `${-(piece % size) * pieceSize}px ${
                -Math.floor(piece / size) * pieceSize
              }px`,
              border:
                selected === index ? "3px solid #ff4081" : "1px solid #aaa",
              borderRadius: "4px",
              cursor: "pointer",
              filter: piece === index ? "none" : "blur(6px)", // 🔥 blur until correct
              transition: "filter 0.3s ease",
            }}
          />
        ))}
      </div>

      {solved && (
        <div>
          <h3 style={{ marginTop: "20px" }}>
            🎉 You solved it! Happy Birthday 💖
          </h3>
          <button
            onClick={() => navigate("/gift/3/received")}
            style={{ marginTop: "20px" }}
          >
            Reveal the Gift
          </button>
        </div>
      )}
    </div>
  );
};

export default JigsawPuzzle;
