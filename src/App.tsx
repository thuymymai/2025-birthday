import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import BackgroundMusic from "./BackgroundMusic";

const App: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem("openedGifts");
  }, []);

  return (
    <Router>
      <BackgroundMusic />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
