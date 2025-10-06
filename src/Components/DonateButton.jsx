import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IoIosArrowUp } from "react-icons/io";
import { FaHandHoldingHeart } from "react-icons/fa";
import img from "../assets/images/hands.png";
import { toast } from "react-toastify";

const DonateButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [donationCause, setNDonationCause] = useState("");
  const [amount, setAmount] = useState('');

  const handleDonateNow = () => {
    setShowFormModal(true);
  };

  const handleFormClose = () => {
    setShowFormModal(false);
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  {/*------------------------------Dontate button validations-------------------------------- */}

 


  const validateDonate = () => {
    const formErrors = {};
    if (!Name.trim()) {
      formErrors.Name = "Please enter your name";
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }
   

    if (!donationCause.trim()) {
      formErrors.donationCause = "Please enter donation cause";
    }
    if (!amount.trim()) {
      formErrors.amount = "Please enter amount";
    }
    return formErrors;
  };

  const handleDonate = (e) => {
    e.preventDefault(); 
    const formErrors = validateDonate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); 
      toast.error("Please enter details before send!!")
    } else {
      setErrors({}); 
      console.log("Form submitted successfully with Name:", Name);
      handleFormClose(); 
      setTimeout(() => {
        toast.success(`Donated successfully!, ₹${amount}`); 
        setName('');
        setEmail('');
        setNDonationCause('');
        setAmount('');
        const modal = document.getElementById('searchModal');
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        modal.classList.remove('show');
        modal.style.display = 'none';
        modalBackdrop.remove();
        document.body.classList.remove('modal-open');
      },300);
    }
    
  };


  window.addEventListener("scroll", toggleVisibility);

  return (
    <div style={{ zIndex: "1000000" }}>
      <div className={` scroll-to-top ${isVisible ? "show" : ""}`}>
        <img src={img} width={"170px"} className="mb-2" />
        <button onClick={handleDonateNow}>
          Donate
          <FaHandHoldingHeart size={30} />
        </button>
      </div>

      {/* Donation Form Modal */}
      <Modal
        show={showFormModal}
        onHide={handleFormClose}
        centered
        dialogClassName="custom-modal2"
        style={{padding:"54px"}}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading ">Make a Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleDonate} >
            <div className="d-flex gap-3 ">
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label className="modal-label">Your Name</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="text"
                  placeholder="Enter your name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.Name && (
                    <p className="error-message" >
                      {errors.Name}
                    </p>
                  )}
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label className="modal-label">Email address</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="error-message" >
                      {errors.email}
                    </p>
                )}
              </Form.Group>
            </div>

            <Form.Group controlId="formCause" className="mb-4">
              <Form.Label className="modal-label">Donation Cause</Form.Label>
              <Form.Control
                className="modal-input"
                type="text"
                placeholder="Enter donation cause"
                value={donationCause}
                  onChange={(e) => setNDonationCause(e.target.value)}
              />
               {errors.donationCause && (
                    <p className="error-message" >
                      {errors.donationCause}
                    </p>
                  )}
            </Form.Group>

            <Form.Group controlId="formAmount" className="mb-4">
              <Form.Label className="modal-label">Donation Amount</Form.Label>
              <Form.Control
                className="modal-input"
                type="number"
                placeholder="Enter donation amount"
                value={amount}
                  onChange={(e) => setAmount(e.target.value)}
              />
               {errors.amount && (
                    <p className="error-message" >
                      {errors.amount}
                    </p>
                  )}
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-4">
              <Form.Label className="modal-label">
                Message (Optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                className="modal-input"
                rows={3}
                placeholder="Send your well wishes"
              />
            </Form.Group>
            <Button
            type="submit"
              variant="primary"
              style={{
                width: "100%",
                background: "#d54400",
                border: "none",
                height: "50px",
              }}
              // onClick={handleFormClose}
            >
              Send Donation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DonateButton;
