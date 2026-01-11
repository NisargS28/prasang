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
        // First try to get order from localStorage for immediate display
        const pendingOrderStr = localStorage.getItem("pendingOrder")
        if (pendingOrderStr) {
          const pendingOrder = JSON.parse(pendingOrderStr)
          setOrder(pendingOrder)
        }

        // Then fetch from API
        const response = await fetch(`/api/orders?orderId=${orderId}`)
        const data = await response.json()
        
        // Update with API data if available
        if (data && data.productName) {
          setOrder(data)
        }
        
        // If we have razorpayId and order details, update order and send email
        if (razorpayId && pendingOrderStr) {
          const pendingOrder = JSON.parse(pendingOrderStr)
          
          // Update order with payment ID and trigger email
          await fetch("/api/orders", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              razorpayPaymentId: razorpayId,
              email: pendingOrder.email,
              phone: pendingOrder.phone,
              address: pendingOrder.address,
            }),
          })
          
          // Clear localStorage after successful update
          localStorage.removeItem("pendingOrder")
        }
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId, razorpayId])

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
            <p className="text-lg text-muted-foreground mb-4">Please Take Screenshot of this page & Send it to Us on Whatsapp for Order Confirmation</p>
            <p className="text-sm text-muted-foreground mb-6">Order ID: {orderId}</p>
            
            {order && (
              <a
                href={`https://wa.me/918200100418?text=${encodeURIComponent(
                  `ORDER CONFIRMATION\n\n` +
                  `Order Details:\n` +
                  `Order ID: ${orderId}\n` +
                  `Payment ID: ${razorpayId}\n\n` +
                  `Product Information:\n` +
                  `Product: ${order.productName}\n` +
                  `Size: ${order.size}\n` +
                  `Amount: Rs.${order.price?.toLocaleString("en-IN") || "N/A"}\n\n` +
                  `Customer Details:\n` +
                  `Email: ${order.email || "N/A"}\n` +
                  `Phone: ${order.phone || "N/A"}\n\n` +
                  `Delivery Address:\n` +
                  `${order.address || "N/A"}\n\n` +
                  `Please confirm my order. Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#25D366]/90 transition-colors shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Send Order Details on WhatsApp
              </a>
            )}
          </div>

          {order && order.productName && (
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
                {order.price && (
                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-primary">₹{order.price.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>
            </div>
          )}


          <div className="max-w-2xl mx-auto text-center">
            {/* <p className="text-muted-foreground mb-4">You will receive an email confirmation shortly.</p> */}
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
