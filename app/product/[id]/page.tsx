"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { use, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createRazorpayOrder, getRazorpayKey } from "@/app/lib/actions"
import { products } from "@/lib/products"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = use(params as unknown as Promise<{ id: string }>)
  const productId = Number(id)
  const product = products.find((p) => p.id === productId) || products[0]
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [loading, setLoading] = useState(false)
  const [razorpayKey, setRazorpayKey] = useState("")

  useEffect(() => {
    getRazorpayKey().then(setRazorpayKey)
  }, [])

  const handleBuyNow = async () => {
    setLoading(true)
    try {
      const data = await createRazorpayOrder(product.id, product.name, product.price, selectedSize)

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
            name: "Elegance",
            description: `${product.name} - Size ${selectedSize}`,
            order_id: data.razorpayOrderId,
            handler: (response: any) => {
              window.location.href = `/success?orderId=${data.orderId}&razorpayId=${response.razorpay_payment_id}`
            },
            prefill: {
              email: "",
              contact: "",
            },
            theme: {
              color: "#b38971",
            },
          }
          const rzp = new (window as any).Razorpay(options)
          rzp.open()
        }
        document.body.appendChild(script)
      }
    } catch (error) {
      console.error("Error initiating payment:", error)
      alert("Failed to initiate payment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
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
