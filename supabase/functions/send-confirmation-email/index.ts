import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, city, tickets } = await req.json()

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vyvidh'25 Registration Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; font-weight: bold; }
        .payment-option { background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #667eea; }
        .contact-info { background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center; font-size: 16px; font-weight: bold; color: #2e7d32; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎉 Welcome to Vyvidh'25!</h1>
        <p>Your registration is confirmed</p>
      </div>
      
      <div class="content">
        <h2>Hello ${name}! 👋</h2>
        
        <p>Thank you for registering for <strong>Vyvidh'25</strong>! We're excited to have you join us for an incredible tech experience.</p>
        
        <div class="highlight">
          <h3>📋 Registration Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>City:</strong> ${city}</li>
            <li><strong>Tickets:</strong> ${tickets}</li>
          </ul>
        </div>
        
        <div class="highlight">
          <h3>📅 Event Information:</h3>
          <ul>
            <li><strong>Event:</strong> Vyvidh'25</li>
            <li><strong>Date:</strong> 26th to 27th September, 2025</li>
            <li><strong>Location:</strong> Will be shared soon</li>
          </ul>
        </div>
        
        <h3>💳 Payment Options:</h3>
        <div class="highlight">
          <p><strong>Total Amount: ₹${tickets * 30}</strong> (₹30 per ticket)</p>
          <p><strong>Choose your preferred payment method:</strong></p>
          
          <div class="payment-option">
            <strong>💵 Cash Payment:</strong><br>
            Pay at the venue during event registration
          </div>
          
          <div class="payment-option">
            <strong>📱 Digital Payment (GPay/PhonePe/Paytm):</strong><br><br>
            <p><strong>UPI ID:</strong> <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 4px; font-size: 16px;">jeswinjoy654@okhdfcbank</code></p>
            <p><strong>Amount to Pay:</strong> <span style="color: #e74c3c; font-weight: bold; font-size: 18px;">₹${tickets * 30}</span></p>
            <p><strong>Description:</strong> Vyvidh25 Registration (${tickets} tickets)</p>
            <br>
            <p><strong>Steps to Pay:</strong></p>
            <ol>
              <li>Open GPay, PhonePe, or Paytm</li>
              <li>Select "Pay to Contact" or "Send Money"</li>
              <li>Enter UPI ID: <strong>jeswinjoy654@okhdfcbank</strong></li>
              <li>Enter Amount: <strong>₹${tickets * 30}</strong></li>
              <li>Add Note: "Vyvidh25 Registration"</li>
              <li>Complete Payment</li>
            </ol>
          </div>
        </div>
        
        <div class="contact-info">
          📞 <strong>For more info, contact: <a href="tel:+918075637374" style="color: #2e7d32;">+91 8075637374</a></strong>
        </div>
        
        <h3>🎯 What's Next?</h3>
        <ul>
          <li>Save this email for your records</li>
          <li>Complete payment using your preferred method above</li>
          <li>Watch your inbox for event updates</li>
          <li>Join our community for latest announcements</li>
        </ul>
        
        <p>If you have any questions, feel free to reach out to our support team.</p>
        
        <div class="footer">
          <p>Best regards,<br>The Vyvidh'25 Team</p>
          <p>This is an automated confirmation email.</p>
        </div>
      </div>
    </body>
    </html>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Vyvidh\'25 <onboarding@resend.dev>', // Using Resend's test domain
        to: [email],
        subject: `🎉 Registration Confirmed - Vyvidh'25 | ${tickets} Ticket${tickets > 1 ? 's' : ''}`,
        html: emailHtml,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } else {
      const error = await res.text()
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})