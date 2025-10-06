import React, { useRef, useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

function FundRaiserStory({ formnumber, setFormnumber, formData, setFormData, onComplete }) {
  const [userImages, setUserImages] = useState({ files: [], previews: [] });
  const [userDoc, setUserDoc] = useState({ files: [], previews: [] });
  const imageUploadRef = useRef(null);
  const documentUploadRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [text, setText] = useState("");
  
  const securityQuestions = [
    'What was the name of your first pet?',
    'What is your mothers maiden name?',
    'What is the colour of your first car?',
  ];
  
  const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState(securityQuestions[2]);
  const [securityAnswer, setSecurityAnswer] = useState('');

  // Clean up object URLs
  useEffect(() => {
    return () => {
      userImages.previews.forEach(preview => {
  if (preview.preview) URL.revokeObjectURL(preview.preview);
});

      userDoc.previews.forEach(preview => {
        if (preview.preview) URL.revokeObjectURL(preview.preview);
      });
    };
  }, [userImages, userDoc]);

  function handleImageUpload() {
    imageUploadRef.current.click();
  }

  function handleDocumentUpload() {
    documentUploadRef.current.click();
  }

  function uploadImageDisplay(e) {
  const uploadedImages = Array.from(e.target.files);
  if (!uploadedImages.length) return;

  const totalFiles = userImages.files.length + uploadedImages.length;
  if (totalFiles > 4) {
    alert(`You can only upload 4 images. You already have ${userImages.files.length} files.`);
    e.target.value = ''; // Clear the input
    return;
  }

  const newPreviews = uploadedImages.map(file => ({
    name: file.name,
    preview: URL.createObjectURL(file)
  }));

  setUserImages({
    files: [...userImages.files, ...uploadedImages],
    previews: [...userImages.previews, ...newPreviews]
  });
}

function removeImage(index) {
  const updatedFiles = [...userImages.files];
  const updatedPreviews = [...userImages.previews];

  if (updatedPreviews[index]?.preview) {
    URL.revokeObjectURL(updatedPreviews[index].preview);
  }

  updatedFiles.splice(index, 1);
  updatedPreviews.splice(index, 1);

  setUserImages({
    files: updatedFiles,
    previews: updatedPreviews
  });
}




  function uploadDocumentDisplay(e) {
    const uploadedDocs = Array.from(e.target.files);
    if (!uploadedDocs.length) return;

    // Calculate total files after upload
    const totalFiles = userDoc.files.length + uploadedDocs.length;
    if (totalFiles > 4) {
      alert(`You can only upload 4 files total. You already have ${userDoc.files.length} files.`);
      e.target.value = ''; // Clear the input
      return;
    }

    // Create previews for new files
    const newPreviews = uploadedDocs.map(file => ({
      name: file.name,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    setUserDoc({
      files: [...userDoc.files, ...uploadedDocs],
      previews: [...userDoc.previews, ...newPreviews]
    });
  }

  function removeDocument(index) {
    const updatedFiles = [...userDoc.files];
    const updatedPreviews = [...userDoc.previews];
    
    // Revoke the object URL if it exists
    if (updatedPreviews[index]?.preview) {
      URL.revokeObjectURL(updatedPreviews[index].preview);
    }
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setUserDoc({
      files: updatedFiles,
      previews: updatedPreviews
    });
  }

  const validateStory = () => {
    const errors = {};
    if (!text || text.trim() === "") {
      errors.text = "Please write your story!";
    }
    if (userImages.files.length === 0) {
  errors.userImage = "Please upload at least one photo!";
}

    if (userDoc.files.length === 0) {
      errors.userDoc = "Please upload at least one document";
    }
    if (!securityAnswer.trim()) {
      errors.securityAnswer = "Please enter your answer";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validateStory();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

setFormData(prev => ({
  ...prev,
  fundraiserImages: userImages.files,
  documents: userDoc.files,
  text,
  securityQuestion: selectedSecurityQuestion,
  securityAnswer,
}));

    
    onComplete();
    setFormnumber(f => f + 1);
  };

  return (
    <div className="fundraiserstory_container">
      <form onSubmit={handleSubmit}>
        <div className="fundraiserstory_main-heading">Fundraiser Story</div>
        
        <div className="yourfundraiserstory_container">
          <div className="storycontainersubheading">Your fundraiser story</div>
          <div className="storycontainerpara">
            Explain why you're raising money, what the funds will be used for,
            and how much you value the support
          </div>
          <div className="texteditor">
            <TextEditor
              value={text}
              onChange={(value) => setText(value)}
            />
            {errors.text && <p className="error-message">{errors.text}</p>}
          </div>
        </div>

        <div className="uploadfundraiserphotos_container">
          <div className="storycontainersubheading">
            Upload fundraiser photos
          </div>
          <div className="storycontainerpara">
            You can select and upload several in one go
          </div>
<div className="upload-container">
  <div
    className="upload-image-container"
    onClick={handleImageUpload}
    style={{
      border: '2px dashed #ccc',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      minHeight: '150px'
    }}
  >
    {userImages.files.length > 0 ? (
      <>
        <div
          className="uploaded-files-preview"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '15px'
          }}
        >
          {userImages.previews.map((img, index) => (
            <div
              key={index}
              className="uploaded-file-preview"
              style={{
                border: '1px solid #eee',
                borderRadius: '4px',
                padding: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
              <p style={{
                fontWeight: "bold",
                color: "#333",
                margin: '5px 0',
                fontSize: '12px',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                textAlign: 'center'
              }}>
                {img.name}
              </p>
              <img
                src={img.preview}
                alt={`Fundraiser ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80px",
                  objectFit: 'contain'
                }}
              />
            </div>
          ))}
        </div>
        {userImages.files.length < 6 && (
          <div style={{ marginTop: '10px' }}>
            <IoAddCircleOutline size={30} />
            <span>Click to add more images ({6 - userImages.files.length} remaining)</span>
          </div>
        )}
      </>
    ) : (
      <div className="upload-image-container-content">
        <IoAddCircleOutline size={30} />
        <span>Click to upload images (Max 6, JPG/PNG)</span>
      </div>
    )}

    {userImages.files.length > 0 && (
      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        {userImages.files.length}/4 files selected
      </div>
    )}

    {errors.userImage && (
      <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>
        {errors.userImage}
      </p>
    )}
  </div>

  <input
    type="file"
    hidden
    multiple
    ref={imageUploadRef}
    accept="image/*"
    onChange={uploadImageDisplay}
  />
</div>


        </div>

        <div className="uploadfundraiserphotos_container">
          <div className="storycontainersubheading">
            Upload Medical Documents
          </div>
          <div className="storycontainerpara">
            You can upload reports, bills, estimation letters etc. (Max 4 files)
          </div>

          <div className="upload-container">
            <div
              className="upload-image-container"
              onClick={handleDocumentUpload}
              style={{
                border: '2px dashed #ccc',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                minHeight: '150px'
              }}
            >
              {userDoc.files.length > 0 ? (
                <>
                  <div
                    className="uploaded-files-preview"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                      marginBottom: '15px'
                    }}
                  >
                    {userDoc.previews.map((doc, index) => (
                      <div
                        key={index}
                        className="uploaded-file-preview"
                        style={{
                          border: '1px solid #eee',
                          borderRadius: '4px',
                          padding: '5px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative'
                        }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeDocument(index);
                          }}
                          style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer'
                          }}
                        >
                          ×
                        </button>
                        <p style={{
                          fontWeight: "bold",
                          color: "#333",
                          margin: '5px 0',
                          fontSize: '12px',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          width: '100%',
                          textAlign: 'center'
                        }}>
                          {doc.name}
                        </p>
                        {doc.preview && (
                          <img
                            src={doc.preview}
                            alt={`Document ${index + 1}`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "80px",
                              objectFit: 'contain'
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {userDoc.files.length < 4 && (
                    <div style={{ marginTop: '10px' }}>
                      <IoAddCircleOutline size={30} />
                      <span>Click to add more documents ({4 - userDoc.files.length} remaining)</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="upload-image-container-content">
                  <IoAddCircleOutline size={30} />
                  <span>Click to upload documents (Max 4, PDF, JPG, PNG)</span>
                </div>
              )}

              {userDoc.files.length > 0 && (
                <div style={{ marginTop: '10px', fontSize: '12px' }}>
                  {userDoc.files.length}/4 files selected
                </div>
              )}

              {errors.userDoc && (
                <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                  {errors.userDoc}
                </p>
              )}
            </div>

            <input
              type="file"
              hidden
              multiple
              ref={documentUploadRef}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={uploadDocumentDisplay}
            />
          </div>
        </div>

        <div className="yourfundraiserstory_container" style={{ paddingTop: '50px' }}>
          <div className="storycontainersubheading">Account security question</div>
          <div className="storycontainerpara">
            Please pick and answer a security question. We will ask you for the answer 
            in the event of you losing access to your account and associated email address.
          </div>
          <select
            className="form-select bordered-form-select border-radius-form-select"
            value={selectedSecurityQuestion}
            onChange={(e) => setSelectedSecurityQuestion(e.target.value)}
            required
            style={{ marginBottom: '20px' }}
          >
            {securityQuestions.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Your answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
          {errors.securityAnswer && (
            <p className="error-message">{errors.securityAnswer}</p>
          )}
        </div>

        <div className="yourvideourl_container" style={{ paddingTop: "50px" }}>
          <div className="storycontainersubheading">Your video URL</div>
          <div className="storycontainerpara">
            The inclusion of a personalized video can help your fundraiser raise
            more money. We support links from YouTube and Vimeo. Simply copy
            paste your video link into the field below.
          </div>
          <p style={{
            fontWeight: "bold",
            marginBottom: "6px",
            paddingTop: "10px",
            fontSize: "17px",
          }}>
            Video URL
          </p>
          <input 
            type="text" 
            placeholder="http://" 
            className="form-control"
          />
        </div>

        <div className="storycontainersubheading pt-5">Facebook Profile Link</div>
        <div className="storycontainerpara">
          Is this fundraiser shown in other places? If so, add links to those pages.
        </div>
        <div className="input-group custom_input-group" style={{ borderRadius: '10px', marginTop: '10px' }}>
          <div className="input-group-prepend custom-input-group-prepend">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle donate_now_modal_header-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Facebook
              </button>
              <ul className="dropdown-menu donate_now_modal_header-dropdown-menu">
                <li className="dropdown-item">LinkedIn</li>
                <li className="dropdown-item">Whatsapp</li>
                <li className="dropdown-item">Instagram</li>
              </ul>
            </div>
          </div>
          <input 
            type="text" 
            className="donate_now_modal_input form-control" 
            placeholder='Enter URL' 
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            backgroundColor: "#F15913",
            fontSize: "18px",
            fontWeight: "600",
            width: "100%",
            marginTop: "20px",
            padding: '12px',
            borderRadius: '8px'
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default FundRaiserStory;