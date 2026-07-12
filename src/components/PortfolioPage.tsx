import { useEffect, useRef, useState } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import ProfileView from "./ProfileView";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

export default function PortfolioPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    window.scrollTo(0, 0);

    // ✅ Auto-play music
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      audio.loop = true;
      audio.play().catch(() => {
        // Browser blocked autoplay — plays after first user interaction
      });
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";

      // ✅ Stop music when leaving page
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <main style={{ backgroundColor: "#121212" }}>
      {/* ✅ Hidden audio */}
      <audio ref={audioRef} src="/music/bg-music.mp3" />

      {/* ✅ Mute/Unmute button fixed on screen */}
      <button
        onClick={toggleMute}
        style={{
          position: "fixed",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: 999,
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        {isMuted ? <HiVolumeOff size={18} /> : <HiVolumeUp size={18} />}
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <ScrollyCanvas />
      <ProfileView />
    </main>
  );
}