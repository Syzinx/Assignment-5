import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyTable.css';

const CurrencyTable = () => {
  const [rates, setRates] = useState({});
  const [error, setError] = useState(null);
  const apiKey = '877414f3bb7f4a7f96e08db855b83dad'

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`https://api.currencyfreaks.com/latest?apikey=${apiKey}`);
        setRates(response.data.rates);
      } catch (error) {
        setError("Failed to fetch data");
      }
    };
    fetchRates();
  }, [apiKey]);

  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

  const renderRows = () => {
    return currencies.map((currency) => {
      const exchangeRate = parseFloat(rates[currency]);
      const weBuy = exchangeRate * 1.05;
      const weSell = exchangeRate * 0.95;

      return (
        <tr key={currency}>
          <td>{currency}</td>
          <td>{weBuy.toFixed(4)}</td>
          <td>{exchangeRate.toFixed(4)}</td>
          <td>{weSell.toFixed(4)}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <h2>Currency Exchange Rates (Base: USD)</h2>
      {error ? (
        <div className="alert" role="alert">
          {error}
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {rates && renderRows()}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CurrencyTable;
