import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json()

    // Verify signature
    const body = orderId + "|" + paymentId
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(body).digest("hex")

    if (expectedSignature === signature) {
      return NextResponse.json({ verified: true })
    } else {
      return NextResponse.json({ verified: false }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
