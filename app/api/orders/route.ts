import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

const orders: {
  [key: string]: {
    id: string
    productId: number
    productName: string
    price: number
    size: string
    razorpayOrderId: string
    status: string
    email?: string
    phone?: string
    address?: string
    paymentId?: string
    createdAt: Date
  }
} = {}

export async function POST(request: NextRequest) {
  try {
    const { productId, productName, price, size } = await request.json()

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: price * 100, // Amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    })

    // Store order locally
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    orders[orderId] = {
      id: orderId,
      productId,
      productName,
      price,
      size,
      razorpayOrderId: razorpayOrder.id,
      status: "pending",
      createdAt: new Date(),
    }

    return NextResponse.json({
      orderId,
      razorpayOrderId: razorpayOrder.id,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, razorpayPaymentId, email, phone, address } = await request.json()

    if (orders[orderId]) {
      orders[orderId].status = "completed"
      orders[orderId].paymentId = razorpayPaymentId
      orders[orderId].email = email
      orders[orderId].phone = phone
      orders[orderId].address = address

      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/send-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            email,
            productName: orders[orderId].productName,
            price: orders[orderId].price,
            size: orders[orderId].size,
            address,
            phone,
            razorpayPaymentId,
          }),
        })
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get("orderId")

    if (orderId && orders[orderId]) {
      return NextResponse.json(orders[orderId])
    }

    return NextResponse.json(Object.values(orders))
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
