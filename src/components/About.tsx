import { useNavigate } from "react-router-dom";
import "./styles/About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          MCA student. Full-stack developer.<br />
          Passionate about clean code and real-world solutions.<br />
          Love teaching, mentoring, and knowledge-sharing.<br />
          Always learning, always building.<br />
          Turning ideas into reality, one line at a time.
        </p>

        <button onClick={() => navigate("/portfolio")} className="view-btn">
  <span>View My Profile</span>
  <div className="arrow">
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 8 L8 2 M3 2 H8 V7"/>
    </svg>
  </div>
</button>

      </div>
    </div>
  );
};

export default About;