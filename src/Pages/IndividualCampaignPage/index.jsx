import React, { useEffect, useRef, useState } from "react";
import LatestUpdate from "../../Components/IndividualCampaignPageComponents/LatestUpdate";
import StoryHighlights from "../../Components/IndividualCampaignPageComponents/StoryHighlights";
import TopInfluencers from "../../Components/IndividualCampaignPageComponents/TopInfluencers";
import AllDonations from "../../Components/IndividualCampaignPageComponents/AllDonations";
import FundRaiseCause from "../../Components/IndividualCampaignPageComponents/FundRaiseCause";
import AllUpdates from "../../Components/IndividualCampaignPageComponents/AllUpdates";
import CommentBox from "../../Components/IndividualCampaignPageComponents/CommentBox";
import BankDetails from "../../Components/IndividualCampaignPageComponents/BankDetails";
import "../../Components/IndividualCampaignPageComponents/style.css";
import MainSection from "../../Components/IndividualCampaignPageComponents/MainSection";
import DonationForm from "../../Components/IndividualCampaignPageComponents/DonationForm";
import PatientDocuments from "../../Components/IndividualCampaignPageComponents/PatientDocuments";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import IndividualFooter from "./IndividualFooter";

function IndividualCampaignPage() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [docError, setDocError] = useState(null);

  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/campaigns/getById/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };
    
    fetchCampaign();
  }, [id]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    
    return () => clearTimeout(timer);
  }, [id]);


  const handleClose = () => setShowPopup(false);

  const allUpdatesRef = useRef(null);
  const scrollToAllUpdates = () => {
    if (allUpdatesRef.current) {
      allUpdatesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <MainSection campaign={campaign} 
      donationCount={campaign.donations ? campaign.donations.length : 0} />
      <div className="campaign-detail-page d-flex justify-content-center gap-5">
        <div className="">

          <StoryHighlights />
          <br />
          <LatestUpdate onReadMore={scrollToAllUpdates} campaign={campaign}/>
          {/* <BankDetails /> */}
      {/*    <div ref={allUpdatesRef}>
            <AllUpdates />
          </div>
          */}
          <PatientDocuments
            documents={documents}
            loading={loadingDocs}
            error={docError}
          />
          <CommentBox campaignId={id} />
        </div>
        <div className="">
          <TopInfluencers donationsList={campaign.donations} />
          <AllDonations campaignId={id}  donationsList={campaign.donations} />
          <FundRaiseCause />
        </div>
        <DonationForm show={showPopup} handleClose={handleClose} campaign={campaign}/>
      </div>
      <div>
        <IndividualFooter campaignName={campaign.beneficiaryName} />
      </div>
    </>
  );
}

export default IndividualCampaignPage;
