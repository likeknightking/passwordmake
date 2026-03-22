'use client'

import { PasswordOptions } from '@/lib/password-engine'

interface Props {
  options: PasswordOptions
  mode: 'password' | 'passphrase'
  passphraseWords: number
  passphraseSeparator: string
  onOptionsChange: (opts: PasswordOptions) => void
  onModeChange: (mode: 'password' | 'passphrase') => void
  onPassphraseWordsChange: (n: number) => void
  onPassphraseSeparatorChange: (s: string) => void
}

function Toggle({ label, checked, onChange, disabled }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean
}) {
  return (
    <label aria-disabled={disabled} className={`flex items-center justify-between py-2.5 cursor-pointer group ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-slate-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </label>
  )
}

export default function PasswordControls({
  options, mode, passphraseWords, passphraseSeparator,
  onOptionsChange, onModeChange, onPassphraseWordsChange, onPassphraseSeparatorChange,
}: Props) {
  const activeCount = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length

  function toggle(key: keyof PasswordOptions, value: boolean) {
    if (!value && activeCount === 1) return // keep at least one active
    onOptionsChange({ ...options, [key]: value })
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-5">
      {/* Mode Switch */}
      <div className="flex bg-slate-900 rounded-lg p-1 gap-1">
        {(['password', 'passphrase'] as const).map(m => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${mode === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === 'password' ? (
        <>
          {/* Length */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Length</label>
              <span className="text-sm font-mono font-bold text-indigo-400">{options.length}</span>
            </div>
            <input
              type="range"
              min={8}
              max={128}
              value={options.length}
              onChange={e => onOptionsChange({ ...options, length: Number(e.target.value) })}
              aria-label="Password length"
              aria-valuemin={8}
              aria-valuemax={128}
              aria-valuenow={options.length}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>8</span><span>128</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="divide-y divide-slate-700">
            <Toggle label="Uppercase (A-Z)" checked={options.uppercase} onChange={v => toggle('uppercase', v)} disabled={options.uppercase && activeCount === 1} />
            <Toggle label="Lowercase (a-z)" checked={options.lowercase} onChange={v => toggle('lowercase', v)} disabled={options.lowercase && activeCount === 1} />
            <Toggle label="Numbers (0-9)"   checked={options.numbers}   onChange={v => toggle('numbers', v)}   disabled={options.numbers && activeCount === 1} />
            <Toggle label="Symbols (!@#$)"  checked={options.symbols}   onChange={v => toggle('symbols', v)}   disabled={options.symbols && activeCount === 1} />
            <Toggle label="Exclude ambiguous (0, O, l, 1, I)" checked={options.excludeAmbiguous} onChange={v => onOptionsChange({ ...options, excludeAmbiguous: v })} />
          </div>
        </>
      ) : (
        <>
          {/* Word count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Number of words</label>
              <span className="text-sm font-mono font-bold text-indigo-400">{passphraseWords}</span>
            </div>
            <input
              type="range"
              min={3}
              max={8}
              value={passphraseWords}
              onChange={e => onPassphraseWordsChange(Number(e.target.value))}
              aria-label="Passphrase word count"
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Separator */}
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Separator</label>
            <div className="flex gap-2">
              {['-', ' ', '.', '_'].map(sep => (
                <button
                  key={sep}
                  onClick={() => onPassphraseSeparatorChange(sep)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${passphraseSeparator === sep ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                  {sep === ' ' ? 'space' : sep}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
