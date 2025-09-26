import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { markGiftAsOpened } from "./utils";
import Modal from "./Modal";
import CustomButton from "./Button";

const images = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg",
  "/6.jpeg",
];
// Duplicate to make pairs
const createDeck = (images: string[]) =>
  [...images, ...images].sort(() => Math.random() - 0.5);

const MemoryGame: React.FC = () => {
  const navigate = useNavigate();

  const [cards] = useState(() => createDeck(images));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          confetti({ particleCount: 200, spread: 70 });
          markGiftAsOpened(1); // 🎁 mark Gift 1 solved
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };
  useEffect(() => {
    if (matched.length === cards.length) {
      setShowModal(true);
    }
  }, [matched, cards]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "url('/2.png') center/cover no-repeat",
        textAlign: "center",
        gap: "20px",
        paddingTop: "20px",
      }}
    >
      <span
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "30px",
          color: "#4A76A8", // 🎨 matches your gift box color
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        Memory Flip Game
      </span>
      <span
        style={{
          fontFamily: "'Roboto Mono', monospace",
          color: "#94A3B8",
          width: "90%",
          fontSize: "16px",
        }}
      >
        Thought it is that easy huh? before receiving any gift, pass the game 🃏
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 90px)", // 4 per row
          gap: "8px",
          justifyContent: "center",
        }}
      >
        {cards.map((img, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "90px",
              height: "100px",
              backgroundColor: "#4A76A8",
              border: "2px #FF8BA7 solid",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage:
                flipped.includes(i) || matched.includes(i)
                  ? `url(${img})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {!flipped.includes(i) && !matched.includes(i) && "❓"}
          </div>
        ))}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div>
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              color: "#94A3B8",
              width: "90%",
              fontSize: "16px",
            }}
          >
            Congratulations on passing the first game! When you look at your
            childhood self, know that she would be so proud of the person you’ve
            become today.
          </span>
          <CustomButton
            onClick={() => navigate("/gift/1/received")}
            style={{ marginTop: "20px" }}
          >
            Open gift
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default MemoryGame;
