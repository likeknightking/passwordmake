import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Password Generator — Create Strong Passwords'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 8, display: 'flex' }}>🔐</div>
        <div style={{ fontSize: 52, fontWeight: 800, color: '#ffffff', marginBottom: 12, display: 'flex' }}>
          Password Generator
        </div>
        <div style={{ fontSize: 24, color: '#a5b4fc', maxWidth: 700, textAlign: 'center', display: 'flex' }}>
          Generate strong, secure passwords and passphrases instantly. 100% client-side — nothing leaves your browser.
        </div>
        <div
          style={{
            marginTop: 32,
            padding: '12px 32px',
            background: '#4f46e5',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
          }}
        >
          passwordmake.com
        </div>
      </div>
    ),
    { ...size }
  )
}
