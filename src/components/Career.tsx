import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>HSC – Higher Secondary Certificate</h4>
                <h5>Grace Matric Hr Sec School, Madurai</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Completed Higher Secondary Certificate. Built a strong foundation in core academic subjects.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Computer Applications (BCA)</h4>
                <h5>The American College, Madurai</h5>
              </div>
              <h3>2020–2023</h3>
            </div>
            <p>
              Gained strong foundations in programming, data structures, and web technologies. Developed projects including a Pet Clinic Management System and a Patient Food Recommendation System.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master of Computer Applications (MCA)</h4>
                <h5>Mepco Schlenk Engineering College, Sivakasi</h5>
              </div>
              <h3>2024–2026</h3>
            </div>
            <p>
              Pursuing MCA focused on advanced software development, databases, and system design. Actively exploring full-stack technologies and participating in technical events.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern – Web & AI Development</h4>
                <h5>WAIOZ Consultanc Services Pvt Ltd,Madurai</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Worked on frontend and backend web development tasks. Contributed to building responsive UI components, RESTful API integrations using React.js and Node.js, and developed AI-based features leveraging large language models.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;