import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import BackgroundMusic from "./BackgroundMusic";

const App: React.FC = () => {
  return (
    <Router>
      <BackgroundMusic />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;
