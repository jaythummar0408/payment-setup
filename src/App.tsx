import { useState } from 'react'
import './App.css'

interface Merchants {
  [key: string]: string;
}

function App() {
  const [merchantId, setMerchantId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const merchants: Merchants = {
    "M001": "upi://pay?pa=jppatel10125-2@okicici&pn=Shop+One&am=1&cu=INR",
    "M002": "upi://pay?pa=jppatel10125-2@okicici&pn=Shop+Two&am=2&cu=INR",
    "M003": "upi://pay?pa=jppatel10125-2@okicici&pn=Shop+Three&am=3&cu=INR"
  }

  const handlePay = () => {
    setError('')

    if (!merchantId.trim()) {
      setError('Please enter a Merchant ID')
      return
    }

    if (!merchants[merchantId]) {
      setError('Invalid Merchant ID')
      return
    }

    window.location.href = merchants[merchantId]
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePay()
    }
  }

  return (
    <div className="app-container">
      <h1>Payment Gateway</h1>
      <div className="payment-form">
        <input
          id="mid"
          type="text"
          placeholder="Merchant ID"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handlePay}>Pay</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="merchant-info">
        <p>Available Merchant IDs:</p>
        <ul>
          <li>M001 - Shop One (₹1)</li>
          <li>M002 - Shop Two (₹2)</li>
          <li>M003 - Shop Three (₹3)</li>
        </ul>
      </div>
    </div>
  )
}

export default App
