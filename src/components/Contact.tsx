import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>

        <div className="contact-flex">
          
          {/* LEFT SIDE */}
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:nitheshwwe007@gmail.com" data-cursor="disable">
                nitheshwwe007@gmail.com
              </a>
            </p>

            <h4>Phone</h4>
            <p>+91 93612 98438</p>

            <h4>Education</h4>
            <p>Master of Computer Applications (MCA)</p>
          </div>

          {/* MIDDLE SIDE */}
          <div className="contact-box">
            <h4>Social</h4>

            <a
              href="https://github.com/nitheshraj2002"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>

            <a
              href="https://linkedin.com/in/nithesh-raj-a9a192327"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>

            
            <a
              href="https://instagram.com/nitheshwwe007"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Insta <MdArrowOutward />
            </a>
            
          

          </div>

          {/* RIGHT SIDE */}
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Nithesh Raj</span>
            </h2>

            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;