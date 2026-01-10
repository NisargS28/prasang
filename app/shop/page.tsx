import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { products } from "@/lib/products"

export default function Shop() {

  return (
    <>
      <Header />
      <main style={{ animation: 'fadeInUp 600ms ease-out' }}>
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Shop Collection</h1>
            <p className="text-muted-foreground text-lg">Discover our curated selection of premium women's fashion</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group cursor-pointer h-full card-hover">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-lg shadow-elegant">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                      <h3 className="font-medium text-lg transition-colors line-clamp-2 group-hover:text-[#7B8D6A]">
                        {product.name}
                      </h3>
                      <p className="text-primary font-semibold transition-colors group-hover:text-[#7B8D6A]">₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
