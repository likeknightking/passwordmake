'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PasswordResult } from '@/lib/password-engine'

interface Props {
  result: PasswordResult | null
  onRegenerate: () => void
}

export default function PasswordDisplay({ result, onRegenerate }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API may fail in insecure contexts or when denied; fall back silently
    }
  }

  function colorChar(char: string): string {
    if (/[A-Z]/.test(char)) return 'text-blue-400'
    if (/[a-z]/.test(char)) return 'text-slate-200'
    if (/[0-9]/.test(char)) return 'text-emerald-400'
    return 'text-orange-400'
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
      {/* Password text */}
      <div className="min-h-[56px] flex items-center mb-4">
        {result ? (
          <p className="font-mono text-lg break-all leading-relaxed tracking-wide select-all">
            {result.password.split('').map((char, i) => (
              <span key={i} className={colorChar(char)}>{char}</span>
            ))}
          </p>
        ) : (
          <p className="font-mono text-slate-500 text-lg">Click generate to create a password</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          disabled={!result}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                <Check size={15} /> Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                <Copy size={15} /> Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors"
        >
          <RefreshCw size={15} /> Regenerate
        </button>
      </div>
    </div>
  )
}
