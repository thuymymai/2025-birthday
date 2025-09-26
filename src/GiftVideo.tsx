import React, { useEffect } from "react";

const GiftVideo: React.FC = () => {
  const srcUrl = `https://drive.google.com/file/d/19qgo-IU_nRMQbRHWhVviUhQPk3b9jkj_/view?usp=sharing`;

  useEffect(() => {
    const bgAudio = document.querySelector("audio");

    if (bgAudio) {
      bgAudio.pause();
    }

    return () => {
      if (bgAudio) {
        bgAudio.play();
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <iframe
        src={srcUrl}
        width="90%"
        height="480"
        allow="autoplay"
        style={{
          border: "none",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GiftVideo;
