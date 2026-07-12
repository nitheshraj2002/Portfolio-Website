import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function Orbs() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "10%", left: "15%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
          filter: "blur(40px)", willChange: "transform",
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: "absolute", top: "40%", right: "10%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          filter: "blur(40px)", willChange: "transform",
        }}
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute", bottom: "10%", left: "40%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          filter: "blur(40px)", willChange: "transform",
        }}
      />
    </div>
  );
}

function Lightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(5,3,15,0.88)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }} />

          {/* Floating particles */}
          {Array.from({ length: 22 }).map((_, i) => {
            const colors = [
              "rgba(139,92,246,0.7)", "rgba(236,72,153,0.7)",
              "rgba(59,130,246,0.7)", "rgba(16,185,129,0.7)",
            ];
            const size = 4 + Math.random() * 9;
            return (
              <motion.div
                key={i}
                initial={{ y: "100vh", opacity: 0, scale: 0 }}
                animate={{ y: -40, opacity: [0, 0.6, 0.4, 0], scale: 1.2 }}
                transition={{
                  duration: 4 + Math.random() * 6,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  left: `${5 + Math.random() * 90}%`,
                  bottom: 0,
                  width: size, height: size,
                  borderRadius: "50%",
                  background: colors[Math.floor(Math.random() * colors.length)],
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            );
          })}

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.18)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "fixed", top: "1.5rem", right: "1.5rem",
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 20, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 10000,
            }}
          >
            ✕
          </motion.button>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.82, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.82, y: 24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative", zIndex: 1,
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "1.5rem",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Glow */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: -40, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 65%)",
                  zIndex: 0,
                }}
              />
              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: -8, borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #8b5cf6, #ec4899, #3b82f6, #10b981, #8b5cf6)",
                  zIndex: 1, willChange: "transform",
                }}
              />
              {/* Gap ring */}
              <div style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                background: "#0a0814", zIndex: 2,
              }} />
              {/* Photo placeholder — replace with <img> when you have the photo */}
              <div style={{
                position: "relative", zIndex: 3,
                width: "min(78vw, 320px)", height: "min(78vw, 320px)",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(70px, 15vw, 120px)", fontWeight: 800, color: "#fff",
              }}>
                
                { 
                <img src="/profile.webp" alt="Nithesh Raj"
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} /> }
              </div>
            </div>

            <div style={{
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800,
              color: "#fff", letterSpacing: "-0.02em", textAlign: "center",
            }}>
              Nithesh Raj
            </div>
            <div style={{
              color: "#c4b5fd", fontSize: "0.9rem", fontWeight: 500,
              letterSpacing: "0.08em", textAlign: "center",
            }}>
              ✦ Intern · Waioz Consultancy Service ✦
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const techStack = [
  { label: "React.js",     category: "fe"  },
  { label: "HTML5",        category: "fe"  },
  { label: "CSS3",         category: "fe"  },
  { label: "Node.js",      category: "be"  },
  { label: "Python",       category: "be"  },
  { label: "MongoDB",      category: "db"  },
  { label: "PostgreSQL",   category: "db"  },
  { label: "MySQL",        category: "db"  },
  { label: "RESTful APIs", category: "api" },
  { label: "API Testing",  category: "api" },
  { label: "Three.js",     category: "3d"  },
  { label: "Blender",      category: "3d"  },
];

const tagStyles: Record<string, React.CSSProperties> = {
  fe:  { background: "rgba(59,130,246,0.1)",  border: "1px solid rgba(59,130,246,0.3)",  color: "#93c5fd" },
  be:  { background: "rgba(16,185,129,0.1)",  border: "1px solid rgba(16,185,129,0.3)",  color: "#6ee7b7" },
  db:  { background: "rgba(251,191,36,0.1)",  border: "1px solid rgba(251,191,36,0.3)",  color: "#fcd34d" },
  api: { background: "rgba(236,72,153,0.1)",  border: "1px solid rgba(236,72,153,0.3)",  color: "#f9a8d4" },
  "3d":{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.4)",  color: "#c4b5fd" },
};

