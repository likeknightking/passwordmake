'use client'

import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { PasswordOptions, PasswordResult, generateBulk, generatePassphrase } from '@/lib/password-engine'

interface Props {
  options: PasswordOptions
  mode: 'password' | 'passphrase'
  passphraseWords: number
  passphraseSeparator: string
}

export default function BulkGenerator({ options, mode, passphraseWords, passphraseSeparator }: Props) {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(10)
  const [results, setResults] = useState<PasswordResult[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  function generate() {
    if (mode === 'passphrase') {
      setResults(Array.from({ length: count }, () => generatePassphrase(passphraseWords, passphraseSeparator)))
    } else {
      setResults(generateBulk(options, count))
    }
  }

  async function copyOne(password: string, index: number) {
    try {
      await navigator.clipboard.writeText(password)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1200)
    } catch {
      // Clipboard API may fail in insecure contexts; fall back silently
    }
  }

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(results.map(r => r.password).join('\n'))
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 1500)
    } catch {
      // Clipboard API may fail in insecure contexts; fall back silently
    }
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-slate-300 hover:text-white transition-colors"
      >
        <span>Generate Multiple Passwords</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-700 pt-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-400">Count:</label>
            <select
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="bg-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-sm border border-slate-600 focus:outline-none focus:border-indigo-500"
            >
              {[5, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <button
              onClick={generate}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Generate
            </button>
            {results.length > 0 && (
              <button
                onClick={copyAll}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors ml-auto"
              >
                {copiedAll ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy All</>}
              </button>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {results.map((r, i) => (
                <li key={i} className="flex items-center justify-between bg-slate-900 rounded-lg px-3 py-2 gap-3">
                  <span className="font-mono text-sm text-slate-200 break-all">{r.password}</span>
                  <button
                    onClick={() => copyOne(r.password, i)}
                    className="shrink-0 text-slate-400 hover:text-white transition-colors"
                    aria-label={`Copy password ${i + 1}`}
                  >
                    {copiedIndex === i ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
