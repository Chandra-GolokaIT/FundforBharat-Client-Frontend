import React from "react";
import "./style.css"; // Ensure to import your CSS file

const YouTubeSection = () => {
  return (
    <div className="yt-section d-flex flex-column align-items-center">
      <h1
        className="text-center"
        style={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        What is Crowdfunding?
      </h1>
      <div className="heading-border mx-auto mb-4"></div>
      <p
        className="text-center yt-heading"
        style={{ width: "600px", color: "grey", marginBottom: "40px" }}
      >
        Crowdfunding is a method of raising funds through the collective effo rt
        of a large number of people, typically via the internet. This approach
        taps into the collective resources of friends, family, customers, and
        individual investors to support a specific project or cause.
      </p>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5 mt-3 w-100 px-5 yt-video-section">
        <div className="video-wrapper">
          <iframe
            className="responsive-iframe"
            src="https://www.youtube.com/embed/XMNEDhRoD8g?si=jXpII-6nj43invuN"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="yt-content">
          <h4 style={{ fontWeight: "bold" }}>
            How Does Crowdfunding Work on Fund for Bharat?
          </h4>
          <p style={{ marginTop: "15px", textAlign: "justify" }}>
            Imagine you or someone you care about is faced with an unexpected
            financial crisis, such as medical bills from an accident. In such
            stressful times, finding the needed funds quickly can be
            overwhelming. This is where Fund for Bharat's crowdfunding platform
            comes into play. Let's say your friend meets with an accident and
            incurs substantial medical expenses. They need ₹5 Lakh to cover
            their bills. You can sign up on Fund for Bharat, provide the
            necessary verification documents, and within minutes, create a
            campaign to raise the required funds.
          </p>
          <p style={{ marginTop: "15px", textAlign: "justify" }}>
            Once the campaign is live, it can be shared widely via WhatsApp,
            Instagram, Twitter, Facebook, and email. This widespread sharing
            allows friends, family, and even strangers who resonate with the
            cause to contribute. In a short time, funds begin to flow in,
            helping to alleviate the financial burden. Fund for Bharat’s
            platform not only makes the fundraising process swift and
            straightforward but also fosters a sense of community and support,
            turning a challenging situation into a collective effort of kindness
            and generosity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
