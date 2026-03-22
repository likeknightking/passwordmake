'use client'

import { useState, useCallback, useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import {
  PasswordOptions,
  PasswordResult,
  generatePassword,
  generatePassphrase,
} from '@/lib/password-engine'
import PasswordDisplay from './PasswordDisplay'
import StrengthMeter from './StrengthMeter'
import PasswordControls from './PasswordControls'
import BulkGenerator from './BulkGenerator'

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS)
  const [mode, setMode] = useState<'password' | 'passphrase'>('password')
  const [passphraseWords, setPassphraseWords] = useState(4)
  const [passphraseSeparator, setPassphraseSeparator] = useState('-')
  const [result, setResult] = useState<PasswordResult | null>(null)

  const generate = useCallback(() => {
    try {
      if (mode === 'passphrase') {
        setResult(generatePassphrase(passphraseWords, passphraseSeparator))
      } else {
        setResult(generatePassword(options))
      }
    } catch {
      // swallow if no charset selected
    }
  }, [mode, options, passphraseWords, passphraseSeparator])

  // Auto-generate a password on mount
  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleOptionsChange(newOpts: PasswordOptions) {
    setOptions(newOpts)
    try {
      setResult(generatePassword(newOpts))
    } catch { /* no-op */ }
  }

  function handleModeChange(m: 'password' | 'passphrase') {
    setMode(m)
    try {
      if (m === 'passphrase') {
        setResult(generatePassphrase(passphraseWords, passphraseSeparator))
      } else {
        setResult(generatePassword(options))
      }
    } catch { /* no-op */ }
  }

  return (
    <div className="space-y-4">
      {/* Privacy banner */}
      <div className="flex items-start gap-3 bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-3">
        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-300">
          <span className="font-semibold">100% client-side.</span>{' '}
          Passwords are generated in your browser using the Web Crypto API. Nothing is sent to any server. Ever.
        </p>
      </div>

      {/* Display */}
      <PasswordDisplay result={result} onRegenerate={generate} />

      {/* Strength meter */}
      <StrengthMeter result={result} />

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-base"
      >
        {mode === 'passphrase' ? 'Generate Passphrase' : 'Generate Password'}
      </button>

      {/* Controls */}
      <PasswordControls
        options={options}
        mode={mode}
        passphraseWords={passphraseWords}
        passphraseSeparator={passphraseSeparator}
        onOptionsChange={handleOptionsChange}
        onModeChange={handleModeChange}
        onPassphraseWordsChange={n => { setPassphraseWords(n); if (mode === 'passphrase') setResult(generatePassphrase(n, passphraseSeparator)) }}
        onPassphraseSeparatorChange={s => { setPassphraseSeparator(s); if (mode === 'passphrase') setResult(generatePassphrase(passphraseWords, s)) }}
      />

      {/* Bulk */}
      <BulkGenerator options={options} mode={mode} passphraseWords={passphraseWords} passphraseSeparator={passphraseSeparator} />
    </div>
  )
}
