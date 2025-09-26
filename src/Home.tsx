import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let playCount = 0;

    const handleEnd = () => {
      playCount++;
      if (playCount < 2) {
        videoRef.current?.play();
      } else {
        navigate("/gifts");
      }
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
        src={`${import.meta.env.BASE_URL}video.mp4`}
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
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="allow"
      />
    </div>
  );
};

export default Home;
