import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import BackgroundMusic from "./BackgroundMusic";

const App: React.FC = () => {
  useEffect(() => {
    localStorage.setItem(
      "openedGifts",
      JSON.stringify({ 1: true, 2: true, 3: true })
    );
  }, []);
  return (
    <Router>
      <BackgroundMusic />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
