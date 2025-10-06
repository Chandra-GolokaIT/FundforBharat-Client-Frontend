import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./DonationForm.css";
import img from "../../../assets/images/Donation-box.jpg";
import { toast } from "react-toastify";

const DonationForm = ({ show, handleClose }) => {
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
    handleClose();
  };

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
      }, 300);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading" style={{ fontWeight: "600" }}>
            Help Us Make a Change!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src={img}
              alt="Donation Box"
              className="img-fluid modal-image"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{
              width: "100%",
              background: "#d54400",
              border: "none",
              height: "50px",
              fontSize: "20px",
            }}
            onClick={handleDonateNow}
          >
            Donate Now
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showFormModal}
        onHide={handleFormClose}
        centered
        dialogClassName="custom-modal2"
        // style={{ width: "100%", padding: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-heading">Make a Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleDonate}>
            <div className="d-flex gap-3">
              <Form.Group controlId="formName" className="mb-4">
                <Form.Label className="modal-label">Your Name</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="text"
                  placeholder="Enter your name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.Name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label className="modal-label">Your Email</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group controlId="formDonationCause" className="mb-4">
              <Form.Label className="modal-label">Donation Cause</Form.Label>
              <Form.Control
                className="modal-input"
                type="text"
                placeholder="Enter the cause"
                value={donationCause}
                onChange={(e) => setNDonationCause(e.target.value)}
                isInvalid={!!errors.donationCause}
              />
              <Form.Control.Feedback type="invalid">
                {errors.donationCause}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAmount" className="mb-4">
              <Form.Label className="modal-label">Amount</Form.Label>
              <Form.Control
                className="modal-input"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isInvalid={!!errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleFormClose}
                style={{ background: "#d54400", border: "none" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                style={{
                  background: "#d54400",
                  border: "none",
                  marginLeft: "10px",
                }}
              >
                Donate
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DonationForm;
