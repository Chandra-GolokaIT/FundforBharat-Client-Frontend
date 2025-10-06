import React, { useState } from "react";
import "./CurrencyToggle.css";
import { useCurrency } from "./CurrencyContext";

const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();
  const isInr = currency === 'INR';

  const toggleCurrency = () => {
    setCurrency(isInr ? 'USD' : 'INR');
  };

  return (
    <div className="currency-toggle" onClick={toggleCurrency}>
      <div className={`toggle-track ${!isInr ? "inr" : "usd"}`}>
        <span className="toggle-thumb" />
        <div className="labels">
          <span className={`label ${isInr ? "active" : ""}`}>₹</span>
          <span className={`label ${!isInr ? "active" : ""}`}>$</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyToggle;