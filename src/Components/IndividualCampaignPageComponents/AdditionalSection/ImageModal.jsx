import React from "react";
import { Modal } from "react-bootstrap";

const ImageModal = ({ show, handleClose, image }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      style={{ marginTop: "150px" }}
      className="doc-img-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Image Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img src={image} alt="Expanded view" style={{ width: "100%" }} />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
