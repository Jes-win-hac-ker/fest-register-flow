# Email Setup Instructions for Vyvidh'25

## 📧 Complete Email Integration Setup

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 2: Setup Resend Account (Recommended)
1. Go to [resend.com](https://resend.com) and create an account
2. Verify your domain or use their test domain for development
3. Get your API key from the dashboard
4. Copy your API key (starts with `re_`)

### Step 3: Configure Supabase Secrets
```bash
# Login to Supabase CLI
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_ID

# Set the Resend API key as a secret
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

### Step 4: Deploy the Email Function
```bash
# Deploy the edge function
supabase functions deploy send-confirmation-email
```

### Step 5: Update Email Domain
Edit `supabase/functions/send-confirmation-email/index.ts` and replace:
```typescript
from: 'Vyvidh\'25 <noreply@yourdomain.com>', // Replace with your verified domain
```

With your actual domain:
```typescript
from: 'Vyvidh\'25 <noreply@vyvidh25.com>', // Your actual domain
```

## 🧪 Testing the Email Function

### Test via Supabase Dashboard:
1. Go to Edge Functions in your Supabase dashboard
2. Find `send-confirmation-email` function
3. Test with this payload:
```json
{
  "name": "Test User",
  "email": "your-test-email@gmail.com",
  "city": "Test City",
  "tickets": 2
}
```

### Test via Registration Form:
1. Fill out your registration form
2. Check your email inbox (and spam folder)
3. You should receive a beautiful HTML confirmation email

## 🎨 Email Template Features

The confirmation email includes:
- ✅ Personalized greeting with user's name
- ✅ Complete registration details
- ✅ Event information (Vyvidh'25, dates, etc.)
- ✅ Next steps and instructions
- ✅ Professional HTML styling
- ✅ Mobile-responsive design

## 🔧 Alternative: Using SendGrid

If you prefer SendGrid over Resend, update the email function:

```typescript
const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email }] }],
    from: { email: 'noreply@yourdomain.com', name: 'Vyvidh\'25' },
    subject: `🎉 Registration Confirmed - Vyvidh'25`,
    content: [{ type: 'text/html', value: emailHtml }]
  }),
})
```

## 🚨 Troubleshooting

**Emails not sending?**
- Check Supabase Edge Function logs
- Verify Resend API key is set correctly
- Ensure domain is verified in Resend
- Check spam folder

**Function deployment failed?**
- Make sure Supabase CLI is installed and logged in
- Verify project is linked correctly
- Check function syntax

**Email template not rendering?**
- Test the HTML template separately
- Check for any syntax errors in the template
- Verify all variables are being passed correctly

## 🎯 Production Checklist

Before going live:
- [ ] Verify your domain with Resend
- [ ] Update the 'from' email address
- [ ] Test with multiple email providers
- [ ] Set up email analytics tracking
- [ ] Configure proper error handling
- [ ] Add email rate limiting if needed