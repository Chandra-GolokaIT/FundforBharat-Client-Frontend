import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import "./CrisisReliefDetail.css"; // We'll style it separately
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrisisReliefDetailPage = () => {
  const { id } = useParams();
  const [relief, setRelief] = useState(null);
      const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const [volunteerData, setVolunteerData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const fetchRelief = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/crisis-relief/${id}`);
      setRelief(res.data);
    } catch (error) {
      console.error("Error fetching relief details", error);
    }
  };

  useEffect(() => {
    fetchRelief();
  }, [id]);

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/crisis-relief/${id}/volunteer`, volunteerData);
      toast.success("Volunteer form submitted successfully!");
      setVolunteerData({ name: "", email: "", phone: "", message: "" }); // reset form
    } catch (err) {
      console.error(err);
      toast.error("Error submitting volunteer form.");
    }
  };

const [donationAmount, setDonationAmount] = useState("");

const handleDonate = async () => {
  if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
    toast.error("Please enter a valid donation amount");
    return;
  }
    const amount = Number(donationAmount);

  if (!amount || isNaN(amount) || amount < 50) {
    toast.error("Minimum donation amount is ₹50");
    return;
  }

  try {
    // 1️⃣ Create order from backend
    const { data: orderData } = await axios.post(
      `${BASE_URL}/api/payments/create-order`,
      {
        amount: Number(donationAmount), // amount in INR
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      }
    );

    // 2️⃣ Configure Razorpay checkout
    const options = {
      key: RAZORPAY_KEY,
      amount: orderData.amount,
      currency: orderData.currency,
      name: relief.title,
      description: "Donation for crisis relief",
      order_id: orderData.id,
      handler: async function (response) {
        try {
          // 3️⃣ Verify payment with backend
          const verifyRes = await axios.post(`${BASE_URL}/api/payments/verify`, {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          });

          if (verifyRes.data.success) {
            toast.success("Payment verified and successful!");
            await axios.post(`${BASE_URL}/api/crisis-relief/${id}/update-amount`, null, {
              params: { amount: Number(donationAmount) }
            });
            fetchRelief();
            setDonationAmount(""); // reset field
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (err) {
          console.error("Verification error", err);
          toast.error("Payment verification error.");
        }
      },
      theme: { color: "#3399cc" }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.error("Error in donation", err);
    toast.error("Failed to initiate donation");
  }
};


  if (!relief) return <p style={{ paddingTop: "160px", textAlign: "center" }}>Loading...</p>;

  return (
    <div className="crisis-detail-page" style={{ paddingTop: "160px" }}>
      <div className="detail-header">
        <img src={relief.imageUrl} alt={relief.title} className="detail-image" />
        <div className="detail-info">
          <h1>{relief.title}</h1>
          <p>{relief.description}</p>
        </div>
      </div>

      <div className="action-section">
        {/* Donation Section */}
<div className="donate-box">
  <h2>Support the Cause</h2>
  <p>Your contribution will help those affected in this crisis.</p>
  <input
    type="number"
    placeholder="Enter amount (INR)"
    value={donationAmount}
    onChange={(e) => setDonationAmount(e.target.value)}
    min="50"
    className="donation-input"
  />
  <button onClick={handleDonate} className="donate-btn">
    Donate Now
  </button>
</div>


        {/* Volunteer Form */}
        <div className="volunteer-box">
          <h2>Help as a Volunteer</h2>
          <form onSubmit={handleVolunteerSubmit} className="volunteer-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={volunteerData.name}
              onChange={handleVolunteerChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={volunteerData.email}
              onChange={handleVolunteerChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={volunteerData.phone}
              onChange={handleVolunteerChange}
              required
            />
            <textarea
              name="message"
              placeholder="How would you like to help?"
              value={volunteerData.message}
              onChange={handleVolunteerChange}
              required
            ></textarea>
            <button type="submit" className="volunteer-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrisisReliefDetailPage;
