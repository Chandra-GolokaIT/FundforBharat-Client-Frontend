import React from "react";
import Img from "../../assets/images/imgcontact.jpg";
import { IoLocation } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { TbHandClick } from "react-icons/tb";

function FormSection() {
  return (
    <div className="container4">
      <span className="big-circle"></span>
      <img src="img/shape.png" className="square" alt="" />
      <div className="c-form">
        <div className="contact-info">
          <h3 className="c-title">Let's get in touch</h3>
          <p className="c-text">
            Feel free to reach out to us via the form below as well. We aim to
            respond to all inquiries within 24 hours.
          </p>
          <div className="info">
            <div className="information">
              <IoLocation style={{ color: "#d54400" }} size={30} />
              <p>Mumbai, Maharashtra</p>
            </div>
            <div className="information">
              <IoMail style={{ color: "#d54400" }} size={30} />
              <p>info@ffb.com</p>
            </div>
            <div className="information">
              <FaPhone style={{ color: "#d54400" }} size={30} />
              <p>91+ 9876545670</p>
            </div>
            <div className="information">
              <TbHandClick style={{ color: "#d54400" }} size={30} />
              <p>www.fundforbharat.com</p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>
          <form>
            <h3 className="c-title">Contact us</h3>
            <div className="input-container">
              <input
                type="text"
                name="name"
                className="c-input"
                id="name"
                placeholder="Name"
              />
              <span>Username</span>
            </div>
            <div className="input-container">
              <input
                type="email"
                name="email"
                className="c-input"
                id="email"
                placeholder="Email"
              />
              <span>Email</span>
            </div>
            <div className="input-container">
              <input
                type="tel"
                name="phone"
                className="c-input"
                id="phone"
                placeholder="Phone"
              />
              <span>Phone</span>
            </div>
            <div className="input-container c-textarea">
              <textarea
                name="message"
                className="c-input"
                id="message"
                placeholder="How can we help you?"
              ></textarea>
              <span>Message</span>
            </div>
            <input type="submit" value="Send message" className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormSection;
