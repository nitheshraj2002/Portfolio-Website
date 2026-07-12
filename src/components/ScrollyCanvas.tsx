import { useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const FRAME_COUNT = 75;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 20,
    mass: 2,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(2, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y,
      img.width * ratio, img.height * ratio
    );
  };

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const renderFrame = (idx: number) => {
      if (images[idx] && images[idx].complete) {
        drawImageProp(ctx, images[idx]);
      } else if (images[idx]) {
        images[idx].onload = () => {
          const currentIdx = Math.round(frameIndex.get());
          if (currentIdx === idx) {
            drawImageProp(ctx, images[idx]);
          }
        };
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(Math.round(latest));
    });

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.round(frameIndex.get()));
      }
    };

    const initialDrawInterval = setInterval(() => {
      if (images[0] && images[0].complete) {
        handleResize();
        clearInterval(initialDrawInterval);
      }
    }, 50);

    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      clearInterval(initialDrawInterval);
    };
  }, [images, frameIndex]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }}
      className="h-[500vh] w-full bg-[#121212]"
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "1.25rem",
          zIndex: 100,
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
        <MdArrowBack size={18} />
        Back
      </button>

      {/* Canvas only — no text overlay */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}