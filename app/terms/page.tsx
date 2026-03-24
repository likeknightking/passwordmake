import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service — PasswordMake.com',
  description: 'Terms of service for PasswordMake.com. Understand the terms and conditions for using our free password generator tools.',
  alternates: { canonical: 'https://passwordmake.com/terms' },
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-lg font-bold text-white hover:text-slate-300">🔐 Password Generator</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: March 2026</p>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Acceptance of Terms</h2>
            <p>By accessing and using PasswordMake.com (&quot;the site&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use this site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Description of Service</h2>
            <p>PasswordMake.com provides free online tools for generating secure passwords, passphrases, and PINs. These tools are intended for personal security purposes. All generation happens entirely in your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Disclaimer of Warranties</h2>
            <p>All tools are provided <strong className="text-white">&quot;as is&quot;</strong> and <strong className="text-white">&quot;as available&quot;</strong> without warranties of any kind, either express or implied. While we use the Web Crypto API for cryptographically secure random generation, we make no guarantees about the absolute security of any generated password. Security depends on many factors including password length, character set, storage practices, and the security of the services where passwords are used.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Limitation of Liability</h2>
            <p>PasswordMake.com and its operators shall not be liable for any damages arising from the use of or inability to use this site or its tools. This includes, but is not limited to, damages resulting from security breaches, unauthorized account access, or data loss. You use the tools at your own risk.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Not Security Advice</h2>
            <p>The tools and information provided on this site do not constitute professional security or cybersecurity advice. While we follow best practices for random password generation, you are responsible for your own security decisions, including how you store and manage your passwords.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Intellectual Property</h2>
            <p>All content on this site, including text, graphics, logos, code, and design, is the property of PasswordMake.com and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without prior written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">User Responsibilities</h2>
            <p>You agree to use this site only for lawful purposes. You are responsible for the security and storage of any passwords generated using our tools. You agree not to attempt to disrupt, overload, or interfere with the proper functioning of the site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Modifications to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the site following any changes constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-3">Contact</h2>
            <p>If you have any questions about these terms, please contact us at <strong className="text-white">contact@passwordmake.com</strong>.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
