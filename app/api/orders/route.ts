import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured. Please check your environment variables.")
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

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
    const { productId, productName, price, size, email, phone, address } = await request.json()

    console.log("Creating order for:", { productId, productName, price, size, email })

    // Create Razorpay order
    const razorpay = getRazorpay()
    const razorpayOrder = await razorpay.orders.create({
      amount: price * 100, // Amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    })

    console.log("Razorpay order created:", razorpayOrder.id)

    // Store order locally with customer details
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    orders[orderId] = {
      id: orderId,
      productId,
      productName,
      price,
      size,
      razorpayOrderId: razorpayOrder.id,
      status: "pending",
      email,
      phone,
      address,
      createdAt: new Date(),
    }

    return NextResponse.json({
      orderId,
      razorpayOrderId: razorpayOrder.id,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create order"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, razorpayPaymentId, email, phone, address } = await request.json()

    if (orders[orderId]) {
      // Update order status and payment info
      orders[orderId].status = "completed"
      orders[orderId].paymentId = razorpayPaymentId
      
      // Update customer details if provided
      if (email) orders[orderId].email = email
      if (phone) orders[orderId].phone = phone
      if (address) orders[orderId].address = address
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
