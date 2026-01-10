import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Privacy() {
  return (
    <>
      <Header />
      <main style={{ animation: 'fadeInUp 600ms ease-out' }}>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-light mb-8 tracking-tight">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <section>
              <p className="text-sm text-muted-foreground mb-8">Last updated: January 10, 2026</p>
              
              <p>
                At प्रसंग (Prasang), we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Personal Information</h3>
              <p>When you place an order or contact us, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping address</li>
                <li>Billing address</li>
                <li>Payment information (processed securely through Razorpay)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground">Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Prevent fraudulent transactions</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Payment Information Security</h2>
              <p>
                We use Razorpay as our payment gateway. All payment information is processed securely through Razorpay's 
                PCI DSS compliant platform. We do not store your complete credit card or debit card information on our servers. 
                Razorpay handles all payment data in accordance with industry security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment processors:</strong> Razorpay for processing payments</li>
                <li><strong>Shipping partners:</strong> To deliver your orders</li>
                <li><strong>Service providers:</strong> Who help us operate our business</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your 
                device that help us remember your preferences and understand how you use our site. You can disable cookies 
                in your browser settings, but this may affect some functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your personal data</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:prasang051@gmail.com" className="text-primary hover:underline">prasang051@gmail.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required by law. Order information is typically 
                retained for 7 years to comply with tax and accounting regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Children's Privacy</h2>
              <p>
                Our website is not intended for children under 18 years of age. We do not knowingly collect personal 
                information from children. If you believe we have collected information from a child, please contact us 
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an 
                updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>Email:</strong> <a href="mailto:prasang051@gmail.com" className="text-primary hover:underline">prasang051@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+918200100418" className="text-primary hover:underline">+91 82001 00418</a></p>
              </div>
            </section>

            <section className="mt-12 pt-8 border-t border-border">
              <p className="text-sm">
                By using our website, you consent to the terms of this Privacy Policy and our collection and use of 
                information as described herein.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
