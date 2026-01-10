"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-border/50 shadow-elegant">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-3xl font-semibold tracking-tight" style={{ color: '#7B8D6A', fontFamily: "'Sahitya', serif" }}>प्रसंग</span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm hover:text-primary transition-colors">
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
      </header>

      {/* Mobile Navigation Drawer - Outside header for proper z-index stacking */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 md:hidden"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998,
              animation: 'fadeIn 300ms ease-out'
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Drawer */}
          <div 
            className="fixed md:hidden"
            style={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: '#FFFFFF',
              zIndex: 9999,
              overflowY: 'auto',
              animation: 'slideInFromRight 300ms ease-out'
            }}
          >
            {/* Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px', borderBottom: '1px solid #E5E7EB' }}>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ 
                  padding: '8px',
                  borderRadius: '9999px',
                  backgroundColor: '#F3F4F6',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 200ms, transform 150ms'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E5E7EB'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                aria-label="Close menu"
              >
                <X size={24} color="#000000" strokeWidth={2} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', paddingTop: '32px' }}>
              <Link 
                href="/" 
                style={{ 
                  padding: '20px 32px',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#000000',
                  borderBottom: '1px solid #E5E7EB',
                  textDecoration: 'none',
                  transition: 'background-color 200ms, padding-left 200ms',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                  e.currentTarget.style.paddingLeft = '40px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.paddingLeft = '32px'
                }}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                style={{ 
                  padding: '20px 32px',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#000000',
                  borderBottom: '1px solid #E5E7EB',
                  textDecoration: 'none',
                  transition: 'background-color 200ms, padding-left 200ms',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                  e.currentTarget.style.paddingLeft = '40px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.paddingLeft = '32px'
                }}
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/about" 
                style={{ 
                  padding: '20px 32px',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#000000',
                  borderBottom: '1px solid #E5E7EB',
                  textDecoration: 'none',
                  transition: 'background-color 200ms, padding-left 200ms',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                  e.currentTarget.style.paddingLeft = '40px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.paddingLeft = '32px'
                }}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                style={{ 
                  padding: '20px 32px',
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#000000',
                  textDecoration: 'none',
                  transition: 'background-color 200ms, padding-left 200ms',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                  e.currentTarget.style.paddingLeft = '40px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.paddingLeft = '32px'
                }}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
          
          <style jsx>{`
            @keyframes slideInFromRight {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </>
      )}
    </>
  )
}
