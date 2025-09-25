import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BackgroundLayout from "./BackgroundLayout";
import GiftBoxesPage from "./GiftBoxesPage";
import GiftGames from "./GiftGames";
import GiftReceivedPage from "./GiftReceivePage";
import Home from "./Home";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        width: "100vw",
        height: "100%",
        position: "absolute", // take full viewport
        top: 0,
        left: 0,
        overflowX: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/gifts"
          element={
            <PageWrapper>
              <GiftBoxesPage />
            </PageWrapper>
          }
        />
        <Route
          path="/gift/:id/puzzle"
          element={
            <PageWrapper>
              <GiftGames />
            </PageWrapper>
          }
        />
        <Route
          path="/gift/:id/received"
          element={
            <PageWrapper>
              <GiftReceivedPage />
            </PageWrapper>
          }
        />

        <Route
          path="/finish"
          element={
            <PageWrapper>
              <Finish />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

// ---- Final Page ----
const Finish: React.FC = () => (
  <BackgroundLayout>
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎁 You found your gift! 🎁</h1>
      <p className="mb-4">Congratulations on finishing the treasure hunt!</p>
    </div>
  </BackgroundLayout>
);
