import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Silk Evening Dress",
      price: 8999,
      image: "/elegant-silk-evening-gown-for-women.jpg",
      category: "Dresses",
    },
    {
      id: 2,
      name: "Cashmere Sweater",
      price: 4499,
      image: "/luxury-cashmere-sweater-beige.jpg",
      category: "Tops",
    },
    {
      id: 3,
      name: "Designer Blazer",
      price: 6299,
      image: "/premium-tailored-blazer-women.jpg",
      category: "Outerwear",
    },
    {
      id: 4,
      name: "Linen Trousers",
      price: 3999,
      image: "/ivory-linen-trousers-women-fashion.jpg",
      category: "Bottoms",
    },
    {
      id: 5,
      name: "Silk Evening Dress",
      price: 8999,
      image: "/elegant-silk-evening-gown-for-women.jpg",
      category: "Dresses",
    },
    {
      id: 6,
      name: "Cashmere Sweater",
      price: 4499,
      image: "/luxury-cashmere-sweater-beige.jpg",
      category: "Tops",
    },
    {
      id: 7,
      name: "Designer Blazer",
      price: 6299,
      image: "/premium-tailored-blazer-women.jpg",
      category: "Outerwear",
    },
    {
      id: 8,
      name: "Linen Trousers",
      price: 3999,
      image: "/ivory-linen-trousers-women-fashion.jpg",
      category: "Bottoms",
    },
  ]

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Shop Collection</h1>
            <p className="text-muted-foreground text-lg">Discover our curated selection of premium women's fashion</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group cursor-pointer h-full">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                      <h3 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-primary font-semibold">₹{product.price.toLocaleString("en-IN")}</p>
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
