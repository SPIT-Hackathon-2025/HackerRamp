
import React, { useState } from 'react';
import axios from 'axios';

const AadhaarVerification = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/verify-aadhaar', { aadhaarNumber });
      if (response.data.success) {
        setSuccessMessage('User verified successfully! Redirecting...');
        // Redirect to dashboard
        window.location.href = '/dashboard';  // You can change this URL to your actual dashboard URL
      } else {
        setSuccessMessage('Aadhaar not found on blockchain. Redirecting to verification page...');
        // Redirect to verification page
        window.location.href = '/verify-user';  // Change this to your verification page URL
      }
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Aadhaar Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Aadhaar Number:
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>Verify</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default AadhaarVerification;

