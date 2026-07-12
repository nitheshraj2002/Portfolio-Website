import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Certifications.css";

const Certifications = () => {
  const navigate = useNavigate();

  return (
    <div className="certifications-section section-container" id="certifications">
      <div className="certifications-container">
        <div className="certifications-left">
          <h2>
            My <span></span>
            <br /> certifications
          </h2>
          <p>Courses & credentials I've earned across development, AI, and programming.</p>
          <button
            className="cert-view-btn"
            onClick={() => navigate("/certifications")}
            data-cursor="disable"
          >
            View All <MdArrowOutward />
          </button>
        </div>
        
    
      </div>
    </div>
  );
};

export default Certifications;