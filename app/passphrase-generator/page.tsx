import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import PasswordGenerator from '@/components/PasswordGenerator'
import PasswordNav from '@/components/PasswordNav'
import AdSlot from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'Passphrase Generator — Create Strong, Memorable Passphrases',
  description:
    'Free online passphrase generator. Create random, XKCD-style passphrases using diceware word lists. Easy to remember, hard to crack. 100% client-side.',
  openGraph: {
    title: 'Passphrase Generator — Memorable & Secure',
    description: 'Generate diceware-style passphrases instantly. Easy to remember, impossible to guess.',
    type: 'website',
    url: 'https://passwordmake.com/passphrase-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passphrase Generator — Free & Secure',
    description: 'Create random, memorable passphrases. No data sent to any server.',
  },
  alternates: { canonical: 'https://passwordmake.com/passphrase-generator' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a passphrase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A passphrase is a password made up of multiple random words strung together, such as "correct-horse-battery-staple." Passphrases are typically longer than traditional passwords but far easier to remember, while still offering excellent security when generated randomly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the diceware method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Diceware is a method for generating passphrases by rolling physical dice to select words from a numbered list. Each word is chosen independently and at random, guaranteeing high entropy. Our tool replicates this process digitally using the cryptographically secure Web Crypto API.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many words should my passphrase have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most purposes, 4 words provide approximately 33 bits of entropy from a 300-word list, which is adequate for low-risk accounts. For high-security accounts, use 5-6 words. For master passwords protecting a password manager vault, 6-8 words is recommended.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a passphrase more secure than a random password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both can achieve the same level of security. A 5-word passphrase from a large word list can match the entropy of a 10-character random password. The advantage of passphrases is memorability: humans can remember sequences of words much more easily than strings of random characters.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the XKCD passphrase method?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The XKCD method, popularized by the webcomic XKCD #936, suggests using four random common words as a password. The comic demonstrated that "correct horse battery staple" has more entropy and is easier to remember than a shorter complex password like "Tr0ub4dor&3".',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add numbers or symbols to my passphrase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can increase entropy by adding a random number or symbol between words or at the end. However, the primary strength of a passphrase comes from the number of words. Adding a fifth word gives more entropy than appending a single digit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What separator should I use between passphrase words?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common separators include hyphens (-), spaces, periods (.), and underscores (_). Hyphens are the most popular because they are easy to type on all devices. The separator itself adds minimal entropy; the security comes from the random words.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this passphrase generator safe to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All passphrases are generated entirely in your browser using the Web Crypto API (crypto.getRandomValues). No data is ever transmitted to any server. The word selection uses unbiased cryptographic randomness, the same quality used in TLS certificates.',
      },
    },
  ],
}

export default function PassphraseGeneratorPage() {
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
            <h1 className="text-lg font-bold text-white">🔐 Passphrase Generator</h1>
          </div>
        </header>

        {/* Tool */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          <PasswordNav />

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Generate Secure Passphrases
            </h2>
            <p className="text-slate-400">
              Create random, memorable passphrases using diceware-style word lists. Easy to remember, impossible to crack.
            </p>
          </div>

          <PasswordGenerator />

          {/* Ad below generator */}
          <AdSlot slot="0987654321" format="rectangle" className="mx-auto mt-6" />

          {/* Ad between tool and SEO */}
          <AdSlot slot="5566778899" format="horizontal" />

          {/* SEO Content */}
          <article className="mt-16 prose prose-invert prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">What Is a Passphrase and Why Should You Use One?</h2>
            <p className="text-slate-400 leading-relaxed">
              A passphrase is a sequence of randomly selected words joined by a separator character. Unlike traditional passwords composed of jumbled letters, numbers, and symbols, passphrases leverage the vast combinatorial space of human language to create credentials that are both highly secure and genuinely memorable. The concept was popularized by the XKCD webcomic, which demonstrated that four common English words chosen at random can exceed the entropy of a shorter but more complex password.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              The reason passphrases work so well is rooted in information theory. When you select words randomly from a list of 300 entries, each word contributes approximately 8.2 bits of entropy. A four-word passphrase therefore delivers around 33 bits of entropy, while a six-word passphrase reaches roughly 49 bits. Larger word lists, such as the EFF's 7,776-word diceware list, yield about 12.9 bits per word, making a four-word passphrase approximately 51 bits — comparable to an eight-character random password with the full ASCII character set.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Diceware Method Explained</h2>
            <p className="text-slate-400 leading-relaxed">
              Diceware is a technique invented by Arnold Reinhold in 1995. The original method involves rolling five physical dice to produce a five-digit number, then looking up that number in a word list to find the corresponding word. By repeating the process several times you build a passphrase word by word. Because each die roll is physically random, the resulting passphrase is free from the cognitive biases that weaken human-chosen passwords.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              Our tool replicates the diceware principle digitally. Instead of rolling dice, we call the Web Crypto API to obtain cryptographically secure random numbers, which are then mapped to words in our curated word list using an unbiased rejection-sampling algorithm. The result is identical in quality to a physical dice roll — but instantaneous and repeatable with a single click. Every word is selected independently, ensuring the full entropy of the list is preserved.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">How Many Words Do You Need?</h2>
            <p className="text-slate-400 leading-relaxed">
              The number of words in your passphrase directly determines its strength. As a general guideline, three words is the minimum for any use, but four words is the practical starting point for most online accounts. For sensitive applications like your primary email, password manager master password, or full-disk encryption key, five to six words is recommended. If you are protecting classified or high-value assets, consider seven or eight words.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              Keep in mind that adding a single word to your passphrase multiplies the total number of possible combinations by the size of the word list. Going from four words to five words with a 300-word list multiplies the search space by 300 — far more effective than adding a random digit or symbol to the end. When in doubt, add another word rather than making the passphrase more complex with special characters.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Passphrase Best Practices</h2>
            <p className="text-slate-400 leading-relaxed">
              Always generate your passphrase using a cryptographic random source rather than picking words yourself. Humans are notoriously poor at choosing random words and tend to select related or common words, drastically reducing entropy. Use a different passphrase for every account. While passphrases are easier to remember than random strings, a password manager is still the best way to handle dozens of unique credentials.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              When choosing a separator, hyphens are the most popular option because they are easy to type on any keyboard layout, including mobile devices. Avoid using a separator that might conflict with the service's password rules — some systems disallow spaces, for example. Finally, never share your passphrase with anyone or store it in plain text. If you must write it down temporarily while memorizing it, keep the note in a physically secure location and destroy it once you have committed the passphrase to memory.
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
            Passphrase Generator — Free, secure, and 100% client-side.
          </p>
        </footer>
      </div>
    </>
  )
}
