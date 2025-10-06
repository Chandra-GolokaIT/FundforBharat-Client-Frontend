import React, { useEffect, useState } from "react";
import "../HomepageComponents/SharePanel.css";
import { BASE_URL } from "../../constants/constant";

const shareTargets = [
    { name: "WhatsApp", url: "https://wa.me/?text=", icon: "W" },
    { name: "X", url: "https://twitter.com/intent/tweet?text=", icon: "X" },
    { name: "Facebook", url: "https://www.facebook.com/sharer/sharer.php?u=", icon: "F" },
    { name: "Email", url: "mailto:?body=", icon: "✉" },
    { name: "KakaoTalk", url: "https://sharer.kakao.com/talk/friends/picker/link?url=", icon: "K" },
    { name: "Reddit", url: "https://www.reddit.com/submit?url=", icon: "R" },
    { name: "VK", url: "https://vk.com/share.php?url=", icon: "V" },
    { name: "OK", url: "https://connect.ok.ru/offer?url=", icon: "O" },
    { name: "Pinterest", url: "https://pinterest.com/pin/create/button/?url=", icon: "P" },
    { name: "Blogger", url: "https://www.blogger.com/blog-this.g?u=", icon: "B" },
    { name: "Tumblr", url: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=", icon: "T" },
    { name: "LinkedIn", url: "https://www.linkedin.com/sharing/share-offsite/?url=", icon: "L" },
];

const YouTubeSharePanel = ({ onClose, fundraiserId }) => {
    const FRONTEND_URL = "http://localhost:5173";
    const [isSharePage, setIsSharePage] = useState(false);
    const [campaignTitle, setCampaignTitle] = useState("Amazing Fundraiser");
    const [campaignDescription, setCampaignDescription] = useState("Help support this important cause!");

    const shareLink = `${FRONTEND_URL}/individualcampaign/${fundraiserId}`;
    const shareMessage = `Check out this fundraiser: ${campaignTitle} - ${campaignDescription}`;

    useEffect(() => {
        const path = window.location.pathname;
        setIsSharePage(path.includes('/share/'));
    }, [fundraiserId]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink)
            .then(() => alert('Link copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    };

    const handleShare = (target) => {
        let shareUrl;
        
        // Platform-specific URL construction
        switch(target.name) {
            case "Email":
                shareUrl = `${target.url}${encodeURIComponent(`${shareMessage}\n\n${shareLink}`)}`;
                window.location.href = shareUrl;
                return;
                
            case "WhatsApp":
                shareUrl = `${target.url}${encodeURIComponent(`${shareMessage} ${shareLink}`)}`;
                break;
                
            case "X":
                shareUrl = `${target.url}${encodeURIComponent(`${shareMessage} ${shareLink}`)}`;
                break;
                
            case "Facebook":
                shareUrl = `${target.url}${encodeURIComponent(shareLink)}`;
                break;
                
            case "LinkedIn":
                shareUrl = `${target.url}${encodeURIComponent(shareLink)}`;
                break;
                
            default:
                shareUrl = `${target.url}${encodeURIComponent(shareLink)}`;
        }
        
        window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    if (isSharePage) {
        return (
            <div className="share-template">
                <div className="share-content">
                    <h1>{campaignTitle}</h1>
                    <p>{campaignDescription}</p>
                    <div className="share-options">
                        {shareTargets.map((target, i) => (
                            <button
                                key={i}
                                className="share-button"
                                onClick={() => handleShare(target)}
                                aria-label={`Share on ${target.name}`}
                            >
                                <div className="icon-placeholder">{target.icon}</div>
                                <span>{target.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="share-link">
                        <input type="text" value={shareLink} readOnly />
                        <button onClick={copyToClipboard}>Copy Link</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="youtube-share-panel">
            <button className="close-button" aria-label="Close share panel" onClick={onClose}>
                <span aria-hidden="true">✕</span>
            </button>

            <div className="panel-header">
                <h2 className="section-title text-xl">Share the Fundraiser to your friends</h2>
            </div>

            <div className="share-icons-container">
                <div className="share-icons">
                    {shareTargets.map((target, i) => (
                        <button
                            key={i}
                            className="share-button"
                            onClick={() => handleShare(target)}
                            aria-label={`Share on ${target.name}`}
                        >
                            <div className="icon-placeholder">{target.icon}</div>
                            <div className="label">{target.name}</div>
                        </button>
                    ))}
                </div>
            </div>
            <h6 className="pt-3">Copy the link and share it with your friends</h6>
            <div className="copy-link-section">
                <input
                    type="text"
                    value={shareLink}
                    readOnly
                />
                <button className="copy-btn" onClick={copyToClipboard}>Copy</button>
            </div>
        </div>
    );
};

export default YouTubeSharePanel;