# Payment Setup Instructions

## 🏦 Add Your UPI ID for Digital Payments

### Step 1: Get Your UPI ID
Your UPI ID is usually in one of these formats:
- `yourname@paytm`
- `yourname@okaxis` 
- `yourname@ybl` (PhonePe)
- `9876543210@paytm` (using phone number)

### Step 2: Update the Email Function
Edit `supabase/functions/send-confirmation-email/index.ts` and replace:

```typescript
pa=YOUR_UPI_ID@okaxis
```

With your actual UPI ID, for example:
```typescript
pa=vyvidh25@paytm
```

### Step 3: Set Ticket Price (Optional)
Currently set to ₹500 per ticket. To change the price, update:

```typescript
₹${tickets * 500}
```

Replace `500` with your actual ticket price.

### Step 4: Redeploy the Function
After making changes, redeploy:

```bash
supabase functions deploy send-confirmation-email
```

## 💳 Payment Options in Email

The email will now include:

1. **💵 Cash Payment**: Option to pay at venue
2. **📱 Digital Payment**: 
   - UPI link that opens GPay/PhonePe/Paytm
   - Shows total amount (tickets × price)
   - Works on mobile devices

3. **📞 Contact Info**: Your contact number prominently displayed

## 🧪 Testing Payment Links

1. **On Mobile**: The UPI link will open the default UPI app
2. **On Desktop**: Will show options to scan QR or open mobile app
3. **Amount**: Automatically calculated based on number of tickets

## 📱 How It Works for Users

1. User registers for event
2. Receives confirmation email
3. Sees two payment options:
   - Cash at venue
   - Instant digital payment via UPI
4. Can click UPI link to pay immediately
5. Has your contact number for questions

## 🔒 Security Note

- UPI links are safe and standard payment method in India
- Users see payment details before confirming
- No sensitive information is stored in the email