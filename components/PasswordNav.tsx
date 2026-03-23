'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { KeyRound, Hash, ShieldCheck, Lock } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Password Generator', icon: Lock },
  { href: '/passphrase-generator', label: 'Passphrase Generator', icon: KeyRound },
  { href: '/pin-generator', label: 'PIN Generator', icon: Hash },
  { href: '/password-strength-checker', label: 'Strength Checker', icon: ShieldCheck },
]

export default function PasswordNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap gap-2 mb-8">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Icon size={14} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
