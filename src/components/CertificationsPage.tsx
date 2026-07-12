import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdClose } from "react-icons/md";
import "./styles/CertificationsPage.css";

import aiImg from "../assets/certs/ai.webp";
import dlImg from "../assets/certs/DL.webp";
import aiaiImg from "../assets/certs/aiai.webp";
import introaiImg from "../assets/certs/introai.webp";
import pythonImg from "../assets/certs/python.webp";
import javaImg from "../assets/certs/java.webp";
import webdevImg from "../assets/certs/webdev.webp";

const certifications = [
  {
    title: "Artificial Intelligence Foundation",
    issuer: "Infosys Springboard",
    date: "2024",
    description: "Learned core AI concepts including machine learning basics and real-world applications.",
    image: aiImg,
  },
  {
    title: "Introduction to Deep Learning",
    issuer: "Infosys Springboard",
    date: "2024",
    description: "Gained knowledge of neural networks, deep learning models, and practical implementations.",
    image: dlImg,
  },
  {
    title: "Introduction to Natural Language Processing",
    issuer: "Infosys Springboard",
    date: "2024",
    description: "Explored text processing, language models, and real-world NLP applications.",
    image: aiaiImg,
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    date: "2024",
    description: "Understood AI fundamentals, problem-solving techniques, and intelligent systems.",
    image: introaiImg,
  },
  {
    title: "Python 100 Days Bootcamp",
    issuer: "Udemy",
    date: "Still progress",
    description: "Completed hands-on Python training covering automation, OOP, and real-world projects.",
    image: pythonImg,
  },
  {
    title: "Java Basics Certification",
    issuer: "HackerRank",
    date: "2025",
    description: "Demonstrated strong understanding of Java fundamentals, OOP, and problem-solving skills.",
    image: javaImg,
  },
  {
    title: "Web Development",
    issuer: "Udemy",
    date: "2024",
    description: "Completed full-stack web development course covering HTML, CSS, JavaScript, React, Node.js, MongoDB, PostgreSQL and responsive design.",
    image: webdevImg,
  },
];

type Cert = (typeof certifications)[0];

const CertificationsPage = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const [selected, setSelected] = useState<Cert | null>(null);

  useEffect(() => {
    let lastTime = 0;
    const animate = (timestamp: number) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      if (!pausedRef.current && carouselRef.current) {
        angleRef.current -= delta * 0.10;
        carouselRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const total = certifications.length;
  const angleStep = 360 / total;
  const radius = 320;

  return (
    <div className="cert-page">
      <button className="cert-back-btn" onClick={() => navigate(-1)}>
        <MdArrowBack /> Back
      </button>

      <div className="cert-page-header">
        <h1>Certifications</h1>
        <p>Courses & credentials I've completed</p>
      </div>

      <div className="cert-scene">
        <div className="cert-fade-left" />
        <div className="cert-fade-right" />
        <div className="cert-carousel" ref={carouselRef}>
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="cert-3d-card"
              style={{
                transform: `rotateY(${angleStep * i}deg) translateZ(${radius}px)`,
              }}
              onMouseEnter={() => (pausedRef.current = true)}
              onMouseLeave={() => (pausedRef.current = false)}
              onClick={() => setSelected(cert)}
            >
              <div className="cert-3d-img-wrapper">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="cert-3d-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
                <div className="cert-3d-img-placeholder">
                  <span>{cert.issuer[0]}</span>
                </div>
              </div>
              <div className="cert-3d-info">
                <div className="cert-3d-top">
                  <span className="cert-3d-issuer">{cert.issuer}</span>
                  <span className="cert-3d-date">{cert.date}</span>
                </div>
                <h3 className="cert-3d-title">{cert.title}</h3>
                <p className="cert-3d-desc">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="cert-modal-overlay" onClick={() => setSelected(null)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelected(null)}>
              <MdClose />
            </button>
            <div className="cert-modal-img-wrapper">
              <img
                src={selected.image}
                alt={selected.title}
                className="cert-modal-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = "flex";
                }}
              />
              <div className="cert-modal-img-placeholder">
                <span>{selected.issuer[0]}</span>
              </div>
            </div>
            <div className="cert-modal-info">
              <div className="cert-modal-top">
                <span className="cert-modal-issuer">{selected.issuer}</span>
                <span className="cert-modal-date">{selected.date}</span>
              </div>
              <h2 className="cert-modal-title">{selected.title}</h2>
              <p className="cert-modal-desc">{selected.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;