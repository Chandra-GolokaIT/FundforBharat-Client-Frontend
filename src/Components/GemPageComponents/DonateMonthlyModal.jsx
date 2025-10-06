import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaShieldAlt } from "react-icons/fa";
import { useCurrency } from "../Layout/CurrencyContext";
import { BASE_URL, RAZORPAY_KEY } from "../../constants/constant";

function DonateMonthlyModal() {
  const [show, setShow] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const { formatAmount } = useCurrency();


  const USER_ID = Number(localStorage.getItem('userId'));

  // Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Show modal + load plans & subscription
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      loadPlans();
      checkSubscription();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Bootstrap modal
  useEffect(() => {
    if (show) {
      const modalEl = document.getElementById("donatemonthlymodal1");
      const modalInstance = new bootstrap.Modal(modalEl);
      modalInstance.show();
      modalEl.addEventListener("hidden.bs.modal", () => setShow(false));
    }
  }, [show]);

  const showAlert = (msg, type) => {
    setAlert({ message: msg, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
  };

  // Fetch plans
  const loadPlans = async () => {
    try {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/api/subscriptions/plans`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    setPlans(data);
    // Always set first plan if available
    setSelectedPlan(data[0] || null); 
  } catch {
    showAlert("Error loading subscription plans.", "error");
  } finally {
    setLoading(false);
  }
  };

  // Check subscription
  const checkSubscription = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/subscriptions/user/${USER_ID}`);
      if (res.ok) setCurrentSubscription(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedPlan(null);
    }
  };

  // Create subscription
  const handleSubscription = async () => {
    if (currentSubscription) return showAlert("Already subscribed.", "error");
    const amount = parseFloat(customAmount || selectedPlan?.monthlyPrice || 1001);
    if (amount < 1) return showAlert("Enter valid amount.", "error");

    try {
      setProcessingPayment(true);

      let plan = selectedPlan;
      if (!plan && plans.length > 0) plan = plans[0];
      if (!plan) throw new Error("No plans available");

      const res = await fetch(`${BASE_URL}/api/subscriptions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, userId: USER_ID }),
      });

      if (!res.ok) throw new Error();
      const subscriptionData = await res.json();

      const options = {
        key: RAZORPAY_KEY,
        subscription_id: subscriptionData.razorpaySubscriptionId,
        name: "Fund for Bharat",
        description: "Monthly Donation Subscription",
        handler: () => handlePaymentSuccess(),
        prefill: { name: "Donor", email: "donor@example.com", contact: "9999999999" },
        theme: { color: "#28a745" },
        modal: {
          ondismiss: () => {
            setProcessingPayment(false);
            showAlert("Payment cancelled.", "info");
          },
        },
      };

      new window.Razorpay(options).open();
    } catch {
      showAlert("Error creating subscription.", "error");
      setProcessingPayment(false);
    }
  };

  const handlePaymentSuccess = async () => {
    showAlert("Payment successful! Subscription active.", "success");
    setProcessingPayment(false);
    await checkSubscription();
    setTimeout(() => handleClose(), 1500);
  };

  const handleClose = () => {
    const modalEl = document.getElementById("donatemonthlymodal1");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
  };

  const displayAmount = formatAmount(customAmount || selectedPlan?.monthlyPrice || 1001);

  return (
    show &&
    createPortal(
      <div className="try-modal">
        {alert.message && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              padding: "15px 20px",
              borderRadius: "10px",
              backgroundColor: alert.type === "success" ? "#d4edda" : alert.type === "error" ? "#f8d7da" : "#cce7ff",
              color: alert.type === "success" ? "#155724" : alert.type === "error" ? "#721c24" : "#004085",
            }}
          >
            {alert.message}
          </div>
        )}

        <div className="modal gem-custom-modal1 fade" id="donatemonthlymodal1" tabIndex="-1">
          <div className="modal-dialog gem-custom-modal1-dialog">
            <div className="modal-content d-flex flex-md-row" style={{ gap: "10px", background: "none", border: "none" }}>

              {/* Left */}
              <div style={{ fontSize: "14px", maxWidth: "403px", borderRadius: "20px", backgroundColor: "white", margin: "auto" }}>
                <img src="images/DontGoYetImage.png" style={{ width: "100%", borderRadius: "20px" }} />
                <h6 style={{ fontWeight: "bold", textAlign: "center", marginTop: "25px" }}>One Subscription To Save Countless Lives</h6>
                <p style={{ padding: "10px" }}>Join the Fund for Bharat community and make a difference...</p>
                <p style={{ padding: "10px" }}>Your contribution empowers us to provide essential support...</p>
                {currentSubscription && (
                  <div style={{ padding: "10px", backgroundColor: "#e8f5e8", borderRadius: "10px", margin: "10px" }}>
                    <h6 style={{ color: "#28a745", fontWeight: "bold" }}>Active Subscription</h6>
                    <p><strong>Plan:</strong> {currentSubscription.plan.planName}</p>
                    <p><strong>Amount:</strong> ₹{currentSubscription.plan.monthlyPrice}/month</p>
                  </div>
                )}
              </div>

              {/* Right */}
              <div style={{ maxWidth: "350px", borderRadius: "20px", backgroundColor: "white", margin: "auto" }}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-center text-success" style={{ fontWeight: "bold" }}>Life patron</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleClose}></button>
                </div>

                <div className="modal-body" style={{ display: "flex", flexDirection: "column" }}>
                  <span className="text-center fw-bold">Choose The Cause</span>
                  <span className="text-center">That You Wish To Support Every Month.</span>
                  <span style={{ border: "1px solid", padding: "3px", margin: "15px 0", borderRadius: "5px", textAlign: "center" }}>
                    Support Patient Battling Critical Disease.
                  </span>

                  <span className="text-center fw-bold">Select The Amount</span>
                  <span className="text-center">That you are comfortable donating monthly.</span>

                  <div className="d-flex gap-2 justify-content-between my-3">
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      plans.map((plan) => (
                        <button
                          key={plan.id}
                          style={{
                            border: "2px solid green",
                            borderRadius: "7px",
                            color: selectedPlan?.id === plan.id ? "white" : "green",
                            backgroundColor: selectedPlan?.id === plan.id ? "green" : "white",
                          }}
                          onClick={() => {
                            setSelectedPlan(plan);
                            setCustomAmount("");
                          }}
                          disabled={processingPayment || currentSubscription}
                        >
                          {formatAmount(plan.monthlyPrice)}/mo
                        </button>
                      ))
                    )}
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="dropdown">
                      <button className="btn dropdown-toggle" style={{ border: "2px solid green", color: "green", width: "110px" }}>
                        ₹-INR
                      </button>
                    </div>
                    <input
                      style={{ border: "1.5px solid", width: "170px" }}
                      type="text"
                      maxLength={4}
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter custom amount"
                    />
                  </div>

                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: currentSubscription ? "#6c757d" : processingPayment ? "#ffc107" : "orange",
                      color: "white",
                      borderRadius: "7px",
                      marginTop: "30px",
                    }}
                    onClick={handleSubscription}
                    disabled={currentSubscription || processingPayment}
                  >
                    {processingPayment ? "PROCESSING..." : currentSubscription ? "ALREADY SUBSCRIBED" : `CONTRIBUTE MONTHLY (${displayAmount})`}
                  </button>

                  <div className="d-flex justify-content-center align-items-center p-3 mt-2 gap-1">
                    <img className="paymenticons" src="https://cdn.iconscout.com/icon/free/png-256/free-google-pay-2038779-1721670.png" />
                    <img className="paymenticons" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4x8kSTmPUq4PFzl4HNT0gObFuEhivHOFYg&s" />
                    <img className="paymenticons" src="https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png" />
                  </div>

                  <span className="d-flex align-items-center justify-content-center mt-2" style={{ fontSize: "14px" }}>
                    <FaShieldAlt size={20} style={{ width: "30px" }} />100% Safe and secure
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
}

export default DonateMonthlyModal;

// updated later use

// import React, { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { FaShieldAlt } from "react-icons/fa";
// import axios from "axios";
// import { useCurrency } from "../Layout/CurrencyContext";
// import { BASE_URL, RAZORPAY_KEY } from "../../constants/constant";

// // Configure axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// // Request interceptor for auth
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message || 
//                    error.response?.data?.error || 
//                    error.message || 
//                    'An unexpected error occurred';
//     return Promise.reject(new Error(message));
//   }
// );

// function DonateMonthlyModal() {
//   const [show, setShow] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [customAmount, setCustomAmount] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentSubscription, setCurrentSubscription] = useState(null);
//   const [processingPayment, setProcessingPayment] = useState(false);
//   const [verifyingPayment, setVerifyingPayment] = useState(false);
//   const [alert, setAlert] = useState({ message: "", type: "" });
//   const { formatAmount } = useCurrency();

//   const USER_ID = Number(localStorage.getItem('userId'));

//   // Razorpay script loader
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       if (window.Razorpay) return Promise.resolve(true);
      
//       return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     loadRazorpayScript().then((loaded) => {
//       if (!loaded) {
//         showAlert("Payment gateway failed to load. Please refresh the page.", "error");
//       }
//     });

//     return () => {
//       const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
//       if (script && document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   // Show modal + load plans & subscription
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(true);
//       loadPlans();
//       checkSubscription();
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Bootstrap modal
//   useEffect(() => {
//     if (show) {
//       const modalEl = document.getElementById("donatemonthlymodal1");
//       if (modalEl) {
//         const modalInstance = new bootstrap.Modal(modalEl);
//         modalInstance.show();
//         modalEl.addEventListener("hidden.bs.modal", () => setShow(false));
//       }
//     }
//   }, [show]);

//   const showAlert = (msg, type = "info") => {
//     setAlert({ message: msg, type });
//     setTimeout(() => setAlert({ message: "", type: "" }), 5000);
//   };

//   // Fetch plans using Axios
//   const loadPlans = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get('/api/subscriptions/plans');
//       const data = response.data;
      
//       if (!Array.isArray(data) || data.length === 0) {
//         throw new Error('No subscription plans available');
//       }
      
//       setPlans(data);
//       if (data.length > 0) setSelectedPlan(data[0]);
//     } catch (error) {
//       console.error('Error loading plans:', error);
//       showAlert(`Error loading subscription plans: ${error.message}`, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check subscription using Axios
//   const checkSubscription = async () => {
//     if (!USER_ID) {
//       showAlert("Please log in to continue", "error");
//       return null;
//     }

//     try {
//       const response = await api.get(`/api/subscriptions/user/${USER_ID}`);
//       const subscription = response.data;
//       setCurrentSubscription(subscription);
//       return subscription;
//     } catch (error) {
//       // 404 is expected when user has no subscription
//       if (error.response?.status !== 404) {
//         console.error('Error checking subscription:', error);
//       }
//       setCurrentSubscription(null);
//       return null;
//     }
//   };

//   const handleCustomAmountChange = (e) => {
//     const value = e.target.value;
//     // Allow only numbers and limit to 6 digits
//     if (/^\d*$/.test(value) && value.length <= 6) {
//       setCustomAmount(value);
//       if (value) {
//         setSelectedPlan(null);
//       }
//     }
//   };

//   const handlePlanSelection = (plan) => {
//     setSelectedPlan(plan);
//     setCustomAmount("");
//   };

//   const getCurrentAmount = () => {
//     if (customAmount) {
//       return parseFloat(customAmount);
//     }
//     return selectedPlan?.monthlyPrice || 0;
//   };

//   // Create subscription using Axios
//   const handleSubscription = async () => {
//     // Validation checks
//     if (currentSubscription?.status === 'ACTIVE') {
//       showAlert("You already have an active subscription.", "error");
//       return;
//     }

//     if (!USER_ID) {
//       showAlert("Please log in to continue.", "error");
//       return;
//     }

//     const amount = getCurrentAmount();
//     if (amount < 1) {
//       showAlert("Please enter a valid amount (minimum ₹1).", "error");
//       return;
//     }

//     if (amount > 100000) {
//       showAlert("Maximum amount allowed is ₹1,00,000.", "error");
//       return;
//     }

//     let plan = selectedPlan;
//     if (!plan && plans.length > 0) plan = plans[0];
//     if (!plan) {
//       showAlert("No subscription plans available.", "error");
//       return;
//     }

//     try {
//       setProcessingPayment(true);
//       showAlert("Creating subscription...", "info");

//       const requestData = {
//         planId: plan.id,
//         userId: USER_ID
//       };

//       // Add custom amount if provided
//       if (customAmount) {
//         requestData.customAmount = parseFloat(customAmount);
//       }

//       const response = await api.post('/api/subscriptions/create', requestData);
//       const subscriptionData = response.data;

//       if (!subscriptionData.razorpaySubscriptionId) {
//         throw new Error('Invalid subscription data received from server');
//       }

//       // Initialize Razorpay payment
//       await initiateRazorpayPayment(subscriptionData);

//     } catch (error) {
//       console.error('Subscription creation error:', error);
//       showAlert(`Failed to create subscription: ${error.message}`, "error");
//       setProcessingPayment(false);
//     }
//   };

//   const initiateRazorpayPayment = async (subscriptionData) => {
//     if (!window.Razorpay) {
//       throw new Error('Payment gateway not loaded. Please refresh and try again.');
//     }

//     const options = {
//       key: RAZORPAY_KEY,
//       subscription_id: subscriptionData.razorpaySubscriptionId,
//       name: "Fund for Bharat",
//       description: "Monthly Donation Subscription",
//       image: "/images/logo.png",
//       handler: (response) => handlePaymentSuccess(response, subscriptionData),
//       prefill: {
//         name: localStorage.getItem('userName') || "Donor",
//         email: localStorage.getItem('userEmail') || "donor@example.com",
//         contact: localStorage.getItem('userPhone') || "9999999999"
//       },
//       theme: { color: "#28a745" },
//       modal: {
//         ondismiss: () => handlePaymentDismiss(),
//         confirm_close: true,
//         escape: false,
//       },
//       retry: {
//         enabled: true,
//         max_count: 3
//       }
//     };

//     const razorpay = new window.Razorpay(options);

//     razorpay.on('payment.failed', (response) => {
//       handlePaymentFailure(response);
//     });

//     razorpay.open();
//   };

//   const handlePaymentSuccess = async (paymentResponse, subscriptionData) => {
//     try {
//       console.log('Payment successful:', paymentResponse);
//       setVerifyingPayment(true);
//       showAlert("Payment successful! Verifying subscription...", "success");

//       // Poll for subscription activation
//       await pollForSubscriptionActivation(15); // 15 attempts = 30 seconds

//     } catch (error) {
//       console.error('Payment verification error:', error);
//       showAlert("Payment completed but verification failed. Please contact support if subscription is not activated.", "warning");
//     } finally {
//       setProcessingPayment(false);
//       setVerifyingPayment(false);
//     }
//   };

//   const handlePaymentFailure = (response) => {
//     console.error('Payment failed:', response);
//     const errorMessage = response.error?.description || 'Payment failed. Please try again.';
//     showAlert(errorMessage, "error");
//     setProcessingPayment(false);
//   };

//   const handlePaymentDismiss = () => {
//     console.log('Payment modal dismissed');
//     showAlert("Payment cancelled.", "info");
//     setProcessingPayment(false);
//   };

//   const pollForSubscriptionActivation = async (maxAttempts = 15) => {
//     let attempts = 0;
    
//     while (attempts < maxAttempts) {
//       await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
//       try {
//         const subscription = await checkSubscription();
        
//         if (subscription?.status === 'ACTIVE') {
//           showAlert("Subscription activated successfully! Welcome to Fund for Bharat!", "success");
//           setTimeout(() => handleClose(), 2000);
//           return;
//         }
        
//         if (subscription?.status === 'CANCELLED' || subscription?.status === 'EXPIRED') {
//           throw new Error('Subscription was not activated properly');
//         }
        
//       } catch (error) {
//         if (attempts === maxAttempts - 1) {
//           throw error;
//         }
//         console.warn(`Verification attempt ${attempts + 1} failed:`, error.message);
//       }
      
//       attempts++;
//     }
    
//     // Webhook processing might be delayed
//     showAlert("Payment received successfully. Your subscription will be activated shortly.", "success");
//     setTimeout(() => handleClose(), 3000);
//   };

//   const handleClose = () => {
//     const modalEl = document.getElementById("donatemonthlymodal1");
//     if (modalEl) {
//       const modalInstance = bootstrap.Modal.getInstance(modalEl);
//       if (modalInstance) {
//         modalInstance.hide();
//       }
//     }
//   };

//   const displayAmount = formatAmount(customAmount || selectedPlan?.monthlyPrice || 1001);

//   const getButtonText = () => {
//     if (verifyingPayment) return "VERIFYING PAYMENT...";
//     if (processingPayment) return "PROCESSING...";
//     if (currentSubscription?.status === 'ACTIVE') return "ALREADY SUBSCRIBED";
//     return `CONTRIBUTE MONTHLY (${displayAmount})`;
//   };

//   const isButtonDisabled = () => {
//     return processingPayment || 
//            verifyingPayment || 
//            currentSubscription?.status === 'ACTIVE' ||
//            loading ||
//            !USER_ID;
//   };

//   return (
//     show &&
//     createPortal(
//       <div className="try-modal">
//         {alert.message && (
//           <div
//             style={{
//               position: "fixed",
//               top: "20px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               zIndex: 9999,
//               padding: "15px 20px",
//               borderRadius: "10px",
//               backgroundColor: 
//                 alert.type === "success" ? "#d4edda" : 
//                 alert.type === "error" ? "#f8d7da" : 
//                 alert.type === "warning" ? "#fff3cd" : "#cce7ff",
//               color: 
//                 alert.type === "success" ? "#155724" : 
//                 alert.type === "error" ? "#721c24" : 
//                 alert.type === "warning" ? "#856404" : "#004085",
//               border: `1px solid ${
//                 alert.type === "success" ? "#c3e6cb" : 
//                 alert.type === "error" ? "#f5c6cb" : 
//                 alert.type === "warning" ? "#ffeaa7" : "#b8daff"
//               }`,
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               fontWeight: "500"
//             }}
//           >
//             {alert.message}
//           </div>
//         )}

//         <div className="modal gem-custom-modal1 fade" id="donatemonthlymodal1" tabIndex="-1">
//           <div className="modal-dialog gem-custom-modal1-dialog">
//             <div className="modal-content d-flex flex-md-row" style={{ gap: "10px", background: "none", border: "none" }}>

//               {/* Left Panel */}
//               <div style={{ fontSize: "14px", maxWidth: "403px", borderRadius: "20px", backgroundColor: "white", margin: "auto" }}>
//                 <img 
//                   src="images/DontGoYetImage.png" 
//                   alt="Fund for Bharat"
//                   style={{ width: "100%", borderRadius: "20px" }} 
//                 />
//                 <h6 style={{ fontWeight: "bold", textAlign: "center", marginTop: "25px" }}>
//                   One Subscription To Save Countless Lives
//                 </h6>
//                 <p style={{ padding: "10px" }}>
//                   Join the Fund for Bharat community and make a difference in the lives of those battling critical diseases.
//                 </p>
//                 <p style={{ padding: "10px" }}>
//                   Your contribution empowers us to provide essential support and ensure no patient is left behind.
//                 </p>
                
//                 {currentSubscription && (
//                   <div style={{ 
//                     padding: "15px", 
//                     backgroundColor: "#e8f5e8", 
//                     borderRadius: "10px", 
//                     margin: "10px",
//                     border: "1px solid #c3e6cb"
//                   }}>
//                     <h6 style={{ color: "#28a745", fontWeight: "bold", marginBottom: "10px" }}>
//                       🎉 Active Subscription
//                     </h6>
//                     <p style={{ margin: "5px 0" }}>
//                       <strong>Plan:</strong> {currentSubscription.plan.planName}
//                     </p>
//                     <p style={{ margin: "5px 0" }}>
//                       <strong>Amount:</strong> ₹{currentSubscription.plan.monthlyPrice}/month
//                     </p>
//                     <p style={{ margin: "5px 0" }}>
//                       <strong>Status:</strong> {currentSubscription.status}
//                     </p>
//                     {currentSubscription.nextBillingDate && (
//                       <p style={{ margin: "5px 0" }}>
//                         <strong>Next Billing:</strong> {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Right Panel */}
//               <div style={{ maxWidth: "350px", borderRadius: "20px", backgroundColor: "white", margin: "auto" }}>
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5 text-center text-success" style={{ fontWeight: "bold" }}>
//                     Life patron
//                   </h1>
//                   <button 
//                     type="button" 
//                     className="btn-close" 
//                     data-bs-dismiss="modal" 
//                     onClick={handleClose}
//                     disabled={processingPayment || verifyingPayment}
//                   ></button>
//                 </div>

//                 <div className="modal-body" style={{ display: "flex", flexDirection: "column" }}>
//                   <span className="text-center fw-bold">Choose The Cause</span>
//                   <span className="text-center">That You Wish To Support Every Month.</span>
//                   <span style={{ 
//                     border: "1px solid #28a745", 
//                     padding: "8px", 
//                     margin: "15px 0", 
//                     borderRadius: "5px", 
//                     textAlign: "center",
//                     backgroundColor: "#f8f9fa",
//                     color: "#28a745",
//                     fontWeight: "500"
//                   }}>
//                     Support Patient Battling Critical Disease.
//                   </span>

//                   <span className="text-center fw-bold">Select The Amount</span>
//                   <span className="text-center">That you are comfortable donating monthly.</span>

//                   <div className="d-flex gap-2 justify-content-between my-3">
//                     {loading ? (
//                       <div className="text-center w-100">
//                         <div className="spinner-border spinner-border-sm text-success" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <span className="ms-2">Loading plans...</span>
//                       </div>
//                     ) : (
//                       plans.map((plan) => (
//                         <button
//                           key={plan.id}
//                           style={{
//                             border: "2px solid green",
//                             borderRadius: "7px",
//                             padding: "8px 12px",
//                             color: selectedPlan?.id === plan.id ? "white" : "green",
//                             backgroundColor: selectedPlan?.id === plan.id ? "green" : "white",
//                             fontWeight: "500",
//                             cursor: isButtonDisabled() ? "not-allowed" : "pointer",
//                             opacity: isButtonDisabled() ? 0.6 : 1,
//                             transition: "all 0.2s ease"
//                           }}
//                           onClick={() => handlePlanSelection(plan)}
//                           disabled={isButtonDisabled()}
//                         >
//                           {formatAmount(plan.monthlyPrice)}/mo
//                         </button>
//                       ))
//                     )}
//                   </div>

//                   <div className="d-flex justify-content-between">
//                     <div className="dropdown">
//                       <button 
//                         className="btn dropdown-toggle" 
//                         style={{ 
//                           border: "2px solid green", 
//                           color: "green", 
//                           width: "110px",
//                           fontWeight: "500"
//                         }}
//                         disabled
//                       >
//                         ₹-INR
//                       </button>
//                     </div>
//                     <input
//                       style={{ 
//                         border: "1.5px solid #dee2e6", 
//                         borderRadius: "5px",
//                         width: "170px",
//                         padding: "8px 12px",
//                         fontSize: "14px"
//                       }}
//                       type="text"
//                       maxLength={6}
//                       value={customAmount}
//                       onChange={handleCustomAmountChange}
//                       placeholder="Enter custom amount"
//                       disabled={isButtonDisabled()}
//                     />
//                   </div>

//                   <button
//                     style={{
//                       padding: "12px 20px",
//                       backgroundColor: 
//                         currentSubscription?.status === 'ACTIVE' ? "#6c757d" : 
//                         (processingPayment || verifyingPayment) ? "#ffc107" : "orange",
//                       color: "white",
//                       fontWeight: "bold",
//                       border: "none",
//                       borderRadius: "7px",
//                       marginTop: "30px",
//                       cursor: isButtonDisabled() ? "not-allowed" : "pointer",
//                       opacity: isButtonDisabled() ? 0.8 : 1,
//                       transition: "all 0.2s ease",
//                       fontSize: "14px"
//                     }}
//                     onClick={handleSubscription}
//                     disabled={isButtonDisabled()}
//                   >
//                     {getButtonText()}
//                   </button>

//                   {/* Processing Indicator */}
//                   {(processingPayment || verifyingPayment) && (
//                     <div className="text-center mt-3">
//                       <div className="spinner-border spinner-border-sm text-primary" role="status">
//                         <span className="visually-hidden">Processing...</span>
//                       </div>
//                       <div className="mt-2" style={{ fontSize: "12px", color: "#6c757d" }}>
//                         {verifyingPayment ? "Verifying your payment..." : "Processing your request..."}
//                       </div>
//                     </div>
//                   )}

//                   <div className="d-flex justify-content-center align-items-center p-3 mt-2 gap-1">
//                     <img 
//                       className="paymenticons" 
//                       src="https://cdn.iconscout.com/icon/free/png-256/free-google-pay-2038779-1721670.png"
//                       alt="Google Pay"
//                       style={{ width: "30px", height: "30px" }}
//                     />
//                     <img 
//                       className="paymenticons" 
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4x8kSTmPUq4PFzl4HNT0gObFuEhivHOFYg&s"
//                       alt="PhonePe"
//                       style={{ width: "30px", height: "30px" }}
//                     />
//                     <img 
//                       className="paymenticons" 
//                       src="https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png"
//                       alt="Paytm"
//                       style={{ width: "30px", height: "30px" }}
//                     />
//                   </div>

//                   <span className="d-flex align-items-center justify-content-center mt-2" style={{ fontSize: "14px" }}>
//                     <FaShieldAlt size={20} style={{ width: "30px" }} />
//                     100% Safe and secure
//                   </span>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>,
//       document.getElementById("modal")
//     )
//   );
// }

// export default DonateMonthlyModal;