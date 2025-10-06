import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageModal from "./AdditionalSection/ImageModal";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const PatientDocuments = () => {
  const [singleDoc, setSingleDoc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/campaigns/getById/${id}`);
        const allDocs = response.data.documents || [];
        const docFiles = allDocs.filter(doc => doc.doc_type === "documentFiles");
        setDocuments(docFiles);
        if (docFiles.length > 0) setSingleDoc(docFiles[0].doc_url);
      } catch (error) {
        console.error("Error fetching campaign documents:", error);
      }
    };

    loadCampaign();
  }, [id]);

  const handleImageClick = (docUrl) => {
    setSingleDoc(docUrl);
  };

  const handleSingleImageClick = () => {
    if (singleDoc) setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="latest-updates card my-4">
      <div className="card-header">
        <h5>Documents</h5>
      </div>
      <div className="docs-container card-body">
        {documents.length === 0 ? (
          <p className="text-muted">No documents found.</p>
        ) : (
          <>
            {singleDoc && (
              <div className="single-doc mb-3">
                <img
                  src={singleDoc}
                  alt="Selected Document"
                  onClick={handleSingleImageClick}
                  style={{
                    cursor: "pointer",
                    maxWidth: "100%",
                    borderRadius: "8px"
                  }}
                />
              </div>
            )}

            <div className="multiple-docs d-flex gap-2 flex-wrap">
              {documents.map((doc, index) => (
                <img
                  key={doc.id || index}
                  src={doc.doc_url}
                  alt={`Document ${index + 1}`}
                  className={singleDoc === doc.doc_url ? "selected" : ""}
                  onClick={() => handleImageClick(doc.doc_url)}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    cursor: "pointer",
                    border: singleDoc === doc.doc_url ? "2px solid #007bff" : "1px solid #ccc",
                    borderRadius: "5px"
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ImageModal show={showModal} handleClose={handleClose} image={singleDoc} />
    </div>
  );
};

export default PatientDocuments;
