import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaWhatsapp, FaFacebookF, FaXTwitter, FaEnvelope, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';

const ShareCard = ({ show, handleClose, shareUrl }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Share in a post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Button variant="dark" size="sm">Create post</Button>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>No subscribers</p>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mb-3">
                    <Button variant="light"><FaAngleLeft /></Button>
                    <Button variant="success"><FaWhatsapp /></Button>
                    <Button variant="dark"><FaXTwitter /></Button>
                    <Button variant="primary"><FaFacebookF /></Button>
                    <Button variant="secondary"><FaEnvelope /></Button>
                    <Button style={{ backgroundColor: '#FFEB00', borderColor: '#FFEB00' }}>
                        <span style={{ fontWeight: 'bold', color: 'black' }}>K</span>
                    </Button>
                    <Button variant="light"><FaAngleRight /></Button>
                </div>

                <div className="d-flex align-items-center justify-content-between border rounded p-2">
                    <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="form-control border-0"
                        style={{ background: 'transparent' }}
                    />
                    <Button variant="outline-primary" onClick={handleCopy}>
                        <MdContentCopy />
                    </Button>
                </div>
                {copied && <p className="text-success text-center mt-2">Copied to clipboard!</p>}

                <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" id="startAtCheck" />
                    <label className="form-check-label" htmlFor="startAtCheck">
                        Start at <strong>1:05:40</strong>
                    </label>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ShareCard;
