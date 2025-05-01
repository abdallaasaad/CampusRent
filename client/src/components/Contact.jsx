import React from "react";
import "../styles/Form.css";

function Contact() {
  return (
    <div className="form-page">
      <div className="form-wrapper glass-box">
        <h2 className="form-title">Contact Us</h2>
        <form className="form-grid">
          <label>Full Name</label>
          <input type="text" placeholder="Your full name" required />

          <label>Email</label>
          <input type="email" placeholder="Your email address" required />

          <label>Subject</label>
          <input type="text" placeholder="Subject of your message" required />

          <label>Message</label>
          <textarea rows="4" placeholder="Your message..." required></textarea>

          <button type="submit" className="btn gradient-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
