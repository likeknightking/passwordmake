import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — PasswordMake.com',
  description: 'Learn about PasswordMake.com, a free password generator built by developers to help everyone create strong, secure passwords.',
  alternates: { canonical: 'https://passwordmake.com/about' },
}

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-lg font-bold text-white hover:text-slate-300">🔐 Password Generator</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">About PasswordMake.com</h1>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">What We Do</h2>
            <p>PasswordMake.com is a free online password generator designed to help everyone create strong, cryptographically secure passwords in seconds. Our tools include a random password generator, passphrase generator, PIN generator, and password strength checker, all running entirely in your browser with zero server-side processing.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Why We Built This</h2>
            <p>Weak and reused passwords remain the leading cause of account breaches worldwide. We built PasswordMake.com because generating a truly random, secure password should be effortless and private. Many online password generators either use weak randomness, require sign-ups, or transmit data to servers. Our tool uses the browser&apos;s native Web Crypto API for maximum security and never sends a single byte of password data anywhere.</p>
            <p className="mt-3">Built by developers for everyone who cares about online security, this tool prioritizes privacy, speed, and simplicity above all else.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Our Technology</h2>
            <p>PasswordMake.com is built with Next.js, React, and Tailwind CSS. Password generation relies on the <strong className="text-white">Web Crypto API</strong> (crypto.getRandomValues), which provides cryptographically secure random numbers sourced from the operating system kernel. This is the same quality of randomness used for TLS certificates and encryption keys. The entire application runs client-side with no backend involved in password generation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Our Other Free Tools</h2>
            <p>PasswordMake.com is part of a suite of free online tools built with the same philosophy of simplicity, privacy, and speed:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><a href="https://loancalcemi.com" className="text-indigo-400 hover:underline">LoanCalcEMI.com</a> — EMI calculator with amortization schedules for all loan types</li>
              <li><a href="https://calcinterest.com" className="text-indigo-400 hover:underline">CalcInterest.com</a> — Compound interest calculator with growth charts and inflation adjustment</li>
              <li><a href="https://formatmyjson.com" className="text-indigo-400 hover:underline">FormatMyJSON.com</a> — JSON formatter, validator, and converter powered by Monaco Editor</li>
              <li><a href="https://freeinvoicegen.app" className="text-indigo-400 hover:underline">FreeInvoiceGen.app</a> — Professional invoice and receipt generator with PDF export</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contact</h2>
            <p>Have feedback, suggestions, or questions? Reach us at <strong className="text-white">contact@passwordmake.com</strong>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
