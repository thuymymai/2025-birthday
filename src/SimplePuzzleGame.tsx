import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { markGiftAsOpened } from "./utils";
import Modal from "./Modal";
import CustomButton from "./Button";

const GRID_ROWS = 4;
const GRID_COLS = 13;

const words = [
  {
    word: "HAPPY",
    row: 0,
    col: 3,
    direction: "across",
    crossAt: 0,
    clue: "I wish you a ____ birthday today!",
  },
  {
    word: "GRATEFUL",
    row: 1,
    col: 1,
    direction: "across",
    crossAt: 1,
    clue: "I'm ____ to have you in my life",
  },
  {
    word: "KIND",
    row: 2,
    col: 1,
    direction: "across",
    crossAt: 2,
    clue: "The trait of you I love the most: you care deeply and make others feel safe.",
  },
  {
    word: "HEARTFELT",
    row: 3,
    col: 3,
    direction: "across",
    crossAt: 0,
    clue: "I love that we always have ____ conversations with each other, it deeply heals me and I love to spend time with you.",
  },
];

const CrosswordHanh: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(""))
  );

  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null))
  );

  useEffect(() => {
    const first = words[0];
    inputRefs.current[first.row][first.col]?.focus();
  }, []);

  const handleChange = (row: number, col: number, value: string) => {
    const newGrid = grid.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? value.toUpperCase() : c))
    );
    setGrid(newGrid);

    const word = words.find(
      (w) => w.row === row && col >= w.col && col < w.col + w.word.length
    );
    if (word) {
      const nextIndex = col - word.col + 1;
      if (nextIndex < word.word.length) {
        const nextCol = word.col + nextIndex;
        inputRefs.current[row][nextCol]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    if (e.key === "Backspace" && !grid[row][col]) {
      let prevCol = col - 1;
      if (prevCol >= 0) {
        inputRefs.current[row][prevCol]?.focus();
        const newGrid = grid.map((r, ri) =>
          r.map((c, ci) => (ri === row && ci === prevCol ? "" : c))
        );
        setGrid(newGrid);
      }
    }
  };

  useEffect(() => {
    const allCorrect = words.every(({ word, row, col }) =>
      word.split("").every((letter, i) => {
        const r = row;
        const c = col + i;
        return grid[r]?.[c] === letter;
      })
    );

    if (allCorrect && !showModal) {
      confetti({ particleCount: 200, spread: 70 });
      markGiftAsOpened(2);
      setShowModal(true);
    }
  }, [grid, showModal]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "30px",
        background: `url(${
          import.meta.env.BASE_URL
        }2.png) center/cover no-repeat`,
      }}
    >
      <span
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "30px",
          color: "#4A76A8",
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        Crossword Game
      </span>
      <span
        style={{
          fontFamily: "'Roboto Mono', monospace",
          color: "#94A3B8",
          width: "90%",
          fontSize: "14px",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        Find the secret word (column) by completing each row 🔍
      </span>

      {/* Crossword grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, 35px)`,
          gap: "2px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {Array.from({ length: GRID_ROWS }).map((_, row) =>
          Array.from({ length: GRID_COLS }).map((_, col) => {
            const wordHere = words.find(
              (w) =>
                w.row === row && col >= w.col && col < w.col + w.word.length
            );

            if (!wordHere) {
              return (
                <div
                  key={`${row}-${col}`}
                  style={{ width: "20px", height: "20px" }}
                />
              );
            }

            const letterIndex = col - wordHere.col;
            const correctLetter = wordHere.word[letterIndex];
            const enteredLetter = grid[row][col];

            return (
              <input
                key={`${row}-${col}`}
                ref={(el) => {
                  inputRefs.current[row][col] = el;
                }}
                value={enteredLetter}
                maxLength={1}
                onChange={(e) => handleChange(row, col, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, row, col)}
                style={{
                  width: "15px",
                  height: "25px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "1px solid #4A76A8",
                  backgroundColor: "#4A76A8",
                  color:
                    enteredLetter === ""
                      ? "white"
                      : enteredLetter === correctLetter
                      ? "white"
                      : "red",
                  borderRadius: "6px",
                }}
              />
            );
          })
        )}
      </div>

      {/* Clues */}
      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          maxWidth: "500px",
          marginInline: "auto",
          color: "black",
        }}
      >
        <span
          style={{
            fontFamily: "'Roboto Mono', monospace",
            color: "#94A3B8",
            width: "90%",
            fontSize: "16px",
          }}
        >
          💡 Clues:
        </span>
        <ol>
          {words.map((w, i) => (
            <li key={i}>{w.clue}</li>
          ))}
        </ol>
      </div>
      <Modal show={showModal}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontSize: "18px", color: "#4A76A8" }}>
            Secret column: HANH 🎉
          </span>
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              color: "#94A3B8",
              width: "90%",
              fontSize: "16px",
            }}
          >
            The crossword reveals your name, woven from words that reflect your
            traits and our story 💕
          </span>
          <CustomButton
            onClick={() => navigate("/gift/2/received")}
            style={{ marginTop: "20px" }}
          >
            Open gift
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default CrosswordHanh;
