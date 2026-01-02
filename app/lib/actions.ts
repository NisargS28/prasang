"use server"

export async function createRazorpayOrder(productId: number, productName: string, price: number, size: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        price,
        size,
      }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating order:", error)
    throw new Error("Failed to create order")
  }
}

export async function getRazorpayKey() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""
}
