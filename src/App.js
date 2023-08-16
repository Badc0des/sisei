import React, { useState } from 'react';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [eligibility, setEligibility] = useState(null);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const apiUrl = 'https://incentivized-testnet.seinetwork.io/check-eligibility';

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const checkEligibility = () => {
    fetch(`${apiUrl}?seiAddress=${address}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data yang diterima:', data);
        setEligibility(data.eligible);
        setReason(data.reason);
  
        // Extract the numeric part from the string and convert it to a number
        const amountStr = data.eligibleAmount;
        const numericAmount = parseFloat(amountStr.replace(/[^\d]/g, ''), 10);
        console.log(numericAmount)
        setAmount(numericAmount / 1000000);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  return (
    <div className="container">
      <center>
      <h1>Check Eligibility SEI</h1>
      <p>Paste address SEI, elig moal maneh ?</p>
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={handleAddressChange}
      />
      <button onClick={checkEligibility}>Check Eligibility</button>

      {eligibility !== null && (
        <div className="result">
          <h2>Eligibility Result</h2>
          <p>Address: {address}</p>
          <p>Eligibility: {eligibility ? 'elig euy' :  <img src='https://i.ibb.co/Svw9RJz/Whats-App-Image-2022-05-30-at-18-01-27.jpg' />} </p>
          <p>Reason: {reason}</p>
          <p>Amount: {amount} SEI</p>
        </div>
      )}
       <p><img src='https://i.ibb.co/PwYfg4r/Whats-App-Image-2022-04-07-at-12-28-50.jpg' ></img></p>
          <h1> ELIG SYUKUR, TEU ELIG LEBOK KUSIA</h1>
          </center>
    </div>
  );
}

export default App;
