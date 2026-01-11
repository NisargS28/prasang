"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { use, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { products } from "@/lib/products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = use(params as unknown as Promise<{ id: string }>)
  const productId = Number(id)
  const product = products.find((p) => p.id === productId) || products[0]
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [loading, setLoading] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [checkoutData, setCheckoutData] = useState({ email: "", phone: "", address: "" })
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""

  const handleBuyNow = () => {
    setShowCheckoutForm(true)
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!razorpayKey) {
      alert("Payment system is not configured. Please contact support.")
      return
    }

    setLoading(true)
    try {
      console.log("Creating order for product:", product.id)
      
      // Call API directly from client
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          size: selectedSize,
          email: checkoutData.email,
          phone: checkoutData.phone,
          address: checkoutData.address,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", errorText)
        throw new Error(`Failed to create order: ${errorText}`)
      }

      const data = await response.json()
      console.log("Order created:", data)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.razorpayOrderId) {
        // Store order info for success page
        localStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            orderId: data.orderId,
            razorpayOrderId: data.razorpayOrderId,
            productName: product.name,
            price: product.price,
            size: selectedSize,
            email: checkoutData.email,
            phone: checkoutData.phone,
            address: checkoutData.address,
          }),
        )

        // Load Razorpay
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => {
          const options = {
            key: razorpayKey,
            amount: product.price * 100,
            currency: "INR",
            name: "Prasang",
            description: `${product.name} - Size ${selectedSize}`,
            order_id: data.razorpayOrderId,
            handler: (response: any) => {
              window.location.href = `/success?orderId=${data.orderId}&razorpayId=${response.razorpay_payment_id}`
            },
            prefill: {
              email: checkoutData.email,
              contact: checkoutData.phone,
            },
            theme: {
              color: "#b38971",
            },
          }
          const rzp = new (window as any).Razorpay(options)
          rzp.open()
        }
        script.onerror = () => {
          alert("Failed to load payment gateway. Please check your internet connection.")
          setLoading(false)
        }
        document.body.appendChild(script)
      } else {
        throw new Error("Invalid response from server")
      }
    } catch (error) {
      console.error("Error initiating payment:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to initiate payment. Please try again."
      alert(errorMessage)
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main style={{ animation: 'fadeInUp 600ms ease-out' }}>
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft size={20} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="aspect-[3/4] bg-muted overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-start">
              <h1 className="text-3xl md:text-4xl font-light mb-2 tracking-tight">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6" style={{ color: '#5A3A2E' }}>₹{product.price.toLocaleString("en-IN")}</p>

              <p className="text-foreground mb-8 leading-relaxed">{product.description}</p>

              <div className="mb-8">
                <h3 className="font-semibold mb-4">Size</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border flex items-center justify-center font-medium transition-colors ${
                        selectedSize === size
                          ? "text-white border-[#5A3A2E]"
                          : "border-border hover:border-foreground"
                      }`}
                      style={selectedSize === size ? { backgroundColor: '#5A3A2E' } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={loading || !razorpayKey}
                className="w-full bg-primary text-primary-foreground py-4 font-semibold hover:bg-primary/90 transition-colors mb-4 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>

              {showCheckoutForm && (
                <div className="mb-4 bg-secondary p-6 border border-border">
                  <h3 className="font-semibold mb-4">Checkout Details</h3>
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                        className="w-full border border-border px-4 py-2 bg-background"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        className="w-full border border-border px-4 py-2 bg-background"
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                      <textarea
                        required
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        className="w-full border border-border px-4 py-2 bg-background"
                        placeholder="Enter your full address"
                        rows={3}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Proceed to Payment"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      className="w-full border border-border py-3 font-medium hover:bg-secondary transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}

              <a
                href={`https://wa.me/918200100418?text=${encodeURIComponent(
                  `Hi, I'm interested in:\n\n${product.name}\nPrice: ₹${product.price.toLocaleString("en-IN")}\nSize: ${selectedSize}\n\nPlease provide more details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 font-semibold hover:bg-[#25D366]/90 transition-colors mb-8 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Inquire Now
              </a>

              <div className="space-y-6 border-t border-border pt-6">
                <div>
                  <h4 className="font-semibold mb-2">Fabric</h4>
                  <p className="text-muted-foreground">{product.fabric}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Care Instructions</h4>
                  <p className="text-muted-foreground">{product.care}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
