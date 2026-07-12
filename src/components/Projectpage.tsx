import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MdArrowBack } from "react-icons/md";
import { projects } from "./Work";
import "./styles/ProjectPage.css";

// ─── Image preloader ──────────────────────────────────────────────────────────
function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

/* ── Lightbox ────────────────────────────────────── */
const Lightbox = ({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [exiting, setExiting] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const pendingIndexRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  const [uiVisible, setUiVisible] = useState(true);
  const uiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttleActiveRef = useRef(false);
  const showUI = useCallback(() => {
    if (!throttleActiveRef.current) {
      throttleActiveRef.current = true;
      setUiVisible(true);
      setTimeout(() => { throttleActiveRef.current = false; }, 80);
    }
    if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    uiTimerRef.current = setTimeout(() => setUiVisible(false), 3000);
  }, []);

  useEffect(() => {
    uiTimerRef.current = setTimeout(() => setUiVisible(false), 3000);
    return () => {
      if (uiTimerRef.current) clearTimeout(uiTimerRef.current);
    };
  }, []);

  const go = useCallback(
    (dir: "left" | "right", targetIndex?: number) => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      setDirection(dir);
      pendingIndexRef.current =
        targetIndex ??
        (dir === "right"
          ? activeIndex === images.length - 1 ? 0 : activeIndex + 1
          : activeIndex === 0 ? images.length - 1 : activeIndex - 1);
      setExiting(true);
      showUI();
    },
    [activeIndex, images.length, showUI]
  );

  const handleAnimationEnd = useCallback(() => {
    if (pendingIndexRef.current !== null) {
      setActiveIndex(pendingIndexRef.current);
      pendingIndexRef.current = null;
    }
    setExiting(false);
    animatingRef.current = false;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go("left");
      if (e.key === "ArrowRight") go("right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, go]);

  useEffect(() => {
    const sbWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${sbWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  return (
    <div className="alb-overlay" onClick={onClose} onMouseMove={showUI}>
      <button
        className={`alb-close ${uiVisible ? "alb-ui-visible" : ""}`}
        onClick={onClose}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M1 1L17 17M17 1L1 17"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className={`alb-counter ${uiVisible ? "alb-ui-visible" : ""}`}>
        {activeIndex + 1} <span>/ {images.length}</span>
      </div>

      <div className="alb-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img
          className={`alb-img ${exiting ? `alb-exit-${direction}` : "alb-enter"}`}
          src={images[activeIndex]}
          alt={`Screenshot ${activeIndex + 1}`}
          draggable={false}
          onAnimationEnd={handleAnimationEnd}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {images.length > 1 && (
        <button
          className={`alb-arrow alb-arrow-left ${uiVisible ? "alb-ui-visible" : ""}`}
          onClick={(e) => { e.stopPropagation(); go("left"); }}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M9 1L1 9L9 17"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <button
          className={`alb-arrow alb-arrow-right ${uiVisible ? "alb-ui-visible" : ""}`}
          onClick={(e) => { e.stopPropagation(); go("right"); }}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M1 1L9 9L1 17"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {images.length > 1 && (
        <div
          className={`alb-dots ${uiVisible ? "alb-ui-visible" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              className={`alb-dot ${i === activeIndex ? "alb-dot-active" : ""}`}
              onClick={() => {
                if (i === activeIndex) return;
                go(i > activeIndex ? "right" : "left", i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── ProjectPage ─────────────────────────────────── */
const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const pauseRenderRef = useRef(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  // ── MUSIC ────────────────────────────────────────────────────────────────────
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number>(0);
  const [muted, setMuted] = useState(false);
  // ─────────────────────────────────────────────────────────────────────────────

  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (project?.images?.length) {
      preloadImages(project.images);
    }
  }, [project]);

  useEffect(() => {
    pauseRenderRef.current = lightboxOpen;
  }, [lightboxOpen]);

  // ── MUSIC: create audio, fade in, clean up on leave ─────────────────────────
  useEffect(() => {
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().catch(() => {
        const onGesture = () => {
          audio.play().catch(() => {});
          window.removeEventListener("click", onGesture);
          window.removeEventListener("keydown", onGesture);
        };
        window.addEventListener("click", onGesture);
        window.addEventListener("keydown", onGesture);
      });
    };
    tryPlay();

    const TARGET = 0.5;
    const FADE_IN = 1000;
    const t0 = performance.now();
    const fadeIn = (now: number) => {
      const p = Math.min((now - t0) / FADE_IN, 1);
      audio.volume = Math.max(0, Math.min(1, p * TARGET));
      if (p < 1) fadeRafRef.current = requestAnimationFrame(fadeIn);
    };
    fadeRafRef.current = requestAnimationFrame(fadeIn);

    return () => {
      cancelAnimationFrame(fadeRafRef.current);
      const vol = audio.volume;
      const FADE_OUT = 600;
      const t1 = performance.now();
      const fadeOut = (now: number) => {
        const p = Math.min((now - t1) / FADE_OUT, 1);
        audio.volume = Math.max(0, vol * (1 - p));
        if (p < 1) {
          fadeRafRef.current = requestAnimationFrame(fadeOut);
        } else {
          audio.pause();
          audio.src = "";
        }
      };
      fadeRafRef.current = requestAnimationFrame(fadeOut);
    };
  }, []);

  // ── MUSIC: pause when lightbox opens, resume when it closes ─────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (lightboxOpen) {
      audio.pause();
    } else {
      if (!muted) audio.play().catch(() => {});
    }
  }, [lightboxOpen, muted]);

  // ── MUSIC: mute toggle ───────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setMuted((prev) => {
      const next = !prev;
      if (next) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
      return next;
    });
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const openLightbox = useCallback((index: number) => {
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    const container = canvasRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 1.5, 4);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x5eeacc, 0.4);
    fillLight.position.set(-5, 2, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x5eeacc, 0.8, 20);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 1.5;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI / 1.6;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    const stopAutoRotate = () => { controls.autoRotate = false; };
    renderer.domElement.addEventListener("pointerdown", stopAutoRotate);

    const groundGeo = new THREE.CircleGeometry(3, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      roughness: 1,
      transparent: true,
      opacity: 0.4,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const loadingEl = document.createElement("div");
    loadingEl.className = "pp-glb-loading";
    loadingEl.style.transition = "opacity 0.4s ease";
    loadingEl.innerHTML = `<div class="pp-glb-spinner"></div><p>Loading 3D Model…</p>`;
    container.appendChild(loadingEl);

    let modelLoaded = false;

    const loader = new GLTFLoader();
    loader.load(
      project.glbModel,
      (gltf) => {
        modelLoaded = true;
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = 2.5 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y += 0.05;
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(model);
        loadingEl.style.opacity = "0";
        setTimeout(() => {
          if (container.contains(loadingEl)) loadingEl.remove();
        }, 400);
      },
      (xhr) => {
        const pct =
          xhr.total > 0 ? Math.round((xhr.loaded / xhr.total) * 100) : null;
        const p = loadingEl.querySelector("p");
        if (p)
          p.textContent =
            pct !== null ? `Loading 3D Model… ${pct}%` : "Loading 3D Model…";
      },
      (err) => {
        console.error("GLB load error:", err);
        loadingEl.innerHTML = `<p style="color:#ff6b6b">Failed to load model.<br/>Make sure <strong>${project.glbModel}</strong> exists in /public</p>`;
      }
    );

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (pauseRenderRef.current) return;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", stopAutoRotate);
      controls.dispose();

      if (!modelLoaded && container.contains(loadingEl)) {
        loadingEl.remove();
      }

      scene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: THREE.Material) => disposeMaterial(m));
          } else {
            disposeMaterial(obj.material);
          }
        }
      });

      groundGeo.dispose();
      groundMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [project]);

  if (!project) {
    return (
      <div className="pp-notfound">
        <h2>Project not found</h2>
        <button className="pp-back-btn" onClick={handleBack}>
          <MdArrowBack /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="pp-page">
      <div className="pp-topbar">
        <button
          className="pp-back-btn"
          onClick={handleBack}
          aria-label="Back to portfolio"
        >
          <MdArrowBack />
          <span>Back</span>
        </button>
        <span className="pp-topbar-title">{project.title}</span>

        {/* ── MUSIC: mute/unmute button ── */}
        <button
          className="pp-music-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          title={muted ? "Unmute music" : "Mute music"}
          style={{ marginLeft: "auto", background: "none", border: "none", color: "inherit", cursor: "pointer", opacity: muted ? 0.4 : 0.8 }}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      </div>

      <div className="pp-viewer-section">
        <div className="pp-viewer-info">
          <span className="pp-category">{project.category}</span>
          <h1 className="pp-title">{project.title}</h1>
          <p className="pp-tools">
            <span>Stack</span> — {project.tools}
          </p>
          <p className="pp-description">{project.description}</p>

          {/* ── Clickable website URL ── */}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                fontSize: "0.82rem",
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

        <div className="pp-viewer-container">
          <div className="pp-viewer-hint">
            <span className="pp-viewer-dot" />
            Drag to rotate · Scroll to zoom
          </div>
          <div className="pp-viewer" ref={canvasRef} />
        </div>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="pp-gallery-section">
          <div className="pp-gallery-header">
            <h2>Project Screenshots</h2>
            <span>{project.images.length} images</span>
          </div>
          <div className="pp-gallery">
            {project.images.map((src, i) => (
              <div
                className="pp-gallery-item"
                key={i}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  width="1280"
                  height="720"
                />
                <div className="pp-gallery-shine" />
                <div className="pp-gallery-num">{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          images={project.images}
          startIndex={lightboxStartIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

// ── Dispose all texture maps on a Three.js material ───────────────────────────
function disposeMaterial(mat: THREE.Material) {
  if (!mat) return;
  const textureMaps = [
    "map", "lightMap", "bumpMap", "normalMap", "specularMap",
    "envMap", "alphaMap", "aoMap", "displacementMap",
    "emissiveMap", "gradientMap", "metalnessMap", "roughnessMap",
  ] as const;
  textureMaps.forEach((key) => {
    const tex = (mat as any)[key] as THREE.Texture | undefined;
    if (tex) tex.dispose();
  });
  mat.dispose();
}

export default ProjectPage;