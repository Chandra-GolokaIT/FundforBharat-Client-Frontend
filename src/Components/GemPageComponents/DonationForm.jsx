import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../GemPageComponents/DonationForm.css";
import axios from "axios";
import { useCurrency } from "../Layout/CurrencyContext"; // assuming same pattern

const DonationForm = ({ onClose }) => {
  const { formatAmount } = useCurrency(); // get formatter from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "West Bengal",
    citizen: "yes",
    honor: "",
    amount: 1000
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setLoading(true);

    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }

      const orderRequest = {
        amount: formData.amount,
        currency: "INR",
        userId: null,
        email: formData.email,
        contact: formData.phone,
        campaignId: null,
        paymentMode: "UPI",
        aliasName: formData.name
      };

      const { data } = await axios.post("/api/payments/create-order", orderRequest);

      const options = {
        key: "your_razorpay_key_id",
        amount: data.amount,
        currency: data.currency,
        name: "Your Organization Name",
        description: "Donation for a cause",
        image: "https://your-logo-url.png",
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post("/api/payments/verify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });
            alert("Payment successful!");
            onClose();
          } catch (error) {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: formData.state
        },
        theme: {
          color: "#3399cc"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    displayRazorpay();
  };

  return (
    <div className="donation-form-overlay">
      <div className="donation-form-container">
        <div className="donation-form-header">
          <h2>Give Every Month</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <p className="donation-form-subtitle">
          Your monthly donations support critical conditions, offering them a brighter, healthier future.
        </p>

        <div className="donation-options">
          <h3 className="text-black">Donate Monthly</h3>
          <div className="transaction-details">
            <span>Transaction Details</span>
            <span className="tax-benefit">Claim Tax Benefits</span>
          </div>

          <div className="amount-selection">
            <h4>Select Donation Amount</h4>
            <div className="amount-options">
              {[250, 500, 1000, 1500, 2500].map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`amount-option ${formData.amount === amount ? 'active' : ''}`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  {formatAmount(amount)}/mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="plan-selection">
          <h3 className="text-black">Choose Monthly Plan</h3>
          <div className="plan-card">
            <p>Support Patients Battling Critical Diseases</p>
            <p className="auto-debit">Amount is auto-debited on the 3rd of every month.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name*</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="form-group phone-group">
                <label>Mobile Number*</label>
                <div className="phone-input">
                  <select><option value="+91">(+91) India</option></select>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Email*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>State</label>
                <select name="state" value={formData.state} onChange={handleChange}>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div className="form-group">
                <label>Are you an Indian Citizen?*</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="citizen" value="yes" checked={formData.citizen === "yes"} onChange={handleChange} required /> Yes
                  </label>
                  <label>
                    <input type="radio" name="citizen" value="no" checked={formData.citizen === "no"} onChange={handleChange} required /> No
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Honor this donation?</label>
                <input type="text" name="honor" value={formData.honor} onChange={handleChange} placeholder="Optional" />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Processing..." : `Proceed to Pay (${formatAmount(formData.amount)})`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
