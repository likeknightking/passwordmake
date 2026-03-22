'use client'

import { motion } from 'framer-motion'
import { PasswordResult } from '@/lib/password-engine'

interface Props {
  result: PasswordResult | null
}

const STRENGTH_CONFIG = {
  weak:         { label: 'Weak',         color: 'bg-red-500',    width: '25%',  textColor: 'text-red-400'    },
  fair:         { label: 'Fair',         color: 'bg-orange-400', width: '50%',  textColor: 'text-orange-400' },
  strong:       { label: 'Strong',       color: 'bg-emerald-500',width: '75%',  textColor: 'text-emerald-400'},
  unbreakable:  { label: 'Unbreakable',  color: 'bg-indigo-500', width: '100%', textColor: 'text-indigo-400' },
}

export default function StrengthMeter({ result }: Props) {
  const config = result ? STRENGTH_CONFIG[result.strength] : null

  return (
    <div className="space-y-2">
      {/* Bar */}
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${config?.color ?? 'bg-slate-600'}`}
          initial={{ width: 0 }}
          animate={{ width: config?.width ?? '0%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          {config ? (
            <>
              <span className={`font-semibold ${config.textColor}`}>{config.label}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">{result!.entropy.toFixed(0)} bits entropy</span>
            </>
          ) : (
            <span className="text-slate-500">Generate a password to see strength</span>
          )}
        </div>
        {result && (
          <span className="text-slate-400">
            Crack time: <span className="text-slate-300">{result.crackTime}</span>
          </span>
        )}
      </div>
    </div>
  )
}
