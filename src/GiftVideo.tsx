import React, { useRef } from "react";

const GiftVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      const bgAudio = document.querySelector("audio");
      if (bgAudio) bgAudio.pause();

      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
      video.play();
    }
  };

  const handleEnded = () => {
    const bgAudio = document.querySelector("audio");
    if (bgAudio) bgAudio.play();
  };

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "50%", cursor: "pointer" }}
      onPlay={handlePlay}
      onEnded={handleEnded}
      preload="auto"
    >
      <source src="/gift.MOV" type="video/mp4" />
    </video>
  );
};

export default GiftVideo;
