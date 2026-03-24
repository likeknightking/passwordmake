import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-16 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-400 hover:text-slate-200">Password Generator</Link></li>
              <li><Link href="/passphrase-generator" className="text-slate-400 hover:text-slate-200">Passphrase Generator</Link></li>
              <li><Link href="/pin-generator" className="text-slate-400 hover:text-slate-200">PIN Generator</Link></li>
              <li><Link href="/password-strength-checker" className="text-slate-400 hover:text-slate-200">Password Strength Checker</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="text-slate-400 hover:text-slate-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-slate-200">Terms of Service</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-slate-200">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">More Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://loancalcemi.com" className="text-slate-400 hover:text-slate-200">EMI Calculator</a></li>
              <li><a href="https://calcinterest.com" className="text-slate-400 hover:text-slate-200">Compound Interest Calculator</a></li>
              <li><a href="https://formatmyjson.com" className="text-slate-400 hover:text-slate-200">JSON Formatter</a></li>
              <li><a href="https://freeinvoicegen.app" className="text-slate-400 hover:text-slate-200">Invoice Generator</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} PasswordMake.com. All rights reserved. Free, secure, and 100% client-side.</p>
        </div>
      </div>
    </footer>
  )
}
