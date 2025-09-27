import React, { useEffect, useRef, useState } from "react";

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
    }
  }, []);

  const startMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.play().catch(() => {
          console.log("User must interact before audio can play.");
        });
        setIsPlaying(true);
      }
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(() => {
          console.log("User must interact before audio can play.");
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music.mp3`} />
      {!isPlaying && (
        <button
          onClick={startMusic}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            padding: "10px 15px",
            background: "#a4bcd7",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          🎶
        </button>
      )}

      {isPlaying && (
        <button
          onClick={toggleMusic}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            padding: "10px 15px",
            background: "#a4bcd7",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
      )}
    </div>
  );
};

export default BackgroundMusic;
