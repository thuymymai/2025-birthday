import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import GiftBoxesPage from "./GiftBoxesPage";
import GiftGames from "./GiftGames";
import GiftReceivedPage from "./GiftReceivePage";
import Home from "./Home";

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        width: "100vw",
        height: "100%",
        position: "absolute",
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
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
