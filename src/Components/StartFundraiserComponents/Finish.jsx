import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import { useNavigate } from "react-router-dom";

const Finish = ({ formnumber, setFormnumber, formData, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleEdit = (step) => {
    setShowReviewModal(false);
    setFormnumber(step);
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("Please login to continue");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      const campaign = {
        title: formData.title,
        category: formData.category,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        target_amount: formData.target_amount,
        userId,
        country: formData.country,
        city: formData.city,
        isTrending: false,
        text: formData.text,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        toBeShown: false,
        status: "PENDING",
        beneficiaryName: formData.beneficiaryName,
        email: formData.beneficiaryEmail,
        contact: formData.beneficiaryMobile,
      };

      data.append("campaign", JSON.stringify(campaign));

      formData.fundraiserImages?.forEach((file) => {
        data.append("fundraiserImages", file);
      });

      formData.documents?.forEach((file) => {
        data.append("documents", file);
      });

      const response = await axios.post(
        `${BASE_URL}/api/campaigns/create-campaign`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Your campaign has been submitted for review. You will receive a call within 24 to 48 hours. Thank you!");
        setShowReviewModal(false);
        onSubmit();
        navigate("/");
      }
    } catch (error) {
      console.error("Submit error:", error);
      const message = error.response?.data?.message || "Something went wrong.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  return (
    <Container>
  <Modal 
    show={showReviewModal} 
    onHide={() => setShowReviewModal(false)}  
    size="lg"
    dialogClassName="custom-modal"
  >
    <Modal.Header closeButton>
      <Modal.Title className="custom-modal-title">Review Your Campaign</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Card className="mb-3">
        <Card.Header >Fundraiser Details</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}><strong>Title:</strong> {formData.title || "N/A"}</Col>
            <Col md={6}><strong>Category:</strong> {formData.category || "N/A"}</Col>
          </Row>
          <Row>
            <Col md={6}><strong>Country:</strong> {formData.country || "N/A"}</Col>
            <Col md={6}><strong>City:</strong> {formData.city || "N/A"}</Col>
          </Row>
          <Row>
            <Col md={6}><strong>First Name:</strong> {formData.firstName || "N/A"}</Col>
            <Col md={6}><strong>Last Name:</strong> {formData.lastName || "N/A"}</Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Header>Story Details</Card.Header>
        <Card.Body>
          <div dangerouslySetInnerHTML={{ __html: formData.text || "<p>N/A</p>" }} />
          {formData.image && (
            <div className="mt-3 text-center">
              <h5>Uploaded Image</h5>
              <img src={formData.image} alt="Fundraiser" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Final Details</Card.Header>
        <Card.Body>
          <Row>
            <Col md={12}><strong>Security Question:</strong> {formData.securityQuestion || "N/A"}</Col>
          </Row>
          <Row>
            <Col md={12}><strong>Security Answer:</strong> {formData.securityAnswer || "N/A"}</Col>
          </Row>
          <Row>
            <Col md={12}><strong>How You Heard About Us:</strong> {formData.howYouHeard || "N/A"}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={() => handleEdit(1)}>Edit Fundraiser Details</Button>
      <Button variant="outline-secondary" onClick={() => handleEdit(2)}>Edit Story</Button>
      <Button variant="outline-secondary" onClick={() => handleEdit(3)}>Edit Final Details</Button>
      <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Modal.Footer>
  </Modal>

  <div className="text-center mt-4">
    <Button variant="warning" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Finish"}
    </Button>
  </div>
</Container>

  );
};

export default Finish;
