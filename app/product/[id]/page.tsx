"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { use, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createRazorpayOrder, getRazorpayKey } from "@/app/lib/actions"

const products: {
  [key: number]: {
    id: number
    name: string
    price: number
    image: string
    description: string
    sizes: string[]
    fabric: string
    care: string
  }
} = {
  1: {
    id: 1,
    name: "Silk Evening Dress",
    price: 8999,
    image: "/img1.jpeg",
    description:
      "Exquisite silk evening dress perfect for special occasions. Features elegant draping and impeccable tailoring.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Pure Silk",
    care: "Dry clean only. Handle with care to preserve the natural sheen.",
  },
  2: {
    id: 2,
    name: "Cashmere Sweater",
    price: 4499,
    image: "/img2.jpeg",
    description: "Premium cashmere blend sweater in soft beige. Perfect for layering or standalone styling.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "70% Cashmere, 30% Silk",
    care: "Hand wash in cool water or dry clean for best results.",
  },
  3: {
    id: 3,
    name: "Designer Blazer",
    price: 6299,
    image: "/img3.jpeg",
    description: "Timeless tailored blazer with impeccable fit. A versatile piece for professional and casual styling.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Virgin Wool",
    care: "Dry clean recommended. Press on low heat if needed.",
  },
  4: {
    id: 4,
    name: "Linen Trousers",
    price: 3999,
    image: "/img4.jpeg",
    description: "Elegant linen trousers with a clean silhouette. Perfect for summer and resort wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Pure Linen",
    care: "Machine wash cold. Linen wrinkles naturally, which adds to its charm.",
  },
  5: {
    id: 5,
    name: "Silk Evening Dress",
    price: 8999,
    image: "/img5.jpeg",
    description:
      "Exquisite silk evening dress perfect for special occasions. Features elegant draping and impeccable tailoring.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Pure Silk",
    care: "Dry clean only. Handle with care to preserve the natural sheen.",
  },
  6: {
    id: 6,
    name: "Cashmere Sweater",
    price: 4499,
    image: "/img6.jpeg",
    description: "Premium cashmere blend sweater in soft beige. Perfect for layering or standalone styling.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "70% Cashmere, 30% Silk",
    care: "Hand wash in cool water or dry clean for best results.",
  },
  7: {
    id: 7,
    name: "Designer Blazer",
    price: 6299,
    image: "/img7.jpeg",
    description: "Timeless tailored blazer with impeccable fit. A versatile piece for professional and casual styling.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Virgin Wool",
    care: "Dry clean recommended. Press on low heat if needed.",
  },
  8: {
    id: 8,
    name: "Linen Trousers",
    price: 3999,
    image: "/img8.jpeg",
    description: "Elegant linen trousers with a clean silhouette. Perfect for summer and resort wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Pure Linen",
    care: "Machine wash cold. Linen wrinkles naturally, which adds to its charm.",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = use(params as unknown as Promise<{ id: string }>)
  const productId = Number(id)
  const product = products[productId] || products[1]
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
              <p className="text-2xl text-primary font-semibold mb-6">₹{product.price.toLocaleString("en-IN")}</p>

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
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={loading || !razorpayKey}
                className="w-full bg-primary text-primary-foreground py-4 font-semibold hover:bg-primary/90 transition-colors mb-8 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>

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
