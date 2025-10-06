import React from "react";
import { FaCircleCheck, FaArrowRightLong } from "react-icons/fa6";
import img from "../../assets/images/career.png";
import img2 from "../../assets/images/core-values.png";
import "./styles.css"; // Assuming styles are here

const CoreValuesContainer = () => {
  return (
    <section className="core-values-section">
      <div className="row m-0 align-items-center justify-content-center flex-wrap-reverse gap-4 px-3">
        <div className="col-md-6">
          <h3 className="text-dark"><b>Our Core Values</b></h3>
          <p className="small-text ">
            We work by our values. We’re building products we believe in,
            helping people simplify their work and bring more of themselves to it.
          </p>

          <div className="row text-muted fw-semibold small-values">
            {[
              { text: "Empathy", img: "emoji-empathy.jpg" },
              { text: "Courtesy", img: "emoji-courtesy.jpg" },
              { text: "Thriving", img: "emoji-thriving.jpg" },
              { text: "Craftsmanship", img: "emoji-craftsmenship.jpg" },
              { text: "Playfulness", img: "emoji-playfulness.jpg" },
              { text: "Solidarity", img: "emoji-solidarity.jpg" },
            ].map(({ text, img }, i) => (
              <div className="col-6 d-flex align-items-center gap-2 my-1" key={i}>
                <img
                  src={`https://a.slack-edge.com/ddb1dac/marketing/img/careers/refresh/${img}`}
                  width="20"
                  height="20"
                  alt={text}
                />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-5 text-center">
          <img
            src={img2}
            alt="Core values illustration"
            className="img-fluid core-image"
          />
        </div>
      </div>

      <div className="row m-0 align-items-center justify-content-center flex-wrap px-3 mt-5">
        <div className="col-md-5 text-center">
          <img
            src={img}
            alt="Working illustration"
            className="img-fluid core-image"
          />
        </div>

        <div className="col-md-6">
          <h3 className="text-dark"><b>Working and thriving</b></h3>
          <p className="small-text">
            Access benefits, resources and expert guidance for your well-being
            and professional growth.
          </p>
          <ul className="list-unstyled small-text mb-3">
            <li><FaCircleCheck className="text-danger me-2" /> Time off to rest, recharge & volunteer</li>
            <li><FaCircleCheck className="text-danger me-2" /> Exceptional healthcare coverage</li>
            <li><FaCircleCheck className="text-danger me-2" /> Holistic wellbeing & family planning</li>
          </ul>
          <a href="#" className="text-success text-decoration-none fw-semibold">
            Learn more about benefits <FaArrowRightLong />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesContainer;
