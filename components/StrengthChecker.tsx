'use client'

import { useState } from 'react'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

interface Analysis {
  length: number
  uppercase: number
  lowercase: number
  numbers: number
  symbols: number
  entropy: number
  strength: 'weak' | 'fair' | 'strong' | 'unbreakable'
  crackTime: string
  warnings: string[]
}

const COMMON_PATTERNS = [
  /^(password|123456|qwerty|abc123|letmein|admin|welcome|monkey|dragon|master)/i,
  /^(.)\1+$/,                    // all same char
  /^(012|123|234|345|456|567|678|789|890)+/,  // sequential numbers
  /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+/i, // sequential letters
]

function analyzePassword(password: string): Analysis {
  const length = password.length
  const uppercase = (password.match(/[A-Z]/g) || []).length
  const lowercase = (password.match(/[a-z]/g) || []).length
  const numbers = (password.match(/[0-9]/g) || []).length
  const symbols = (password.match(/[^A-Za-z0-9]/g) || []).length

  let charsetSize = 0
  if (uppercase > 0) charsetSize += 26
  if (lowercase > 0) charsetSize += 26
  if (numbers > 0) charsetSize += 10
  if (symbols > 0) charsetSize += 33

  const entropy = charsetSize > 0 ? length * Math.log2(charsetSize) : 0

  let strength: Analysis['strength']
  if (entropy < 40) strength = 'weak'
  else if (entropy < 60) strength = 'fair'
  else if (entropy < 80) strength = 'strong'
  else strength = 'unbreakable'

  // Crack time at 10 billion guesses/sec
  const guesses = Math.pow(2, entropy)
  const seconds = guesses / 1e10
  let crackTime: string
  if (seconds < 1) crackTime = 'less than a second'
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`
  else if (seconds < 31536000 * 1000) crackTime = `${Math.round(seconds / 31536000).toLocaleString()} years`
  else if (seconds < 31536000 * 1e9) crackTime = `${(seconds / 31536000 / 1e6).toFixed(1)} million years`
  else crackTime = 'longer than the age of the universe'

  // Warnings
  const warnings: string[] = []
  if (length < 8) warnings.push('Password is shorter than 8 characters.')
  if (length < 12) warnings.push('Consider using at least 12 characters for better security.')
  if (uppercase === 0) warnings.push('No uppercase letters detected.')
  if (lowercase === 0) warnings.push('No lowercase letters detected.')
  if (numbers === 0) warnings.push('No numbers detected.')
  if (symbols === 0) warnings.push('No symbols detected. Adding symbols significantly increases entropy.')
  COMMON_PATTERNS.forEach((pattern) => {
    if (pattern.test(password)) warnings.push('Contains a common or predictable pattern.')
  })
  const uniqueChars = new Set(password).size
  if (uniqueChars < length * 0.4) warnings.push('Low character diversity. Many repeated characters.')

  return { length, uppercase, lowercase, numbers, symbols, entropy, strength, crackTime, warnings }
}

const STRENGTH_CONFIG = {
  weak:        { label: 'Weak',        color: 'bg-red-500',     textColor: 'text-red-400',     width: '25%' },
  fair:        { label: 'Fair',        color: 'bg-orange-400',  textColor: 'text-orange-400',  width: '50%' },
  strong:      { label: 'Strong',      color: 'bg-emerald-500', textColor: 'text-emerald-400', width: '75%' },
  unbreakable: { label: 'Unbreakable', color: 'bg-indigo-500',  textColor: 'text-indigo-400',  width: '100%' },
}

export default function StrengthChecker() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const analysis = password.length > 0 ? analyzePassword(password) : null
  const config = analysis ? STRENGTH_CONFIG[analysis.strength] : null

  return (
    <div className="space-y-4">
      {/* Privacy banner */}
      <div className="flex items-start gap-3 bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-3">
        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-300">
          <span className="font-semibold">100% client-side.</span>{' '}
          Your password never leaves your browser. All analysis runs locally using JavaScript.
        </p>
      </div>

      {/* Input */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
        <label className="block text-sm text-slate-300 mb-2">Enter or paste a password to check</label>
        <div className="relative">
          <input
            type={visible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password here..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-indigo-500 pr-12"
            autoComplete="off"
          />
          <button
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {analysis && (
        <>
          {/* Strength bar */}
          <div className="space-y-2">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${config?.color ?? 'bg-slate-600'}`}
                initial={{ width: 0 }}
                animate={{ width: config?.width ?? '0%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${config?.textColor}`}>{config?.label}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-400">{analysis.entropy.toFixed(0)} bits entropy</span>
              </div>
              <span className="text-slate-400">
                Crack time: <span className="text-slate-300">{analysis.crackTime}</span>
              </span>
            </div>
          </div>

          {/* Character breakdown */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Character Analysis</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">Length</span>
                <p className="text-lg font-bold text-white">{analysis.length}</p>
              </div>
              <div className="bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">Uppercase (A-Z)</span>
                <p className="text-lg font-bold text-blue-400">{analysis.uppercase}</p>
              </div>
              <div className="bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">Lowercase (a-z)</span>
                <p className="text-lg font-bold text-slate-200">{analysis.lowercase}</p>
              </div>
              <div className="bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">Numbers (0-9)</span>
                <p className="text-lg font-bold text-emerald-400">{analysis.numbers}</p>
              </div>
              <div className="bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">Symbols</span>
                <p className="text-lg font-bold text-orange-400">{analysis.symbols}</p>
              </div>
              <div className="bg-slate-900 rounded-lg px-3 py-2">
                <span className="text-xs text-slate-400">Unique Characters</span>
                <p className="text-lg font-bold text-indigo-400">{new Set(password).size}</p>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {analysis.warnings.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">Suggestions</h3>
              <ul className="space-y-1.5">
                {analysis.warnings.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-orange-400 shrink-0 mt-0.5">&#9888;</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
