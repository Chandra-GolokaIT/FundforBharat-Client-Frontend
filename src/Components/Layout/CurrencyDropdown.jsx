import React from 'react';
import { useCurrency } from './CurrencyContext';
import './CurrencyDropdown.css';

const CurrencyDropdown = ({ click }) => {
  const {
    currency,
    setCurrency,
    currencies,
    loading,
    currencySymbols
  } = useCurrency();

  if (loading) {
    return <div className="currency-dropdown-loading">...</div>;
  }

  return (
    <div className="currency-dropdown">
      <select
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
          if (click) click();
        }}
        className="currency-select"
      >
        {currencies.map((code) => (
          <option key={code} value={code}>
            {currencySymbols[code].symbol} {code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;