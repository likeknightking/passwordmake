'use client'

import { useState, useEffect, useCallback } from 'react'
import { Copy, Check, RefreshCw, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function PinGenerator() {
  const [length, setLength] = useState(6)
  const [pin, setPin] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const arr = new Uint8Array(length)
    crypto.getRandomValues(arr)
    setPin(Array.from(arr, (b) => (b % 10).toString()).join(''))
  }, [length])

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleLengthChange(newLen: number) {
    setLength(newLen)
    const arr = new Uint8Array(newLen)
    crypto.getRandomValues(arr)
    setPin(Array.from(arr, (b) => (b % 10).toString()).join(''))
  }

  async function handleCopy() {
    if (!pin) return
    try {
      await navigator.clipboard.writeText(pin)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API may fail
    }
  }

  const entropy = length * Math.log2(10)

  return (
    <div className="space-y-4">
      {/* Privacy banner */}
      <div className="flex items-start gap-3 bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-3">
        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-300">
          <span className="font-semibold">100% client-side.</span>{' '}
          PINs are generated in your browser using crypto.getRandomValues. Nothing is sent to any server.
        </p>
      </div>

      {/* PIN Display */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
        <div className="min-h-[56px] flex items-center justify-center mb-4">
          <p className="font-mono text-4xl tracking-[0.5em] text-white select-all font-bold">
            {pin}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
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
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw size={15} /> Regenerate
          </button>
        </div>
      </div>

      {/* Strength info */}
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>{entropy.toFixed(0)} bits of entropy</span>
        <span>{Math.pow(10, length).toLocaleString()} possible combinations</span>
      </div>

      {/* Length selector */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm text-slate-300">PIN Length</label>
          <span className="text-sm font-mono font-bold text-indigo-400">{length} digits</span>
        </div>
        <div className="flex gap-2">
          {[4, 6, 8].map((n) => (
            <button
              key={n}
              onClick={() => handleLengthChange(n)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                length === n
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {n} digits
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generate}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-base"
      >
        Generate PIN
      </button>
    </div>
  )
}
