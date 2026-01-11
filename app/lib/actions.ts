"use server"

export async function createRazorpayOrder(productId: number, productName: string, price: number, size: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    console.log("Creating order with API URL:", apiUrl)
    
    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        price,
        size,
      }),
      cache: "no-store",
    })

    console.log("Response status:", response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
      throw new Error(`API Error: ${response.status} - ${errorText}`)
    }

    const text = await response.text()
    console.log("Response text:", text)
    
    if (!text) {
      throw new Error("Empty response from API")
    }

    const data = JSON.parse(text)
    return data
  } catch (error) {
    console.error("Error creating order:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to create order")
  }
}

export async function getRazorpayKey() {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""
}
