import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import "./styles/Work.css";
import {
  MdArrowBack,
  MdArrowForward,
  MdRemoveRedEye,
  MdClose,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

export interface Project {
  id: string;
  title: string;
  category: string;
  tools: string;
  description: string;
  image: string;
  glbModel: string;
  images: string[];
  accentColor: string;
  websiteUrl?: string;
}

export const projects: Project[] = [
  {
    id: "pet-clinic-management-system",
    title: "Pet Clinic Management System",
    category: "UG Project",
    tools: "Node.js · MySQL",
    description:
      "Full-stack veterinary clinic platform with appointment scheduling, patient records, and role-based access for doctors and staff.",
    image: "",
    glbModel: "/models/petclinic.glb",
    images: [
      "/images/petclinic/dashboard.png",
      "/images/petclinic/appointments.png",
      "/images/petclinic/records.png",
      "/images/petclinic/patients.png",
      "/images/petclinic/reports.png",
    ],
    accentColor: "#a78bfa",
  },
  {
    id: "patient-food-recommendation-system",
    title: "Patient Food Recommendation System",
    category: "PG Mini Project",
    tools: "Node.js · MongoDB",
    description:
      "The system that recommends personalised diet plans for patients based on medical history, allergies, and nutritional requirements.",
    image: "",
    glbModel: "/models/foodrec.glb",
    images: [
      "/images/foodrec/home.png",
      "/images/foodrec/recommend.png",
      "/images/foodrec/report.png",
      "/images/foodrec/profile.png",
      "/images/foodrec/history.png",
    ],
    accentColor: "#34d399",
  },
  {
    id: "workmate-ai",
    title: "WorkMate AI",
    category: "PG Final Year Project (Internship at Waioz)",
    tools: "python · React.js · Node.js · OpenAI API",
    description:
      "Role-based login chatbot (Chatty Bot) built for workplace productivity. Different roles — admin, manager, employee — get tailored AI responses and access levels.",
    image: "",
    glbModel: "/models/botboy.glb",
    images: [
      "/images/workmate/home.png",
      "/images/workmate/second.png",
      "/images/workmate/theard.png",
      "/images/workmate/forth.png",
      "/images/workmate/fifth.png",
      "/images/workmate/sixth.png",

     
    ],
    accentColor: "#f472b6",
  },
  {
    id: "AI-Powered Product Management System (CRUD + AI Generator)",
    title: "AI-Powered Product Management System (CRUD + AI Generator)",
    category: "Practice intent project",
    tools: "Node.js · MySQL · Gemini API",
    description:
      "AI-powered Product CRUD system that stores and manages product data in MySQL. Includes an AI generator that converts simple input into professional, SEO-friendly product descriptions.",
    image: "",
    glbModel: "/models/text.glb",
    images: [
      "/images/Ai-crud/home.png",
      "/images/Ai-crud/recommend.png",
      "/images/Ai-crud/report.png",
      "/images/Ai-crud/profile.png",
      "/images/Ai-crud/history.png",
    ],
    accentColor: "#38bdf8",
  },
  {
    id: "Music-GameZOne",
    title: "Music-GameZOne",
    category: "Practice WEB hosting",
    tools: "React, Firebase Hosting, JavaScript, CSS",
    description:
      "GameZOne is a React web hosting project with an interactive music player and live deployment on Firebase Hosting.",
    image: "",
    glbModel: "/models/music.glb",
    images: [
      "/images/GameZOne/home.png",
      "/images/GameZOne/recommend.png",
      "/images/GameZOne/report.png",
    ],
    accentColor: "#fb923c",
    websiteUrl: "https://nithesh-hosting.web.app/",
  },
  {
    id: "project-six",
    title: "Coming Soon",
    category: "Project 6",
    tools: "Fill later",
    description: "Details coming soon. This project will be updated shortly.",
    image: "",
    glbModel: "/models/placeholder.glb",
    images: [],
    accentColor: "#e879f9",
  },
];

const CAROUSEL_KEY = "work_carousel_index";
const SCROLL_KEY = "work_scroll_position";

/* ── Lightbox ────────────────────────────────────── */
const Lightbox = ({
  images,
  startIndex,
  accentColor,
  onClose,
}: {
  images: string[];
  startIndex: number;
  accentColor: string;
  onClose: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          data-cursor="disable"
        >
          <MdClose />
        </button>

        <div className="lightbox-main">
          {images.length > 1 && (
            <button
              className="lightbox-arrow lightbox-arrow-left"
              onClick={goPrev}
              data-cursor="disable"
            >
              <MdChevronLeft />
            </button>
          )}
          {/* ✅ lazy loaded lightbox image */}
          <img
            className="lightbox-img"
            src={images[activeIndex]}
            alt={`Screenshot ${activeIndex + 1}`}
            style={{ borderColor: accentColor + "55" }}
            loading="lazy"
            decoding="async"
          />
          {images.length > 1 && (
            <button
              className="lightbox-arrow lightbox-arrow-right"
              onClick={goNext}
              data-cursor="disable"
            >
              <MdChevronRight />
            </button>
          )}
        </div>

        <p className="lightbox-counter" style={{ color: accentColor }}>
          {activeIndex + 1} / {images.length}
        </p>

        {images.length > 1 && (
          <div className="lightbox-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`lightbox-thumb ${
                  i === activeIndex ? "lightbox-thumb-active" : ""
                }`}
                style={i === activeIndex ? { borderColor: accentColor } : {}}
                onClick={() => setActiveIndex(i)}
                data-cursor="disable"
              >
                {/* ✅ lazy loaded thumbnail */}
                <img
                  src={img}
                  alt={`Thumb ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Mesh Canvas ─────────────────────────────────── */
const MeshCanvas = ({
  accentColor,
  active,
}: {
  accentColor: string;
  active: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    io.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    canvas.addEventListener("mousemove", onMove);

    const COLS = 7;
    const ROWS = 5;

    const draw = (t: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current || !active) return;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const { x: mx, y: my } = mouseRef.current;
      const spd = t * 0.00045;

      const pts: { x: number; y: number }[][] = [];
      for (let r = 0; r <= ROWS; r++) {
        pts[r] = [];
        for (let c = 0; c <= COLS; c++) {
          const bx = (c / COLS) * W;
          const by = (r / ROWS) * H;
          const dx = bx / W - mx;
          const dy = by / H - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(spd + r * 0.7 + c * 0.5) * 5;
          const repel = Math.max(0, 1 - dist * 2.5) * 8;
          pts[r][c] = {
            x: bx + wave + dx * repel,
            y: by + Math.cos(spd + c * 0.6 + r * 0.4) * 4 + dy * repel,
          };
        }
      }

      ctx.lineWidth = 0.6;
      ctx.strokeStyle = accentColor + "30";

      ctx.beginPath();
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = pts[r][c];
          const n = pts[r][c + 1];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
        }
      }
      ctx.stroke();

      ctx.beginPath();
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c];
          const n = pts[r + 1][c];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
        }
      }
      ctx.stroke();

      ctx.fillStyle = accentColor + "88";
      ctx.beginPath();
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const p = pts[r][c];
          ctx.moveTo(p.x + 2, p.y);
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [accentColor, active]);

  return <canvas ref={canvasRef} className="mesh-canvas" />;
};

