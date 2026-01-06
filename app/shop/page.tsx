import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function Shop() {
  const products = [
    {
      id: 1,
      name: "Premium Designer Wear",
      price: 8999,
      image: "/img1.jpeg",
      category: "Dresses",
    },
    {
      id: 2,
      name: "Elegant Fashion Collection",
      price: 4499,
      image: "/img2.jpeg",
      category: "Tops",
    },
    {
      id: 3,
      name: "Luxury Wear",
      price: 6299,
      image: "/img3.jpeg",
      category: "Outerwear",
    },
    {
      id: 4,
      name: "Designer Collection",
      price: 3999,
      image: "/img4.jpeg",
      category: "Bottoms",
    },
    {
      id: 5,
      name: "Stylish Ensemble",
      price: 7899,
      image: "/img5.jpeg",
      category: "Dresses",
    },
    {
      id: 6,
      name: "Premium Fashion",
      price: 5499,
      image: "/img6.jpeg",
      category: "Tops",
    },
    {
      id: 7,
      name: "Elegant Designer Wear",
      price: 6799,
      image: "/img7.jpeg",
      category: "Outerwear",
    },
    {
      id: 8,
      name: "Luxury Collection",
      price: 4299,
      image: "/img8.jpeg",
      category: "Bottoms",
    },
    {
      id: 9,
      name: "Designer Fashion",
      price: 8499,
      image: "/img9.jpeg",
      category: "Dresses",
    },
    {
      id: 10,
      name: "Premium Style",
      price: 4999,
      image: "/img10.jpeg",
      category: "Tops",
    },
    {
      id: 11,
      name: "Elegant Collection",
      price: 6599,
      image: "/img11.jpeg",
      category: "Outerwear",
    },
    {
      id: 12,
      name: "Luxury Designer Wear",
      price: 3799,
      image: "/img12.jpeg",
      category: "Bottoms",
    },
    {
      id: 13,
      name: "Stylish Premium Wear",
      price: 7999,
      image: "/img13.jpeg",
      category: "Dresses",
    },
    {
      id: 14,
      name: "Designer Elegance",
      price: 5299,
      image: "/img14.jpeg",
      category: "Tops",
    },
    {
      id: 15,
      name: "Premium Collection",
      price: 6999,
      image: "/img15.jpeg",
      category: "Outerwear",
    },
    {
      id: 16,
      name: "Luxury Fashion",
      price: 4599,
      image: "/img16.jpeg",
      category: "Bottoms",
    },
    {
      id: 17,
      name: "Elegant Style",
      price: 8799,
      image: "/img17.jpeg",
      category: "Dresses",
    },
    {
      id: 18,
      name: "Designer Premium Wear",
      price: 5799,
      image: "/img18.jpeg",
      category: "Tops",
    },
    {
      id: 19,
      name: "Stylish Collection",
      price: 6399,
      image: "/img19.jpeg",
      category: "Outerwear",
    },
    {
      id: 20,
      name: "Premium Luxury Wear",
      price: 4899,
      image: "/img20.jpeg",
      category: "Bottoms",
    },
    {
      id: 21,
      name: "Elegant Designer Collection",
      price: 8299,
      image: "/img21.jpeg",
      category: "Dresses",
    },
    {
      id: 22,
      name: "Luxury Style",
      price: 5599,
      image: "/img22.jpeg",
      category: "Tops",
    },
    {
      id: 23,
      name: "Designer Fashion Wear",
      price: 6899,
      image: "/img23.jpeg",
      category: "Outerwear",
    },
    {
      id: 24,
      name: "Premium Elegance",
      price: 4399,
      image: "/img24.jpeg",
      category: "Bottoms",
    },
    {
      id: 25,
      name: "Luxury Designer Collection",
      price: 7599,
      image: "/img25(1).jpeg",
      category: "Dresses",
    },
  ]

  return (
    <>
      <Header />
      <main>
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
