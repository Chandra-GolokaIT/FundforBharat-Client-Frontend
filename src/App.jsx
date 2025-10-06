import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import HomePage from "./Pages/HomePage";
import CampaignPage from "./Pages/CampaignPage";
import CareersPage from "./Pages/CareersPage";
import { Routes, Route, useLocation } from "react-router-dom";
import AboutUs from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import IndividualCampaignPage from "./Pages/IndividualCampaignPage/index.jsx";
import DonateButton from "./Components/DonateButton.jsx";
import FlashSale2 from "./Components/Layout/FlashSale2.jsx";
import GemPage from "./Pages/GemPage/index.jsx";
import PricingPage from "./Pages/PricingPage/index.jsx";
import SignUpPage from "./Pages/SignUpPage/index.jsx";
import LoginPage from "./Pages/LoginPage/index.jsx";
import HowItWorksPage from "./Pages/HowItWorksPage/index.jsx";
import BrowseFundraisersPage from "./Pages/BrowseFundraisersPage/index.jsx";
import ErrorPage from "./Pages/ErrorPage/index.jsx";
import FundraiseForPage from "./Pages/FundraiseFor/index.jsx";
import StartFundraiserPage from "./Pages/StartFundraiserPage/index.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import CategoryPage from "./Components/HomepageComponents/CategoryPages/CategoryPage.jsx";
import ProfilePage from "./Pages/ProfilePage/index.jsx";
import EditProfile from "./Pages/ProfilePage/EditProfile.jsx";
import { CurrencyProvider } from "./Components/Layout/CurrencyContext.jsx";
import SocialImpactPage from "./Pages/SocialImpactPage/index.jsx";
import SupporterSpacePage from "./Pages/SupporterSpacePage/index.jsx";
import BlogPostPage from "./Pages/SupporterSpacePage/BlogPostPage.jsx";
import TrendingFundraiser from "./Components/HomepageComponents/TrendingFundraiser.jsx";
import Discover from "./Components/HomepageComponents/CategoryPages/Discover.jsx";
import CrisisReliefPage from "./Pages/CrisisReliefPage/CrisisReliefPage.jsx";
import CrisisReliefDetailPage from "./Pages/CrisisReliefPage/CrisisReliefDetailPage.jsx";
function App() {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/signup"].includes(location.pathname);


  return (
    <CurrencyProvider>
      <div className="flex flex-col h-full w-full">
        {!hideNavAndFooter && (
          <div
            style={{ position: "fixed", top: "0", zIndex: "5000", width: "100%" }}
          >
            <FlashSale2 />
            <Navbar />
          </div>
        )}
        <ScrollToTop />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/campaign"} element={<CampaignPage />} />
          <Route path={"/careers"} element={<CareersPage />} />
          <Route path={"/about"} element={<AboutUs />} />
          <Route path={"/contact"} element={<ContactUsPage />} />
          <Route path={"/monthly-donor"} element={<GemPage />} />
          <Route path={"/pricing"} element={<PricingPage />} />
          <Route path={"/signup"} element={<SignUpPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path={"/individualcampaign/:id"} element={<IndividualCampaignPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/howitworks"} element={<HowItWorksPage />} />
          <Route path={"/browsefundraisers"} element={<BrowseFundraisersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/fundraise-for/:cause" element={<FundraiseForPage />} />
          <Route path="/start-fundraiser" element={<StartFundraiserPage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/fundraiser/:id" element={<IndividualCampaignPage />} />
          <Route path="/social-impact" element={<SocialImpactPage />} />
          <Route path="/supporter-space" element={<SupporterSpacePage />} />
          <Route path="/BlogPost/:id" element={<BlogPostPage />} />
          <Route path="/category/:category" element={<TrendingFundraiser />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="crisis-relief" element={<CrisisReliefPage />} />
          <Route path="crisis/:id" element={<CrisisReliefDetailPage />} />
        </Routes>
        {!hideNavAndFooter && <Footer />}
      </div>
    </CurrencyProvider>
  );
}

export default App;
