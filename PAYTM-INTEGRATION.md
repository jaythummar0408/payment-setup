# Paytm Payment Integration

## ✅ Configuration

**UPI ID:** `mab.03732203160171@axisbank`  
**Payment Method:** Paytm Only (No other UPI apps)

## 🔧 How It Works

The app uses Paytm's deep link scheme to open the Paytm app directly:

```
paytmmp://pay?pa=mab.03732203160171@axisbank&pn=Shop+Name&am=Amount&cu=INR
```

### Deep Link Parameters:
- `pa` - Payee Address (UPI ID)
- `pn` - Payee Name (Merchant/Shop Name)
- `am` - Amount
- `cu` - Currency (INR)

## 📱 User Flow

1. User enters Merchant ID (M001, M002, or M003)
2. Clicks "Pay with Paytm" button
3. App redirects to `paytmmp://` deep link
4. Paytm app opens automatically (if installed)
5. User completes payment in Paytm

## ⚠️ Important Notes

### Paytm App Required
- Users **must** have Paytm app installed on their device
- The deep link `paytmmp://` only works with Paytm app
- If Paytm is not installed, a confirmation dialog appears after 2 seconds

### Testing

**On Mobile Device:**
- Open the deployed URL on a mobile device with Paytm installed
- Enter a merchant ID and click "Pay with Paytm"
- Paytm app should open with pre-filled payment details

**On Desktop:**
- The deep link won't work (Paytm is a mobile app)
- Use mobile device or emulator for testing

### Fallback Options

If you want to add a fallback for users without Paytm:

1. **Redirect to Paytm Download:**
   Uncomment line 42 in `src/App.tsx`:
   ```typescript
   window.location.href = 'https://play.google.com/store/apps/details?id=net.one97.paytm'
   ```

2. **Add Generic UPI Option:**
   Change `paytmmp://` to `upi://` to allow any UPI app:
   ```typescript
   "M001": "upi://pay?pa=mab.03732203160171@axisbank&pn=Shop+One&am=1&cu=INR"
   ```

## 🚀 Deployment

After making changes, rebuild and deploy:

```bash
npm run build
```

Then deploy the `dist/` folder to your hosting platform.

## 🔍 Verification

To verify the integration:

1. Deploy the app
2. Open on a mobile device with Paytm installed
3. Test with merchant ID M001
4. Paytm should open with:
   - UPI ID: mab.03732203160171@axisbank
   - Amount: ₹1
   - Merchant: Shop One

## 📊 Current Merchants

| Merchant ID | Shop Name  | Amount |
|-------------|------------|--------|
| M001        | Shop One   | ₹1     |
| M002        | Shop Two   | ₹2     |
| M003        | Shop Three | ₹3     |

All payments go to: **mab.03732203160171@axisbank**

