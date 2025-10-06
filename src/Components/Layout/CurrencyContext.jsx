import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ADMIN_URL } from '../../constants/constant';

const CurrencyContext = createContext();

const CURRENCIES = {
  INR: { symbol: '₹', locale: 'en-IN' },
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  SGD: { symbol: 'S$', locale: 'en-SG' },
  HKD: { symbol: 'HK$', locale: 'zh-HK' },
  AED: { symbol: 'د.إ', locale: 'ar-AE' },
  AUD: { symbol: 'A$', locale: 'en-AU' },
  CAD: { symbol: 'C$', locale: 'en-CA' },
  EUR: { symbol: '€', locale: 'de-DE' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchConversionRates = async () => {
    try {
      const response = await axios.get(`${ADMIN_URL}/api/admin/dollar/get`);
      const currencyRatesFromBackend = response.data || {};

      // Convert { currency: value } into usable map
      const rates = {
        INR: 1, // base
        ...currencyRatesFromBackend
      };

      setConversionRates(rates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching conversion rates from backend:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversionRates();
    const interval = setInterval(fetchConversionRates, 3600000); // refresh hourly
    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount) => {
    if (!amount || !conversionRates[currency]) return `${CURRENCIES[currency].symbol}0`;
    const convertedAmount = amount / conversionRates[currency];
    return `${CURRENCIES[currency].symbol}${convertedAmount.toLocaleString(CURRENCIES[currency].locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const convertAmount = (amount, fromCurrency = 'INR') => {
    if (fromCurrency === currency || !conversionRates[currency]) return amount;
    return amount / conversionRates[currency];
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      formatAmount,
      convertAmount,
      currencies: Object.keys(CURRENCIES),
      loading,
      currencySymbols: CURRENCIES
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
