import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import PinGenerator from '@/components/PinGenerator'
import PasswordNav from '@/components/PasswordNav'
import AdSlot from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'PIN Generator — Create Random, Secure PINs Instantly',
  description:
    'Free online PIN generator. Create cryptographically random 4, 6, or 8 digit PINs using the Web Crypto API. 100% client-side, nothing sent to any server.',
  openGraph: {
    title: 'PIN Generator — Random & Secure',
    description: 'Generate random numeric PINs instantly. 100% private, runs in your browser.',
    type: 'website',
    url: 'https://passwordmake.com/pin-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIN Generator — Free & Secure',
    description: 'Create random, secure PINs. No data sent to any server.',
  },
  alternates: { canonical: 'https://passwordmake.com/pin-generator' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a PIN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A PIN (Personal Identification Number) is a short numeric code used to authenticate a user. PINs are commonly used for ATM cards, phone lock screens, SIM cards, and two-factor authentication. They typically range from 4 to 8 digits.',
      },
    },
    {
      '@type': 'Question',
      name: 'How secure is a 4-digit PIN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A random 4-digit PIN has 10,000 possible combinations (10^4) and approximately 13.3 bits of entropy. While this is low compared to a full password, PINs are usually paired with lockout mechanisms that limit the number of guesses an attacker can make, making them effective for their intended use cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use a 6-digit or 8-digit PIN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 6-digit PIN has 1,000,000 combinations (about 19.9 bits of entropy) and is the standard for many banking and authentication apps. An 8-digit PIN offers 100,000,000 combinations (about 26.6 bits). Use the longest PIN your device or service supports for maximum security.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a PIN insecure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common insecure PINs are predictable sequences like 1234, 0000, 1111, or dates like birth years (1990, 2000). Studies show that roughly 11% of all PINs are 1234. A randomly generated PIN avoids these patterns entirely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this PIN generator safe to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All PINs are generated entirely in your browser using the Web Crypto API (crypto.getRandomValues). No data is transmitted to any server. The random number generation uses the operating system cryptographic random number generator.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use a PIN instead of a password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PINs are best suited for situations where brute-force attacks are physically limited: ATM cards (card is retained after 3 failed attempts), phone lock screens (progressive delays after failures), and hardware security keys. For online accounts without lockout, always use a full password or passphrase.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the same PIN for multiple accounts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Reusing PINs creates a chain of vulnerability: if one PIN is compromised, all accounts sharing that PIN are at risk. Generate a unique random PIN for every device and service. Our generator makes it easy to create as many unique PINs as you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a random PIN compare to one I choose myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Self-chosen PINs are far more predictable than random ones. Research shows that user-selected 4-digit PINs cover only about 25% of the available keyspace, while a cryptographically random PIN is uniformly distributed across all 10,000 possibilities, making it dramatically harder to guess.',
      },
    },
  ],
}

export default function PinGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <header className="border-b border-slate-800 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-lg font-bold text-white">🔐 PIN Generator</h1>
          </div>
        </header>

        {/* Tool */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          <PasswordNav />

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Generate Random PINs
            </h2>
            <p className="text-slate-400">
              Create cryptographically random numeric PINs. Secure, instant, and 100% private.
            </p>
          </div>

          <PinGenerator />

          {/* Ad below generator */}
          <AdSlot slot="0987654321" format="rectangle" className="mx-auto mt-6" />

          {/* Ad between tool and SEO */}
          <AdSlot slot="5566778899" format="horizontal" />

          {/* SEO Content */}
          <article className="mt-16 prose prose-invert prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Understanding PINs and Their Role in Security</h2>
            <p className="text-slate-400 leading-relaxed">
              A Personal Identification Number, or PIN, is a short numeric code used to verify identity. PINs are one of the oldest and most widespread authentication mechanisms in the world, first introduced in the 1960s for ATM machines. Today, they protect everything from debit cards and SIM cards to smartphone lock screens, garage door openers, and two-factor authentication codes. Despite their simplicity, PINs remain effective because they are almost always paired with a physical factor (something you have) or a lockout mechanism that limits guessing attempts.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              The security of a PIN depends on two factors: its randomness and the system that enforces it. A randomly generated 4-digit PIN has 10,000 possible combinations. While that number is small by cryptographic standards, most systems lock out an attacker after three to five incorrect attempts, making brute-force attacks impractical. However, if the PIN is predictable — such as 1234, 0000, or a birth year — an attacker can guess it within a handful of tries.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Random PINs Are Essential</h2>
            <p className="text-slate-400 leading-relaxed">
              Studies of leaked PIN databases reveal alarming patterns. The most common 4-digit PIN, 1234, accounts for nearly 11 percent of all PINs in some datasets. The top 20 most common PINs together cover almost 27 percent of all users. Attackers know these statistics and will try the most popular PINs first, a strategy that is devastatingly effective against human-chosen codes.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              A cryptographically random PIN eliminates this vulnerability entirely. When every digit is selected independently and uniformly at random, every possible PIN is equally likely. There are no patterns, no favorite numbers, and no birthday-derived codes for an attacker to exploit. Our generator uses the Web Crypto API to produce truly random digits, ensuring each PIN is as unpredictable as mathematically possible.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Choosing the Right PIN Length</h2>
            <p className="text-slate-400 leading-relaxed">
              The number of digits in your PIN determines the size of the search space an attacker must exhaust. A 4-digit PIN has 10,000 combinations (13.3 bits of entropy). A 6-digit PIN jumps to 1,000,000 combinations (19.9 bits). An 8-digit PIN reaches 100,000,000 combinations (26.6 bits). Each additional digit multiplies the search space by ten, so longer PINs are exponentially harder to crack.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              For ATM cards and basic device locks, 4 digits is the standard because the system enforces a strict attempt limit. For banking apps and authentication services, 6 digits is increasingly common. For high-security applications where the lockout policy is uncertain or where the PIN might be exposed to offline analysis, 8 digits provides a substantial safety margin. Always use the longest PIN your service or device supports.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">When to Use a PIN vs. a Password</h2>
            <p className="text-slate-400 leading-relaxed">
              PINs and passwords serve different threat models. Use a PIN when the system enforces lockout after a few failed attempts: ATM machines, phone lock screens, hardware tokens, and embedded devices. In these contexts, even a 4-digit random PIN provides adequate protection because the attacker is physically limited in the number of guesses they can make.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              Use a full password or passphrase for online accounts where an attacker might be able to attempt billions of guesses offline — for instance, if a hashed password database is stolen. In that scenario, a 4-digit PIN would be cracked almost instantly, regardless of how randomly it was generated. The key takeaway is that PINs are strong in rate-limited environments and weak without them. Choose the right tool for the right context.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Frequently Asked Questions</h2>

            <AdSlot slot="1122334455" format="article" className="my-4" />

            {faqJsonLd.mainEntity.map((faq) => (
              <div key={faq.name} className="mt-6">
                <h3 className="text-lg font-semibold text-white">{faq.name}</h3>
                <p className="text-slate-400 leading-relaxed mt-2">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </article>
        </main>
        <Footer />

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-16 py-8 text-center">
          <p className="text-slate-500 text-sm">
            PIN Generator — Free, secure, and 100% client-side.
          </p>
        </footer>
      </div>
    </>
  )
}
