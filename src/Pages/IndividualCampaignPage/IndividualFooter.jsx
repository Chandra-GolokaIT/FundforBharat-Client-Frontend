import React, { useState, useEffect } from 'react';
import "./IndividualFooter.css";

const IndividualFooter = ({ campaignName }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isNearFooter, setIsNearFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (!footer) return;

            const footerPosition = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            setIsNearFooter(footerPosition < windowHeight - 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsVisible(!isNearFooter);
    }, [isNearFooter]);

    const handleDonateClick = () => {
        console.log("Donation button clicked from sticky bar");
    };

    if (!isVisible) return null;

    return (
        <div id="stickySharingBar" className="sticky-sharing-bar">
            <div className="sticky-container bg-white">
                <div className="sticky-content">
                    <div className="cta-row">
                        <h4 className="campaign-title">Support {campaignName || 'this campaign'}</h4>
                        <button
                            className="donate-button"
                            onClick={handleDonateClick}
                            aria-label="Donate Now"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualFooter;