import React, { useRef } from "react";

const GiftVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      const bgAudio = document.querySelector("audio");
      if (bgAudio) bgAudio.pause();

      setTimeout(() => {
        if (video.requestFullscreen) {
          video.requestFullscreen().catch(() => {});
        } else if ((video as any).webkitEnterFullscreen) {
          (video as any).webkitEnterFullscreen();
        }
      }, 300);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else if ((video as any).webkitExitFullscreen) {
      (video as any).webkitExitFullscreen();
    }
  };

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      preload="auto"
      onPlay={handlePlay}
      onEnded={handleEnded}
      style={{ width: "55%", borderRadius: "12px", cursor: "pointer" }}
    >
      <source
        src="https://www.dropbox.com/scl/fi/twiquifhwwhoxa8qv9yzd/gift.mp4?rlkey=pz8pp7akuj5cr1c9nk25yakvx&st=aa94uudf&raw=1"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default GiftVideo;
