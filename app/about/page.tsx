import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function About() {
  return (
    <>
      <Header />
      <main style={{ animation: 'fadeInUp 600ms ease-out' }}>
        <section className="bg-secondary py-8 md:py-12 min-h-[calc(100vh-80px)] flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">Our Story</h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Prasang was born from a small dream and a big love for fashion.  
Rooted in Gujarati culture, where colors speak, fabrics feel like home, and every outfit tells a prasang.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg transform rotate-3"></div>
                  <div className="relative bg-white p-2 rounded-lg shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <Image
                      src="/abt.jpeg"
                      alt="Richa Thakkar"
                      width={300}
                      height={380}
                      className="rounded-md object-cover"
                    />
                  </div>
                </div>
                <p className="mt-4 text-lg font-light tracking-wide">Richa Thakkar</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-light mb-6 tracking-tight">Who We Are</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We believe that every woman deserves to feel confident and beautiful in her clothing. Our mission is
                  to curate a collection of pieces that are not just fashionable, but also timeless, high-quality, and
                  sustainable.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Each piece in our collection is carefully selected and crafted using only the finest natural fabrics
                  and sustainable practices. We work directly with designers and manufacturers who share our commitment
                  to quality and environmental responsibility.
                </p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-light mb-6 tracking-tight">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-1 bg-primary mt-1"></div>
                    <div>
                      <h3 className="font-semibold mb-1">Quality First</h3>
                      <p className="text-muted-foreground text-sm">
                        We never compromise on the quality of our fabrics or craftsmanship.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-1 bg-primary mt-1"></div>
                    <div>
                      <h3 className="font-semibold mb-1">Sustainability</h3>
                      <p className="text-muted-foreground text-sm">
                        Our practices are designed to minimize environmental impact.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-1 bg-primary mt-1"></div>
                    <div>
                      <h3 className="font-semibold mb-1">Timelessness</h3>
                      <p className="text-muted-foreground text-sm">
                        We design pieces that transcend trends and last for years.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-1 bg-primary mt-1"></div>
                    <div>
                      <h3 className="font-semibold mb-1">Customer Care</h3>
                      <p className="text-muted-foreground text-sm">
                        Your satisfaction and experience are our top priorities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-light mb-12 tracking-tight text-center">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-light mb-4 text-primary">100%</div>
                <h3 className="font-semibold mb-2 text-lg">Natural Materials</h3>
                <p className="text-muted-foreground">
                  We exclusively use natural, ethically sourced fabrics in all our collections.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light mb-4 text-primary">1</div>
                <h3 className="font-semibold mb-2 text-lg">Years of Experience</h3>
                <p className="text-muted-foreground">
                  Our team brings decades of fashion expertise and design excellence.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light mb-4 text-primary">1K+</div>
                <h3 className="font-semibold mb-2 text-lg">Happy Customers</h3>
                <p className="text-muted-foreground">
                  We're proud to serve thousands of satisfied customers worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
