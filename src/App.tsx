import { useState } from 'react'
import './App.css'

interface Merchants {
  [key: string]: string;
}

function App() {
  const [merchantId, setMerchantId] = useState<string>('')
  const [error, setError] = useState<string>('')

  const merchants: Merchants = {
    "M001": "paytmmp://pay?pa=jppatel10125-2@okicici&pn=Shop+One&am=1&cu=INR",
    "M002": "paytmmp://pay?pa=jppatel10125-2@okicici&pn=Shop+Two&am=2&cu=INR",
    "M003": "paytmmp://pay?pa=jppatel10125-2@okicici&pn=Shop+Three&am=3&cu=INR"
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

    // Paytm-specific deep link
    const paytmUrl = merchants[merchantId]

    // Try to open Paytm app directly
    window.location.href = paytmUrl

    // Fallback: If Paytm app is not installed, show message after a delay
    setTimeout(() => {
      const opened = confirm('If Paytm did not open, please make sure Paytm app is installed on your device.')
      if (!opened) {
        // Optional: Redirect to Paytm download page
        // window.location.href = 'https://play.google.com/store/apps/details?id=net.one97.paytm'
      }
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          onKeyDown={handleKeyDown}
        />
        <button onClick={handlePay}>Pay with Paytm</button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="merchant-info">
        <p className="payment-method">💳 Payment Method: Paytm Only</p>
        <p>Available Merchant IDs:</p>
        <ul>
          <li>M001 - Shop One (₹1)</li>
          <li>M002 - Shop Two (₹2)</li>
          <li>M003 - Shop Three (₹3)</li>
        </ul>
        <p className="upi-info">UPI ID: mab.03732203160171@axisbank</p>
      </div>
    </div>
  )
}

export default App
