// DonationForm.jsx

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
const DonationForm = ({ show, handleClose , campaign}) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const { id } = useParams();
  const [campaigns, setCampaigns] = useState({});
  const handleDonateNow = () => {
    setShowFormModal(true);
  };

  const handleFormClose = () => {
    setShowFormModal(false);
  };
   useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/campaigns/getById/${id}`);
        const campaignData = response.data;

        // Separate the documents by type
        const fundraiserImages = campaignData.documents?.filter(doc => doc.doc_type === "fundraiserImage") || [];
        const documentFiles = campaignData.documents?.filter(doc => doc.doc_type === "documentFiles") || [];

        setCampaigns({
          ...campaignData,
          fullName: campaignData.fullName,
          fundraiserImages,
          documentFiles,
        });

      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    loadCampaigns();
  }, []);


  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{
          width: "100%",
          top: '70px',
          paddingBottom: '100px'
        }}
        dialogClassName="custom-modal"
      >
        <Modal.Body className="d-flex flex-column align-items-center">
          <div style={{ position: "absolute", right: "5%", cursor: "pointer" }}>
            <RxCross2 onClick={handleClose} size={30} />
          </div>
          <div
            className="w-100 d-flex justify-content-center py-3"
            style={{ background: "rgb(250, 233, 210)" }}
          >
            <img
              src= {campaigns.fundraiserImages?.[0]?.doc_url || "https://via.placeholder.com/300x200"}
              style={{ width: "300px", height: "200px" }}
            />
          </div>
          <p className="mt-3">
            Your donations will make a world of difference to{" "}
          </p>
          <p>
            <b>{campaigns.beneficiaryName}</b>
          </p>
          <Button
            variant="primary"
            style={{
              width: "50%",
              background: "#d54400",
              border: "none",
              height: "40px",
              fontSize: "20px",
            }}
            onClick={handleDonateNow}
          >
            Donate Now
          </Button>
          <span className="my-1">OR</span>
          <a style={{ color: "green" }} href="">
            Choose a different amount
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DonationForm;