export default function ProfileView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <>
      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)} />

      <section
        ref={ref}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 40%, #0f1a2e 100%)",
          padding: "4rem 1.5rem",
        }}
      >
        <Orbs />

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 680, width: "100%" }}
        >
          {/* ── Photo with lightbox trigger ── */}
          <motion.div variants={scaleIn} style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", inset: -6, borderRadius: "50%",
                background: "conic-gradient(from 0deg, #8b5cf6, #ec4899, #3b82f6, #10b981, #8b5cf6)",
                zIndex: 0, willChange: "transform",
              }}
            />
            <div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "#0f0f1a", zIndex: 1 }} />

            <motion.div
              onClick={() => setLightboxOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: "relative", zIndex: 2, cursor: "pointer",
                width: 180, height: 180, borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 60, fontWeight: 800, color: "#fff",
                overflow: "hidden",
              }}
            >
              
              { 
              <img src="/profile.webp" alt="Nithesh Raj"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} /> }

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: "0.05em", gap: 5,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                View
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute", bottom: 8, right: 8, zIndex: 3,
                width: 20, height: 20, borderRadius: "50%",
                background: "#10b981", border: "3px solid #0f0f1a",
              }}
            />
          </motion.div>

          {/* ── Name ── */}
          <motion.div variants={fadeUp}>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff",
              letterSpacing: "-0.03em", margin: "0 0 0.5rem", lineHeight: 1,
            }}>
              Nithesh Raj
            </h2>
          </motion.div>

          {/* ── Internship badge ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "0.5rem" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.3rem 1rem", borderRadius: 999,
              background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.35)",
              color: "#6ee7b7", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }}
              />
              Intern · Waioz Consultancy Service
            </span>
          </motion.div>

          {/* ── Role badge ── */}
          <motion.div variants={fadeUp}>
            <span style={{
              display: "inline-block",
              padding: "0.4rem 1.2rem", borderRadius: 999,
              background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)",
              color: "#c4b5fd", fontSize: "0.95rem", fontWeight: 500,
              marginBottom: "1.4rem", letterSpacing: "0.05em",
            }}>
              Creative Developer
            </span>
          </motion.div>

          {/* ── Bio ── */}
          <motion.p variants={fadeUp} style={{
            color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.7,
            maxWidth: 480, margin: "0 auto 2rem",
          }}>
            Building beautiful digital experiences at the intersection of design and engineering.
          </motion.p>

          {/* ── Stats ── */}
          <motion.div variants={fadeUp} style={{
            display: "flex", justifyContent: "center",
            marginBottom: "2rem", flexWrap: "wrap",
          }}>
            {[
              { label: "Projects",     value: "5+",      color: undefined },
              { label: "Experience",   value: "Fresher",  color: "#6ee7b7" },
              { label: "Technologies", value: "10+",      color: undefined },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                textAlign: "center", padding: "0.8rem 2rem",
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}>
                <div style={{
                  fontSize: s.value === "Fresher" ? "1.3rem" : "1.75rem",
                  fontWeight: 800, lineHeight: 1,
                  color: s.color ?? "#fff",
                  ...(s.color ? {} : {
                    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }),
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: "0.72rem", color: "#64748b",
                  marginTop: "0.3rem", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Tech Stack ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "2rem" }}>
            <div style={{
              fontSize: "0.72rem", color: "#64748b",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.9rem",
            }}>
              Tech Stack
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
              {techStack.map((tech) => (
                <motion.span
                  key={tech.label}
                  whileHover={{ y: -2 }}
                  style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "0.35rem 0.85rem", borderRadius: 999,
                    fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.03em",
                    ...tagStyles[tech.category],
                  }}
                >
                  {tech.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Buttons ── */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a
              href="/Nithesh_Resume.pdf"
              download="Nithesh_Resume.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 0 44px rgba(139,92,246,0.65)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.85rem 2rem", borderRadius: 999,
                background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(139,92,246,0.4)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </motion.a>

            <motion.a
              href="/Nithesh_Resume.pdf"
              target="Nithesh_Resume"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.85rem 2rem", borderRadius: 999,
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "#fff", fontWeight: 600, fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              View Resume
            </motion.a>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}