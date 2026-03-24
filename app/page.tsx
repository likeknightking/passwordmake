import PasswordGenerator from '@/components/PasswordGenerator'
import PasswordNav from '@/components/PasswordNav'
import AdSlot from '@/components/AdSlot'
import Footer from '@/components/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Password Generator',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online password generator. Creates strong, random passwords using the Web Crypto API. 100% client-side.',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this password generator safe to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All passwords are generated entirely in your browser using the Web Crypto API (crypto.getRandomValues). No data is ever transmitted to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should my password be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most accounts, 16 characters is excellent. For highly sensitive accounts (banking, email), use 20+ characters. Longer is always better.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a passphrase and is it better than a password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A passphrase is a sequence of random words (e.g., correct-horse-battery-staple). They are easier to remember than random characters and can be just as secure. A 4-word passphrase from a 300-word list has approximately 33 bits of entropy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use symbols in my password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Symbols increase entropy significantly. A 12-character password with only lowercase has 56 bits of entropy. Adding symbols increases the character pool to 95, raising entropy to 78 bits for the same length.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does "entropy" mean in password security?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entropy measures the unpredictability of a password in bits. Higher entropy means more possible combinations and a harder brute-force attack. 60+ bits is considered strong for most use cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a different password for every account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Reusing passwords is one of the most dangerous security practices. If one service suffers a data breach, attackers will try that password on every other major site — a technique called credential stuffing. A unique random password for each account ensures that a single breach cannot cascade.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Web Crypto API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Web Crypto API is a browser-native interface that provides access to cryptographic primitives, including a cryptographically secure random number generator (CSPRNG). It draws entropy from the operating system kernel, producing randomness of the same quality used for TLS certificates and encryption keys.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use a password manager?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A password manager lets you generate and store a unique, strong password for every account without memorizing any of them. You only need to remember one master password or passphrase. Reputable password managers encrypt your vault locally, so even the service provider cannot read your passwords.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <header className="border-b border-slate-800 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-lg font-bold text-white">🔐 Password Generator</h1>
          </div>
        </header>

        {/* Tool */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          <PasswordNav />

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Generate Strong Passwords
            </h2>
            <p className="text-slate-400">
              Free, secure, and 100% private. Runs entirely in your browser.
            </p>
          </div>

          <p className="text-slate-400 leading-relaxed mb-8 text-center max-w-xl mx-auto">
            A strong, unique password is your first line of defense against account breaches and identity theft. This tool uses your browser&apos;s cryptographic random number generator to create passwords that are virtually impossible to crack. Customize length, character types, and complexity to meet any security requirement.
          </p>

          <PasswordGenerator />

          {/* Ad — below generator */}
          <AdSlot slot="1383762911" format="rectangle" className="mx-auto mt-6" />

          {/* Ad — between tool and SEO content */}
          <AdSlot slot="5794048117" format="horizontal" />

          {/* SEO Content */}
          <article className="mt-16 prose prose-invert prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why You Need a Strong Password</h2>
            <p className="text-slate-400 leading-relaxed">
              Weak passwords are the number one cause of account breaches. A password like <code className="text-indigo-400">password123</code> can be cracked in under a second by modern hardware. A randomly generated 16-character password with mixed character types, on the other hand, would take millions of years to brute-force — even with a GPU cluster running billions of guesses per second.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              The difference between a weak and strong password is not about memorability — it is about randomness. Human-chosen passwords follow predictable patterns (birthdays, pet names, keyboard walks like <code className="text-indigo-400">qwerty</code>). A cryptographic random generator has no patterns, making it exponentially harder to attack.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">How Our Password Generator Works</h2>
            <p className="text-slate-400 leading-relaxed">
              This tool uses the <strong className="text-white">Web Crypto API</strong> — specifically <code className="text-indigo-400">crypto.getRandomValues()</code> — which is built into every modern browser and uses the operating system's cryptographically secure random number generator (CSPRNG). This is the same level of randomness used in TLS certificates and cryptographic keys.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              All generation happens locally in your browser tab. No network request is made. Your passwords never touch our servers — in fact, we don't even have a server component involved in password generation.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Password vs Passphrase: Which is More Secure?</h2>
            <p className="text-slate-400 leading-relaxed">
              Both can be equally secure when generated randomly. A <strong className="text-white">random password</strong> like <code className="text-indigo-400">X#k9mR!qLv2@</code> packs maximum entropy into a short string but is hard to remember. A <strong className="text-white">passphrase</strong> like <code className="text-indigo-400">correct-horse-battery-staple</code> is easier to type and remember while still being extremely strong.
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              For accounts you need to type regularly (OS login, password manager master password), a 4-6 word passphrase is often the better choice. For everything else stored in a password manager, use a 16-20 character random password.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">How Long Should Your Password Be?</h2>
            <p className="text-slate-400 leading-relaxed">
              Password strength is primarily a function of length and character set size. Here is a quick reference:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1 mt-4">
              <li><strong className="text-white">8 characters</strong> — Minimum acceptable. Not recommended for sensitive accounts.</li>
              <li><strong className="text-white">12 characters</strong> — Good for most accounts.</li>
              <li><strong className="text-white">16 characters</strong> — Excellent. Effectively uncrackable with full character set.</li>
              <li><strong className="text-white">20+ characters</strong> — Maximum security for banking, email, and password managers.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Frequently Asked Questions</h2>

            <AdSlot slot="6363926151" format="article" className="my-4" />

            {faqJsonLd.mainEntity.map((faq) => (
              <div key={faq.name} className="mt-6">
                <h3 className="text-lg font-semibold text-white">{faq.name}</h3>
                <p className="text-slate-400 leading-relaxed mt-2">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}
