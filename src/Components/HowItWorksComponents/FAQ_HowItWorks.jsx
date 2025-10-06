import React from "react";

const FAQ_HowItWorks = () => {
  return (
    <div className="my-4">
      <div className="heading mt-4">
        <h2 className="text-center fs-4 " style={{ fontWeight: "bold" }}>
          FAQs
        </h2>
        <div className="heading-border mx-auto my-4"></div>
      </div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              How do I raise funds?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              To Start a Fundraiser, follow the three steps:
              <ol>
                <li>Sign up on Ketto.</li>
                <li>Fill up the form</li>
                <li>Hit Submit</li>
              </ol>
              To start a fundraiser, <a href="start-fundraiser">visit here</a>.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Can I raise funds for a friend as well?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Yes, you can also raise funds for a friend, a loved one or anyone
              in need during life's crucial moments
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Does the raised amount reach the individual directly?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              With Ketto, the money you collect goes directly to the bank
              account associated with your fundraising page. Raising money for
              yourself or anyone has never been easier.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Is it safe?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Your Ketto fundraiser features the very best in secure payment
              encryption technology. Not only are your donors online payments
              safe, your money is stored securely until you're ready to request
              a withdrawal via electronic bank transfer.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              What if I don't reach my goal?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              No problem. You will still receive the raised amount after the
              transactional processing fee. To know more about transactional
              processing fee, <a href="#">visit here</a>.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              I have more questions, who do I write to?
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              You can write to info@fundforbharat.org Know someone who needs
              funds for medical treatment urgently? Help them out by sharing
              this information with them
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ_HowItWorks;