/* ── Work ────────────────────────────────────────── */
const Work = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = sessionStorage.getItem(CAROUSEL_KEY);
    const parsed = saved !== null ? parseInt(saved, 10) : 0;
    return isNaN(parsed) || parsed < 0 || parsed >= projects.length
      ? 0
      : parsed;
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const rafTilt = useRef<number>(0);
  const tiltTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  // ✅ Fixed scroll restore — increased delay + ScrollTrigger refresh
  useEffect(() => {
    const savedScroll = sessionStorage.getItem(SCROLL_KEY);
    if (savedScroll !== null) {
      const y = parseInt(savedScroll, 10);
      setTimeout(() => {
        ScrollTrigger.refresh();
        window.scrollTo({ top: y, behavior: "instant" });
        sessionStorage.removeItem(SCROLL_KEY);
      }, 300);
    }
  }, []);

  // ✅ Refresh ScrollTrigger after Work section mounts
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const goToSlide = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrentIndex(index);
      sessionStorage.setItem(CAROUSEL_KEY, String(index));
      setTimeout(() => setIsAnimating(false), 480);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    goToSlide(
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1,
      "left"
    );
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1,
      "right"
    );
  }, [currentIndex, goToSlide]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      cancelAnimationFrame(rafTilt.current);
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafTilt.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        const x = (clientX - r.left) / r.width - 0.5;
        const y = (clientY - r.top) / r.height - 0.5;
        cardRef.current.style.transform = `perspective(900px) rotateY(${
          x * 10
        }deg) rotateX(${-y * 7}deg) translateZ(6px)`;
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafTilt.current);
    if (tiltTimeoutRef.current !== null) {
      clearTimeout(tiltTimeoutRef.current);
    }
    if (cardRef.current) {
      cardRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
      cardRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      tiltTimeoutRef.current = setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = "";
        tiltTimeoutRef.current = null;
      }, 510);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (tiltTimeoutRef.current !== null) {
        clearTimeout(tiltTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToPrev, goToNext, lightboxOpen]);

  const project = projects[currentIndex];
  const validImages = project.images.filter((img) => img !== "");
  const hasImages = validImages.length > 0;

  const openLightbox = (index = 0) => {
    if (!hasImages) return;
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  };

  const handleViewProject = () => {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    navigate(`/project/${project.id}`);
  };

  return (
    <section className="work-section" id="work">
      <div className="work-container">
        <h2 className="work-title">
          My <span className="work-accent">Work</span>
        </h2>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div
            className={`carousel-card ${isAnimating ? `slide-${direction}` : ""}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ "--accent": project.accentColor } as React.CSSProperties}
          >
            <div className="card-glow-border" />

            {/* LEFT — clickable image or mesh fallback */}
            <div
              className={`card-left ${hasImages ? "card-left-clickable" : ""}`}
              onClick={() => openLightbox(0)}
              role={hasImages ? "button" : undefined}
              aria-label={hasImages ? "View project screenshots" : undefined}
              data-cursor={hasImages ? "disable" : undefined}
            >
              {hasImages ? (
                <>
                  {/* ✅ lazy loaded card image */}
                  <img
                    src={validImages[0]}
                    alt={`${project.title} preview`}
                    className="card-left-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="card-left-hover-hint">
                    <span style={{ color: project.accentColor }}>
                      🔍 View Screenshots
                    </span>
                  </div>
                </>
              ) : (
                <MeshCanvas
                  accentColor={project.accentColor}
                  active={!isAnimating}
                />
              )}
              <span className="mesh-overlay-label">{project.category}</span>
              <div className="card-scanline" />
            </div>

            {/* RIGHT — info */}
            <div className="card-right">
              <div className="card-right-top">
                <span className="proj-num">0{currentIndex + 1}</span>
                <span
                  className="category-pill"
                  style={{
                    borderColor: project.accentColor + "55",
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>
              </div>

              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>
              <p className="card-tools">{project.tools}</p>

              {/* Dot indicators for screenshot count */}
              {hasImages && (
                <div className="img-count-row">
                  {validImages.map((_, i) => (
                    <button
                      key={i}
                      className="img-count-dot"
                      style={{ background: project.accentColor }}
                      onClick={() => openLightbox(i)}
                      data-cursor="disable"
                      aria-label={`View screenshot ${i + 1}`}
                    />
                  ))}
                  <span
                    className="img-count-label"
                    style={{ color: project.accentColor + "aa" }}
                  >
                    {validImages.length} screenshot 👇🏻
                    {validImages.length > 1 ? "s" : ""}
                  </span>
                </div>
              )}

              <button
                className="project-view-btn"
                onClick={handleViewProject}
                data-cursor="disable"
              >
                <MdRemoveRedEye className="eye-icon" />
                <span>View Project</span>
              </button>

             {/* ── Clickable website URL ── */}
{project.websiteUrl && (
  <a
    href={project.websiteUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      marginTop: "10px",
      fontSize: "0.8rem",
      color: project.accentColor,
      textDecoration: "underline",
      wordBreak: "break-all",
      opacity: 0.9,
    }}
  >
    🌐 {project.websiteUrl}
  </a>
)}
</div>
</div>

<div className="carousel-dots">
  {projects.map((_, i) => (
    <button
      key={i}
      className={`carousel-dot ${
        i === currentIndex ? "carousel-dot-active" : ""
      }`}
      onClick={() =>
        goToSlide(i, i > currentIndex ? "right" : "left")
      }
      aria-label={`Go to project ${i + 1}`}
      data-cursor="disable"
      style={
        i === currentIndex
          ? ({
              "--accent": project.accentColor,
            } as React.CSSProperties)
          : {}
      }
    />
  ))}
</div>
</div>
</div>

{/* Lightbox */}
{lightboxOpen && (
  <Lightbox
    images={validImages}
    startIndex={lightboxStartIndex}
    accentColor={project.accentColor}
    onClose={() => setLightboxOpen(false)}
  />
)}
</section>
);
};

export default Work;