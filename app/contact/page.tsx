"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    }, 500)
  }

  return (
    <>
      <Header />
      <main>
        <section className="bg-secondary py-20 md:py-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight max-w-2xl">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-tight">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">hello@elegance.com</p>
                      <p className="text-muted-foreground text-sm">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+91 (0) 1234 567890</p>
                      <p className="text-muted-foreground text-sm">Monday to Friday, 10am - 6pm IST</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">123 Fashion District</p>
                      <p className="text-muted-foreground">New Delhi, Delhi 110001</p>
                      <p className="text-muted-foreground">India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-secondary border border-border">
                  <h3 className="font-semibold mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-primary hover:underline text-sm">
                      Instagram
                    </a>
                    <a href="#" className="text-primary hover:underline text-sm">
                      Facebook
                    </a>
                    <a href="#" className="text-primary hover:underline text-sm">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-tight">Send us a Message</h2>
                {submitted && (
                  <div className="bg-secondary border border-primary p-4 mb-6 text-sm">
                    <p className="font-medium">Thank you for your message!</p>
                    <p className="text-muted-foreground">We'll get back to you soon.</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-border px-4 py-3 bg-background focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your message..."
                      rows={6}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
