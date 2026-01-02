import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Silk Evening Dress",
      price: 8999,
      image: "/elegant-silk-evening-gown-for-women.jpg",
    },
    {
      id: 2,
      name: "Cashmere Sweater",
      price: 4499,
      image: "/luxury-cashmere-sweater-beige.jpg",
    },
    {
      id: 3,
      name: "Designer Blazer",
      price: 6299,
      image: "/premium-tailored-blazer-women.jpg",
    },
    {
      id: 4,
      name: "Linen Trousers",
      price: 3999,
      image: "/ivory-linen-trousers-women-fashion.jpg",
    },
  ]

  return (
    <>
      <Header />
      <main>
        <section className="bg-secondary py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight text-balance">Timeless Elegance</h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Discover our premium collection of women's fashion, curated for those who appreciate quality, style, and
                sophistication.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-light mb-12 tracking-tight">Best Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-primary font-semibold">₹{product.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-light mb-12 tracking-tight text-center">Premium Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light mb-4">100%</div>
                <h3 className="font-semibold mb-2">Natural Fabrics</h3>
                <p className="text-muted-foreground">Sourced from the finest mills worldwide</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light mb-4">✓</div>
                <h3 className="font-semibold mb-2">Sustainable</h3>
                <p className="text-muted-foreground">Eco-conscious production practices</p>
              </div>
              <div className="text-center">
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
