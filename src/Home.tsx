// ---- Landing Page with Video ----
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEnd = () => {
      // Redirect to first clue automatically
      navigate("/gifts");
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnd);
      }
    };
  }, [navigate]);

  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        ref={videoRef}
        src="/video.mp4" // place file inside /public
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "fixed",
          top: 0,
          left: 0,
        }}
        autoPlay
        muted
        playsInline
        // iOS legacy support:
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
      />
    </div>
  );
};

export default Home;
