"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const razorpayId = searchParams.get("razorpayId")
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ email: "", phone: "", address: "" })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?orderId=${orderId}`)
        const data = await response.json()
        setOrder(data)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          razorpayPaymentId: razorpayId,
          ...formData,
        }),
      })

      setShowForm(false)
      alert("Order confirmed! Check your email for the confirmation.")
    } catch (error) {
      console.error("Error updating order:", error)
      alert("Failed to confirm order details.")
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <p>Loading order details...</p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-light mb-4 tracking-tight">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase</p>
            <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
          </div>

          {order && (
            <div className="max-w-2xl mx-auto bg-secondary p-8 mb-8">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-medium">{order.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium">{order.size}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-primary">₹{order.price.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          )}

          {!showForm ? (
            <div className="max-w-2xl mx-auto text-center">
              <button
                onClick={() => setShowForm(true)}
                className="bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors mb-8"
              >
                Complete Delivery Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-secondary p-8 mb-8">
              <h2 className="font-semibold text-lg mb-6">Delivery Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-border px-4 py-2 bg-background"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-border px-4 py-2 bg-background"
                    placeholder="+91"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-border px-4 py-2 bg-background"
                    placeholder="Enter your full address"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          )}

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">You will receive an email confirmation shortly.</p>
            <Link href="/shop" className="text-primary font-medium hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
