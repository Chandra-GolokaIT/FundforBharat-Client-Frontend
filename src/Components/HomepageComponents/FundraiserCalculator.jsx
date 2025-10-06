import React, { useState, useEffect } from "react";
import "../../assets/styles/FundraiserCalculator.css";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
// import img1 from '../../assets/images/';
import './calculator.css';
import { useCurrency } from "../Layout/CurrencyContext";
const FundraiserCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [calculate, setCalculate] = useState(false);
  const navigate = useNavigate();
  const { currency, formatAmount } = useCurrency();

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(Number(value));
  };

  const calculateFees = (amt) => {
    const gatewayFee = amt * 0.025;
    const totalAmount = amt + gatewayFee;
    return {
      gatewayFee,
      totalAmount
    };
  };

  return (
    <div className="calculator-section">
      <h3 className="text-center">Fundraiser goal calculator</h3>
      <p className="text-center">
        A simple way to plan and achieve your fundraiser goal
      </p>

      <div className="progress-bar-container bg-white">
        <div className="d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center gap-4">
            <p>I want to raise: </p>
            <div className="input-group" id="progress-input">
              <input
                type="text"
                className="form-control w-64"
                value={formatAmount(amount)}
                onChange={handleAmountChange}
                aria-label="Amount input"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div style={{ width: "400px" }}>
              <Slider
                value={amount}
                min={10000}
                max={10000000}
                step={1000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatAmount(value)}
                onChange={(e, value) => setAmount(value)}
              />
            </div>
          </div>
          <div className="text-center mt-3">
            {/* <button
            // className="btn btn-primary"
            // onClick={handleSubmit}
            // disabled={isSubmitting}
            // style={{
            //   backgroundColor: '#F15913',
            //   fontSize: '18px',
            //   fontWeight: '600',
            //   width: '100%',
            //   marginTop: '20px'
            // }}
            ></button> */}
            <button
              className="btn btn-primary"
              onClick={() => setCalculate(true)}
              style={{
                backgroundColor: '#218ed1ff',
                fontSize: '18px',
                color: "white",
                fontWeight: '600',
                marginTop: '20px'
              }}
            >
              Calculate
            </button>
          </div>
        </div>
      </div>

      {calculate && (
        <div className="calc-card text-center mt-3">
          <div className="calc-card-header">
            <p>
              Total amount to raise: <strong>{formatAmount(calculateFees(amount).totalAmount)}</strong>
            </p>
            <p>
              Disclaimer: This goal is the approximate amount you should consider setting where we assume that you would receive 70% of the total funds from {currency} contributions.
            </p>
          </div>
          <div className="calc-card-footer">
            <p>
              Want to raise: <strong>{formatAmount(amount)}</strong>
            </p>
            <p>
              Fundforbharat fees: <strong>{formatAmount(0)}</strong>
            </p>
            <p>
              Payment gateway fees: <strong>{formatAmount(calculateFees(amount).gatewayFee)}</strong>
            </p>
          </div>
        </div>
      )}

      {/* <div className="calculate-btn d-flex justify-content-center">
        <button onClick={() => navigate('/howitworks')}>
          Want to know how it works?
        </button>
      </div> */}
    </div>
  );
};
export default FundraiserCalculator;
