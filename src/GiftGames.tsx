import { useParams } from "react-router-dom";
import MemoryGame from "./MemoryGame";
import CrosswordHanh from "./SimplePuzzleGame";
import JigsawPuzzle from "./PuzzleReveal";

const GiftGames: React.FC = () => {
  const { id } = useParams();

  switch (id) {
    case "1":
      return <MemoryGame />;
    case "2":
      return <CrosswordHanh />;
    case "3":
      return <JigsawPuzzle />;
    default:
      return <p>Game not found</p>;
  }
};

export default GiftGames;
