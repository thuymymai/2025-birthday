import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { markGiftAsOpened } from "./utils";

const size = 4;
const totalPieces = size * size;

const JigsawPuzzle: React.FC = () => {
  const navigate = useNavigate();
  const [pieces, setPieces] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}puzzle.jpeg`;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, []);

  useEffect(() => {
    const shuffled = Array.from({ length: totalPieces }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
    setPieces(shuffled);
  }, []);

  const handleTap = (index: number) => {
    if (selected === null) {
      setSelected(index);
    } else {
      const newPieces = [...pieces];
      [newPieces[selected], newPieces[index]] = [
        newPieces[index],
        newPieces[selected],
      ];
      setPieces(newPieces);
      setSelected(null);
    }
  };

  useEffect(() => {
    const isSolved = pieces.every((p, i) => p === i);

    if (isSolved && pieces.length > 0) {
      markGiftAsOpened(3);
      const timeout = setTimeout(() => {
        navigate("/gift/3/reveal");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [pieces]);

  if (!imageSize) return <p>Loading...</p>;

  const aspectRatio = imageSize.width / imageSize.height;

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
      <>
        <span
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "30px",
            color: "#4A76A8",
            textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          Puzzle Game
        </span>
        <span
          style={{
            fontFamily: "'Roboto Mono', monospace",
            color: "#94A3B8",
            width: "95%",
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          Tap a piece, then tap another spot to swap them. If the piece is not
          blurred, it’s in the right spot 🧩
        </span>

        {/* Puzzle grid */}
        <div
          style={{
            position: "relative",
            width: "80%",
            margin: "0 auto",
            aspectRatio: `${aspectRatio}`,
          }}
        >
          <style></style>
          {/* Puzzle pieces */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              gridTemplateRows: `repeat(${size}, 1fr)`,
              gap: "2px",
              width: "100%",
              height: "100%",
            }}
          >
            {pieces.map((piece, index) => {
              const col = piece % size;
              const row = Math.floor(piece / size);

              return (
                <div
                  key={index}
                  onClick={() => handleTap(index)}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${
                      import.meta.env.BASE_URL
                    }puzzle.jpeg)`,
                    backgroundSize: `${size * 100}% ${size * 100}%`,
                    backgroundPosition: `${(col / (size - 1)) * 100}% ${
                      (row / (size - 1)) * 100
                    }%`,
                    border:
                      selected === index
                        ? "3px solid #ff4081"
                        : "1px solid #aaa",
                    borderRadius: "4px",
                    cursor: "pointer",
                    filter: piece === index ? "none" : "blur(6px)",
                    transition: "filter 0.3s ease",
                  }}
                />
              );
            })}
          </div>
        </div>
      </>
    </div>
  );
};

export default JigsawPuzzle;
