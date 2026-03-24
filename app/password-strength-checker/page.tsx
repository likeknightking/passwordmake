import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import StrengthChecker from '@/components/StrengthChecker'
import PasswordNav from '@/components/PasswordNav'
import AdSlot from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'Password Strength Checker — Test How Strong Your Password Is',
  description:
    'Free online password strength checker. Analyze entropy, estimated crack time, character composition, and get suggestions to improve your password. 100% client-side.',
  openGraph: {
    title: 'Password Strength Checker — Free Analysis',
    description: 'Check your password strength instantly. Entropy, crack time, and improvement tips.',
    type: 'website',
    url: 'https://passwordmake.com/password-strength-checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Strength Checker — Free & Private',
    description: 'Analyze your password strength. No data sent to any server.',
  },
  alternates: { canonical: 'https://passwordmake.com/password-strength-checker' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the password strength checker work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The checker analyzes your password locally in your browser. It calculates entropy based on the character set used and password length, estimates crack time assuming 10 billion guesses per second, counts character types (uppercase, lowercase, numbers, symbols), and checks for common patterns and weaknesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to enter my real password here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All analysis happens entirely in your browser using JavaScript. Your password is never transmitted over the network, stored in any database, or logged anywhere. You can verify this by disconnecting from the internet — the tool works fully offline.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does password entropy mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entropy measures the unpredictability of a password in bits. It is calculated as length times log2(charset size). Higher entropy means more possible combinations and exponentially longer brute-force times. A password with 60 bits of entropy has 2^60 (about 1.15 quintillion) possible combinations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good entropy score for a password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Below 40 bits is considered weak and can be cracked quickly. Between 40-60 bits is fair for low-risk accounts. Between 60-80 bits is strong and suitable for most accounts. Above 80 bits is considered unbreakable by current technology and is recommended for high-value targets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is crack time estimated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We assume an attacker using a modern GPU cluster capable of 10 billion guesses per second. The time is calculated as 2^entropy divided by 10 billion. This represents a well-funded, sophisticated attack using current hardware. Real-world attacks may be slower or faster depending on the hashing algorithm used by the service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my password show warnings even though it is long?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Length is only one factor. A long password using only lowercase letters has significantly less entropy per character than one using mixed case, numbers, and symbols. Additionally, common patterns (repeated characters, keyboard walks, dictionary words) reduce effective entropy regardless of length.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common weak password patterns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common weak patterns include: sequential numbers (123456), repeated characters (aaaaaa), keyboard walks (qwerty, asdfgh), dictionary words (password, welcome), names with numbers (john123), and dates (19901225). All of these are tried first in any dictionary-based attack.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I change my password if the checker says it is weak?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, especially for important accounts like email, banking, and any account that could be used for password resets. Use our password generator to create a strong, random replacement. Store the new password in a reputable password manager so you do not need to memorize it.',
      },
    },
  ],
}

export default function PasswordStrengthCheckerPage() {
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
            <h1 className="text-lg font-bold text-white">🔐 Password Strength Checker</h1>
          </div>
        </header>

        {/* Tool */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          <PasswordNav />

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Check Your Password Strength
            </h2>
            <p className="text-slate-400">
              Analyze entropy, crack time, and character composition. 100% private — nothing leaves your browser.
            </p>
          </div>

          <StrengthChecker />

          {/* Ad below tool */}
          <AdSlot slot="0987654321" format="rectangle" className="mx-auto mt-6" />

          {/* Ad between tool and SEO */}
          <AdSlot slot="5566778899" format="horizontal" />

          {/* SEO Content */}
          <article className="mt-16 prose prose-invert prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">What Makes a Password Strong?</h2>
            <p className="text-slate-400 leading-relaxed">
              A strong password has two fundamental properties: sufficient length and genuine randomness. Length determines how many character positions an attacker must guess, while randomness ensures that each position is unpredictable. Together, these properties create exponential difficulty for brute-force attacks. A 12-character password drawn from the full 95-character printable ASCII set has about 79 bits of entropy, meaning an attacker would need to try roughly 2^79 combinations — a number so large that even a cluster of GPUs running 10 billion guesses per second would need billions of years.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              However, not all long passwords are strong. A 20-character password consisting of a single repeated character has effectively zero entropy. Similarly, a password composed of dictionary words strung together predictably (such as a famous phrase or song lyric) is vulnerable to dictionary and rule-based attacks that test known word combinations. True strength comes from cryptographic randomness, where each character is selected independently from the full character set.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Understanding Entropy and Crack Time</h2>
            <p className="text-slate-400 leading-relaxed">
              Entropy is measured in bits and represents the number of binary decisions needed to uniquely identify a password. The formula is straightforward: entropy equals the password length multiplied by the base-2 logarithm of the character set size. Each additional bit of entropy doubles the number of possible passwords, making brute-force attacks exponentially harder. This is why even small increases in entropy translate to dramatically longer crack times.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              Crack time estimates assume a specific attack speed. Our checker uses 10 billion guesses per second, which represents a well-funded attacker with a modern GPU cluster running optimized code against a weak hash. Against a service using a slow hash function like bcrypt with a high work factor, actual crack times would be thousands of times longer. Conversely, against an unsalted MD5 hash, attacks can be even faster. The estimates provide a conservative baseline for evaluating your password.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Common Weak Password Patterns to Avoid</h2>
            <p className="text-slate-400 leading-relaxed">
              Attackers do not simply try every possible combination in order. They use sophisticated strategies that exploit human behavior. Dictionary attacks test common words and phrases. Rule-based attacks apply transformations like appending numbers, capitalizing the first letter, or replacing letters with similar-looking digits (a technique called leet speak). Hybrid attacks combine dictionary words with brute-force permutations. Credential stuffing uses passwords leaked from other breaches.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              The patterns most commonly exploited include sequential numbers and letters, keyboard walks (patterns traced on the keyboard like qwerty or zxcvbn), repeated characters, personal information such as names and birth dates, and simple modifications of common words. If your password follows any of these patterns, its effective entropy is far lower than the theoretical maximum, and it can likely be cracked in minutes or hours rather than centuries.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">How to Improve Your Password Security</h2>
            <p className="text-slate-400 leading-relaxed">
              The single most effective step is to use a password manager and generate a unique random password for every account. This eliminates password reuse — the most dangerous practice in personal security — and allows you to use maximally strong passwords without needing to remember them. For the few passwords you must memorize (your password manager master password and your computer login), use a randomly generated passphrase of five or more words.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              Enable two-factor authentication wherever possible. Even a strong password can be compromised through phishing, malware, or server-side breaches. A second factor — preferably a hardware security key or authenticator app — adds a layer of defense that a stolen password alone cannot bypass. Regularly check whether your credentials have appeared in known data breaches using services like Have I Been Pwned, and change any compromised passwords immediately.
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
            Password Strength Checker — Free, secure, and 100% client-side.
          </p>
        </footer>
      </div>
    </>
  )
}
