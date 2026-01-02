import { type NextRequest, NextResponse } from "next/server"

// Mock email sending function - in production, use Resend or similar service
async function sendEmail(to: string, subject: string, html: string) {
  try {
    // In a real application, you would use a service like Resend, SendGrid, or AWS SES
    console.log(`[EMAIL] Sending to ${to}:`, subject)
    return true
  } catch (error) {
    console.error("Email sending error:", error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, email, productName, price, size, address, phone, razorpayPaymentId } = await request.json()

    // Customer confirmation email
    const customerEmailHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f5f1ed; padding: 20px; text-align: center; }
            .content { padding: 20px 0; }
            .order-details { background-color: #f5f1ed; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px; font-weight: 300;">Elegance</h1>
            </div>
            <div class="content">
              <h2>Thank You for Your Order!</h2>
              <p>We're thrilled to confirm your purchase. Your order has been successfully placed and payment received.</p>
              
              <div class="order-details">
                <h3 style="margin-top: 0;">Order Details</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Product:</strong> ${productName}</p>
                <p><strong>Size:</strong> ${size}</p>
                <p><strong>Price:</strong> ₹${price.toLocaleString("en-IN")}</p>
                <p><strong>Payment ID:</strong> ${razorpayPaymentId}</p>
              </div>

              <div class="order-details">
                <h3 style="margin-top: 0;">Delivery Address</h3>
                <p>${address.replace(/\n/g, "<br>")}</p>
                <p><strong>Phone:</strong> ${phone}</p>
              </div>

              <p>We'll process your order and send you a shipping confirmation within 24 hours. You can track your order using your Order ID.</p>
              
              <p>If you have any questions, please contact us at hello@elegance.com</p>
            </div>
            <div class="footer">
              <p>&copy; 2026 Elegance. All rights reserved.</p>
              <p>This is an automated email. Please do not reply directly.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Admin notification email
    const adminEmailHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f5f1ed; padding: 20px; text-align: center; }
            .content { padding: 20px 0; }
            .order-details { background-color: #f5f1ed; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px; font-weight: 300;">New Order Alert</h1>
            </div>
            <div class="content">
              <h2>New Order Received!</h2>
              
              <div class="order-details">
                <h3 style="margin-top: 0;">Order Information</h3>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Product:</strong> ${productName}</p>
                <p><strong>Size:</strong> ${size}</p>
                <p><strong>Price:</strong> ₹${price.toLocaleString("en-IN")}</p>
                <p><strong>Payment ID:</strong> ${razorpayPaymentId}</p>
              </div>

              <div class="order-details">
                <h3 style="margin-top: 0;">Customer Information</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Delivery Address:</strong></p>
                <p>${address.replace(/\n/g, "<br>")}</p>
              </div>

              <p><strong>Action Required:</strong> Please process this order and update the delivery status in the admin dashboard.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send emails
    const customerEmail = await sendEmail(email, "Order Confirmation - Elegance", customerEmailHtml)
    const adminEmail = await sendEmail("admin@elegance.com", `New Order: ${orderId}`, adminEmailHtml)

    return NextResponse.json({
      success: customerEmail && adminEmail,
      message: "Confirmation emails sent",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 })
  }
}
