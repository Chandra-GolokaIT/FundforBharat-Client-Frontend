import React, { useEffect, useState } from "react";
import img from "../../assets/images/IMG.jpg";
import { TiSocialFacebook } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMedkitOutline } from "react-icons/io5";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const CampaignCards = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState(8);
  const [campaigns, setCampaigns] = useState([]);

  const handleLoadMore = () => {
    setVisibleCards(campaigns.length);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  const fetchCampaigns = async () => {
    try {
      // console.log("token", token);
      const response = await axios.get(`${BASE_URL}/api/campaigns/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });   
      console.log("response", response.data);
      setCampaigns(response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.data.message
        );
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchCampaigns();
    }
  }, [token]);

  const campaigns2 = [
    {
      img: "https://st2.depositphotos.com/5653638/11498/i/450/depositphotos_114988162-handsome-pediatric-doctor-holding-a-baby-girl-male-doctor-with-small-girl-indian-doctor-indian-girl-patient-with-red-heart-stuffed-toy-heart-care-concept-and-doctor-with-girl-patient-isolated.jpg",
      description:
        "Scholar To Warrior, Help Sowmya Survive Rare Cancer. Donate Today!",
      by: "Satish Kumar",
      raised: "₹ 5,77,360",
      progress: 25,
      goal: 10,
    },
    {
      img: "https://img.freepik.com/premium-photo/asian-female-patient-with-happiness-lying-bed-hospital_33413-1834.jpg",
      description: "Help Ramesh with his Heart Surgery.",
      by: "Anita Sharma",
      raised: "₹ 3,00,000",
      progress: 50,
      goal: 60,
    },
    {
      img: "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg",
      description: "Support Priya's Education Fund.",
      by: "Rahul Verma",
      raised: "₹ 1,50,000",
      progress: 15,
      goal: 25,
    },
    {
      img: "https://t4.ftcdn.net/jpg/05/00/42/35/360_F_500423592_VlguK8aRlIg67DKFMGXG9cnV6AZGKyBb.jpg",
      description: "Help Arun with Kidney Transplant.",
      by: "Geeta Singh",
      raised: "₹ 4,00,000",
      progress: 80,
      goal: 90,
    },
    {
      img: "https://st2.depositphotos.com/1643295/6104/i/450/depositphotos_61047749-stock-photo-indian-woman-in-sari.jpg",
      description: "Assist Meera in her Cancer Treatment.",
      by: "Suresh Naik",
      raised: "₹ 2,00,000",
      progress: 40,
      goal: 50,
    },
    {
      img: "https://api.parashospitals.com/uploads/2018/03/syeda2-kYV-621x414@LiveMint.jpg",
      description: "Aid Ravi's Post-Surgery Recovery.",
      by: "Priya Raj",
      raised: "₹ 3,50,000",
      progress: 70,
      goal: 75,
    },
    {
      img: img,
      description: "Contribute to Asha's Eye Surgery.",
      by: "Vinod K",
      raised: "₹ 1,75,000",
      progress: 35,
      goal: 45,
    },
    {
      img: "https://img.freepik.com/premium-photo/happy-senior-patient-using-zimmer-frame_53876-155998.jpg",
      description: "Fund Kiran's Brain Surgery.",
      by: "Pooja Mehta",
      raised: "₹ 6,00,000",
      progress: 85,
      goal: 95,
    },
    {
      img: img,
      description: "Help Dev with Spinal Surgery.",
      by: "Ravi Shah",
      raised: "₹ 2,50,000",
      progress: 45,
      goal: 55,
    },
    {
      img: img,
      description: "Support Maya's Chemotherapy.",
      by: "Arjun R",
      raised: "₹ 4,25,000",
      progress: 65,
      goal: 75,
    },
    {
      img: img,
      description: "Support Maya's Chemotherapy.",
      by: "Arjun R",
      raised: "₹ 4,25,000",
      progress: 65,
      goal: 75,
    },
    {
      img: img,
      description: "Support Maya's Chemotherapy.",
      by: "Arjun R",
      raised: "₹ 4,25,000",
      progress: 65,
      goal: 75,
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-center gap-4 my-4 flex-wrap">
        {campaigns?.slice(0, visibleCards).map((campaign, index) => {
          const progressPercentage =
            campaign.targetAmount > 0
              ? (campaign.amountRaised / campaign.targetAmount) * 100
              : 0;
              const fundraiserImage = campaign.documents?.find(
            (doc) => doc.doc_type === "fundraiserImage"
          )?.doc_url;
          return (
            <Tilt
              key={index}
              glareEnable={false}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
            >
              <div
                className="card gradient-border-card"
                style={{ width: "18rem" }}
                key={index}
                onClick={() => navigate(`/individualcampaign/${campaign.id}`)}
              >
        <img
        src={fundraiserImage || img}
        className="card-img-top"
        alt="Fundraiser"
        style={{ height: "200px", objectFit: "cover" }}
      />

                <div className="card-body ">
                  
                   
                  
                  <h5 className="card-title">
                    {truncateText(campaign.title, 40)}
                  </h5>
                  <p className="card-text">{campaign.description}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: "14px", color: "green" }}>
                      Rs {campaign.amountRaised} Raised
                    </span>{" "}
                    <span style={{ fontSize: "14px", color: "green" }}>
                      Rs {campaign.target_amount}
                    </span>
                  </div>
                  <div
                    className="progress mb-3"
                    role="progressbar"
                    aria-label="Success example"
                    aria-valuenow={progressPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "6px" }}
                  >
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: `${progressPercentage}%`,
                        height: "6px",
                      }}
                    ></div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <button
                      className="btn"
                      style={{
                        borderRadius: "40px",
                        background: "none",
                        border: "2px solid #d54400",
                        color: "#d54400",
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Share <IoArrowRedoSharp />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/individualcampaign/${campaign.id}`)
                      }
                      
                      className="btn"
                      style={{
                        borderRadius: "40px",
                        background: "#d54400",
                        color: "white",
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </Tilt>
          );
        })}
      </div>
      {visibleCards < campaigns.length && (
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn"
            style={{
              borderRadius: "40px",
              background: "goldenRod",
              color: "white",
              marginBottom: "30px",
            }}
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignCards;
