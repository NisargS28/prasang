"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-border/50 shadow-elegant">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-semibold tracking-tight" style={{ color: '#8B4513', fontFamily: "'Sahitya', serif" }}>प्रसंग</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-sm hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
