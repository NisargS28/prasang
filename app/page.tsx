import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { products } from "@/lib/products"

export default function Home() {
  // Select first 4 products from shop collection as featured/best sellers
  const featuredProducts = products.slice(0, 4)

  return (
    <>
      <Header />
      <main style={{ animation: 'fadeInUp 600ms ease-out' }}>
        <section className="py-8 md:py-12 relative overflow-hidden h-[calc(100vh-80px)] flex items-start md:items-center">
          {/* Taj Mahal background image for mobile */}
          <div 
            className="absolute inset-0 md:hidden" 
            style={{
              backgroundImage: 'url(/richa_mobile.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%'
            }}
          ></div>
          
          {/* Taj Mahal background image for desktop - clear on right for portrait, blurred on left for text */}
          <div 
            className="absolute inset-0 hidden md:block" 
            style={{
              backgroundImage: 'url(/richa.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%'
            }}
          ></div>
          
          {/* Gradient overlay - strong on left for text readability, transparent on right for portrait clarity */}
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to right, rgba(175, 168, 158, 0.95) 0%, rgba(175, 168, 158, 0.85) 40%, rgba(175, 168, 158, 0.3) 70%, transparent 100%)'
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10 pt-8 md:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="max-w-2xl fade-in-up">
                <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-tight text-balance">Timeless Elegance</h1>
                <p className="text-base md:text-lg text-muted-foreground mb-6 text-pretty">
                  From festivals to daily wear, PRASANG was born to dress every chapter of your life—traditional at heart, modern in style.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-white px-8 py-3 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                  style={{ backgroundColor: '#5A3A2E' }}
                >
                  Explore Collection
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-light mb-12 tracking-tight">Best Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group cursor-pointer card-hover">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-lg shadow-elegant">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-2 transition-colors group-hover:text-[#7B8D6A]">
                      {product.name}
                    </h3>
                    <p className="text-primary font-semibold transition-colors group-hover:text-[#7B8D6A]">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="gradient-secondary py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-light mb-12 tracking-tight text-center">Premium Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-elegant card-hover">
                <div className="text-4xl font-light mb-4">100%</div>
                <h3 className="font-semibold mb-2">Natural Fabrics</h3>
                <p className="text-muted-foreground">Sourced from the finest mills worldwide</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-elegant card-hover">
                <div className="text-4xl font-light mb-4">✓</div>
                <h3 className="font-semibold mb-2">Sustainable</h3>
                <p className="text-muted-foreground">Eco-conscious production practices</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/50 backdrop-blur-sm shadow-elegant card-hover">
                <div className="text-4xl font-light mb-4">∞</div>
                <h3 className="font-semibold mb-2">Timeless Design</h3>
                <p className="text-muted-foreground">Pieces that transcend trends</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
