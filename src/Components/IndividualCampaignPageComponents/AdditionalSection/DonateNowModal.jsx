  import React, { useEffect, useRef, useState } from "react";
  import { FaChevronLeft } from "react-icons/fa";
  import { IoMdInformation } from "react-icons/io";
  import { FaHandHoldingMedical } from "react-icons/fa";
  import { IoMdPerson } from "react-icons/io";
  import { MdOutlineMailOutline } from "react-icons/md";
  import { FaPhoneAlt } from "react-icons/fa";
  import "./styles.css";
  import countryCodes from '../../../CountriesData/CountryCodes.json'
  import { use } from "i18next";
  import axios from "axios";
  import { BASE_URL } from "../../../constants/constant";
  import { useCurrency } from "../../Layout/CurrencyContext";

  function DonateNowModal({campaign}) {
    const { formatAmount } = useCurrency();
    const [amountField, setAmountField] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isIndianCitizen, setIsIndianCitizen] = useState(true);
    const [billingState, setBillingState] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
    // Function to handle opening of #dontgoyetmodal
    const openDontGoYetModal = () => {
      const modal = document.getElementById("dontgoyetmodal");
      if (modal) {
        const modalBS = new bootstrap.Modal(modal);
        modalBS.show();
      }
    };

    // Function to handle closing of #dontgoyetmodal
    const closeDontGoYetModal = () => {
      const modal = document.getElementById("dontgoyetmodal");
      if (modal) {
        const modalBS = new bootstrap.Modal(modal);
        modalBS.hide();
        modal.style.display = "none";
      }
    };

    // Function to handle closing of #dontgoyetmodal
    const closeBothModals = () => {
      const modal1 = document.getElementById("dontgoyetmodal");
      const modal2 = document.getElementById("donate-now-form");
      if (modal1 && modal2) {
        const modalBS = new bootstrap.Modal(modal1);
        const modalBS2 = new bootstrap.Modal(modal2);
        modalBS.hide();
        modalBS2.hide();
        modal1.style.display = "none";
        modal2.style.display = "none";
        window.location.reload();
      }
    };
    // --------------------------------Amount buttons code --------------------------------------
    const [selectedAmount, setSelectedAmount] = useState(300);
    const [customAmount, setCustomAmount] = useState("");
    const [showInputField, setShowInputField] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("₹");
    const [tipPercentage, setTipPercentage] = useState(10); 
    const [totalAmount, setTotalAmount] = useState(0);
    const [isTipEnabled, setIsTipEnabled] = useState(false);
    useEffect(() => {
    calculateTotal();
  }, [selectedAmount, customAmount, tipPercentage]);


    const handleAmountClick = (amount) => {
      setSelectedAmount(amount);
      setCustomAmount(amount);
      // calculateTotal(amount, selectedTip);
    };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

    const currencies = [
      { symbol: "₹", code: "INR" },
      { symbol: "$", code: "USD" },
      { symbol: "€", code: "EUR" },
    ];  

    const handleCurrencyChange = (symbol) => {
      setSelectedCurrency(symbol);
    };

    const handleTipChange = (e) => {
      setTipPercentage(Number(e.target.value)); 
    };


    const calculateTotal = () => {
      const donationAmount = Number(customAmount || selectedAmount || 0);
      const tipAmount = (donationAmount * tipPercentage) / 100;
      const total = donationAmount + tipAmount;
      setTotalAmount(total);
      
      // Enable the tip button only if total is >= 108
      setIsTipEnabled(total >= 108);
    };

    const addExtraTip = () => {
      setTotalAmount(totalAmount + 150);
    };

    useEffect(() => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      );
    }, []);

    


  //--------------------------------------- country codes--------------------------------------------------
    const handleCountryCodeSelect = (code) => {
      setSelectedCountryCode(code);
    };
    const handleMobileNumberChange = (e) => {
      setMobileNumber(e.target.value);
      setValidationErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
    };

    const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if campaign is fully funded
      if (campaign.amountRaised >= campaign.target_amount) {
        alert("This campaign has already reached its goal. Thank you for your interest!");
        closeBothModals();
        return;
      }
    // Validate form
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required";
    if (!email) validationErrors.email = "Email is required";
    if (!mobileNumber) validationErrors.mobileNumber = "Mobile number is required";
    if (!totalAmount || totalAmount <= 0) validationErrors.amount = "Please select a valid amount";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // Create order on server
    const orderResponse = await axios.post(`${BASE_URL}/api/payments/create-order`, {
      amount: totalAmount,
      currency: selectedCurrency === "₹" ? "INR" : selectedCurrency === "$" ? "USD" : "EUR",
      userId: localStorage.getItem("userId"), 
      campaignId: campaign.id,
      aliasName: name,
      paymentMode: "RAZORPAY"
    });

    const options = {
      key: RAZORPAY_KEY,
      amount: orderResponse.data.amount,
      currency: orderResponse.data.currency,
      name: "Fund for Bharat",
      description: `Donation for ${campaign.title}`,
      order_id: orderResponse.data.id,
      handler: async (response) => {
        try {
          // Verify payment on server
          await axios.post(`${BASE_URL}/api/payments/verify`, {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          });

          // Create donation record
          await axios.post(`${BASE_URL}/api/donations/add-donation`, {
            user_id: localStorage.getItem("userId"), // Replace with actual user ID if available
            campaign_id: campaign.id,
            alias_name: name,
            amount: customAmount || selectedAmount,
            tipAmount: tipPercentage > 0 ? ((totalAmount * tipPercentage) / 100) : 0,
            modeOfPayment: "RAZORPAY",
            email: email,
            contact: selectedCountryCode + mobileNumber,
            isIndianCitizen,
            billingState,
            isAnonymous
          });

          alert("Thank you for your donation!");
          closeBothModals();
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: selectedCountryCode + mobileNumber
      },
      theme: {
        color: "#d54400"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    return (
       <>
      <div className="modal fade custom_modal" id="donate-now-form">
      <div className="modal-dialog">
        <div className="modal-content">
          {campaign.amountRaised >= campaign.target_amount ? (
            // Fully funded campaign view
            <>
              <div className="modal-header">
                <h5 className="modal-title">Campaign Fully Funded</h5>
                <button type="button" className="btn-close" onClick={closeBothModals}></button>
              </div>
              <div className="modal-body text-center">
                <h4>Thank you for your interest!</h4>
                <p>This campaign has successfully reached its target amount of {formatAmount(campaign.target_amount)}.</p>
                <button 
                  className="btn btn-primary mt-3" 
                  onClick={closeBothModals}
                  style={{ backgroundColor: "#d54400", border: "none" }}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            // Regular donation form
            <>
              <div className="modal-header donate_now_modal_chevronleft">
                <span style={{ cursor: "pointer" }} onClick={openDontGoYetModal}>
                  <FaChevronLeft />
                </span>
                <h5 className="donate_now_modal_header-heading">
                  Choose a donation amount
                </h5>
                <div className="dropdown"></div>
              </div>

              <div className="modal-body">
                <div className="donate_now_modal_body-top-container">
                  <span style={{ fontStyle: "italic", fontSize: "12px" }}>
                    Most Donors donate approx{" "}
                    <span style={{ color: "#d54400" }}>{formatAmount(1000)}</span> to this
                    Fundraiser
                  </span>
                  <div className="donate_now_modal_body-top-container-container">
                      {[300, 1000, 3000].map((amount) => (
                        <button
                          key={amount}
                          style={{
                            // border: "2px solid green",
                            outline: "none",
                            padding: "4px 9px",
                            borderRadius: "25px",
                            color: selectedAmount === amount ? "white" : "orange",
                            backgroundColor: selectedAmount === amount ? "#32CD32" : "white",
                          }}
                          onClick={() => handleAmountClick(amount)}
                        >
                          {formatAmount(amount)}
                        </button>
                        ))}
                      </div>
                  <div>
                    {amountField ? (
                      <div className="input-group custom_input-group">
                        <div className="input-group-prepend custom-input-group-prepend">
                          <div className="dropdown ">
                            <button
                              className="btn dropdown-toggle donate_now_modal_header-button"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedCurrency}
                            </button>

                          </div>
                        </div>
                        <input type="number" className="donate_now_modal_input"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder={`Enter custom amount (${selectedCurrency})`}
                        />
                      </div>
                    ) : (
                      <button
                        className="donate_now_modal_body-top-container-btn"
                        onClick={() => setAmountField(true)}
                      >
                        Other Amount
                      </button>
                    )}
                  </div>
                </div>
                <div className="donate_now_modal_body-middle-container">
                  <div>
                    <span style={{ fontSize: "12px" }}>
                      Fund For Bharat is charging 0% platform fee for this
                      fundraiser, relying solely on the generosity of donors like
                      you.
                    </span>
                    <span className="donate_now_model_mat-icon-container">
                      <IoMdInformation style={{ width: "1em" , cursor: "pointer" }} 
                      color="white" 
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="We rely on donors to help fund platform costs."
                      />
                    </span>
                  </div>
                  <div className="donate_now_modal_tip-container">
                    <span style={{ fontWeight: "bold", fontSize: "12.5px" }}>
                      Support us by adding a tip of :
                    </span>
                    <select
                    className="form-select form-select-sm custom_form-select-sm"
                    aria-label="Default select example"
                    value={tipPercentage}
                    onChange={handleTipChange}
                    style={{ color: "black" }}  
                  >
                    <option value={10}>10% ({formatAmount((customAmount || selectedAmount || 0) * 0.10)})</option>
                    <option value={15}>15% ({formatAmount((customAmount || selectedAmount || 0) * 0.15)})</option>
                    <option value={18}>18% ({formatAmount((customAmount || selectedAmount || 0) * 0.18)})</option>
                    <option value={30}>30% ({formatAmount((customAmount || selectedAmount || 0) * 0.30)})</option>
                    <option value={0}>Sorry, Not Today ({formatAmount(0)})</option>

                  </select>

                  </div>
                  <span className="text-end" style={{ fontSize: "12px" }}>
                    Total Amount: {formatAmount(totalAmount)}
                  </span>
                  
                                </div>
              
<form className="donate-now_modal_body_form-container" onSubmit={handlePayment}>
  <div className="input-data">
    <input 
      type="text" 
      required 
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <div className="form-inputbottom-underline"></div>
    <label>Name *</label>
    <div className="form-input-icon">
      <IoMdPerson />
    </div>
    {errors.name && <span className="error-message">{errors.name}</span>}
  </div>
  
  <div className="input-data">
    <input 
      type="email" 
      required 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <div className="form-inputbottom-underline"></div>
    <label>Email ID *</label>
    <div className="form-input-icon">
      <MdOutlineMailOutline />
    </div>
    {errors.email && <span className="error-message">{errors.email}</span>}
  </div>
  
 
  <div className="input-group"
                    style={{ padding: "0", display: "flex" }} >
                    <div  className="input-group-prepend custom-input-group-prepend"
                      style={{
                        height: "30px",
                        padding: "0",
                        position: "relative",
                        top: "17px",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    >
                      <div className="dropdown ">
                        <button
                        className="btn dropdown-toggle "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                          {selectedCountryCode}
                        </button>
                        <ul className="dropdown-menu scrollable-dropdown" >
                          {countryCodes.map((country,idx) => (
                            <li key={country.code + country.dial_code + idx} className="dropdown-item" >
                              <a
                                
                                onClick={() => handleCountryCodeSelect(country.dial_code)}
                              >
                                {country.code} ({country.dial_code})
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="input-data">
                      <input
                      type="number"
                      required
                      value={mobileNumber}  // Add this
                      onChange={(e) => setMobileNumber(e.target.value)}  // Add this
                      className="donate-now_modal_body_form-mobile-input"
                    />
                      <div className="form-inputbottom-underline"></div>
                      <label>Your Mobile Number *</label>
                      <div className="form-input-icon">
                        <FaPhoneAlt />
                      </div>
                      </div>
                    </div>
                    
                  </div>
                  
                    <div className="form-check mb-3">
  <input
    type="checkbox"
    className="form-check-input"
    id="anonymousCheck"
    checked={isAnonymous}
    onChange={(e) => setIsAnonymous(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="anonymousCheck">
    Make my donation anonymous
  </label>
</div>

<div className="form-check mb-3">
  <input
    type="checkbox"
    className="form-check-input"
    id="indianCitizenCheck"
    checked={isIndianCitizen}
    onChange={(e) => setIsIndianCitizen(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="indianCitizenCheck">
    I am a citizen of India
  </label>
</div>

{isIndianCitizen && (
  <div className="input-data">
    <input 
      type="text" 
      required={isIndianCitizen}
      value={billingState}
      onChange={(e) => setBillingState(e.target.value)}
    />
    <div className="form-inputbottom-underline"></div>
    <label>Billing State *</label>
    <div className="form-input-icon">
      <IoMdPerson />
    </div>
  </div>
)}
                    <button 
                    type="submit" 
                    className="donate-now_modal_body_form-container-btn mt-5"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Proceed to Pay ${formatAmount(totalAmount)}`}
                  </button>

                  <span style={{ fontSize: "12px", fontStyle: "italic" }}>
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy
                  </span>
                </form>
              </div>
             </>
          )}
        </div>
      </div>
    </div>
        
        <div
          className="modal fade"
          id="dontgoyetmodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="dontgoyetmodalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  position: "relative",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                }}
              >
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    right: "10px",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "35px",
                    backgroundColor: "white",
                  }}
                >
                  <span aria-hidden="true" onClick={closeDontGoYetModal}>
                    &times;
                  </span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  margin: "10px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "0 10px",
                  }}
                > 
                  <img
                    src={campaign.documents?.find(doc => doc.doc_type === "fundraiserImage")?.doc_url || "images/DontGoYetImage.png"}
                    style={{ width: "300px", height: "200px" }}
                  />
                </div>
                <h5 style={{ fontWeight: "bold", textAlign: "center" }}>
                  Please don't go yet!
                </h5>
                <p style={{ textAlign: "center", color: "gray" }}>
                  Just ₹300 can give {campaign.beneficiaryName} a shot at surviving this
                  life-threatening disease and your donation can make this
                  possible
                </p>
                <div className="d-flex flex-column gap-3">
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "#d54400",
                      fontWeight: "bold",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onClick={closeDontGoYetModal}
                  >
                    Yes,I will help.
                  </button>
                  <button
                    style={{
                      color: "gray",
                      backgroundColor: "white",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    onClick={closeBothModals}
                  >
                    Sorry,not today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </>
    );
  }

  export default DonateNowModal;
