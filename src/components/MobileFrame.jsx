import { useApp } from '../context/AppContext'

export function MobileFrame({ children }) {
  const { handleDebugTap, summitEligible } = useApp()

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'oklch(92% 0.01 70)' }}>
      <div
        className="w-full max-w-[390px] h-[844px] rounded-[3rem] shadow-2xl overflow-hidden relative"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '8px solid oklch(18% 0.01 70)'
        }}
      >
        {/* Status bar */}
        <div
          className="h-12 flex items-center justify-between px-8 pt-2"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>9:41</span>
          <div className="flex items-center gap-1.5" style={{ color: 'var(--color-ink)' }}>
            <svg className="w-[18px] h-[12px]" viewBox="0 0 18 12" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="0.5" />
              <rect x="4" y="5" width="3" height="7" rx="0.5" />
              <rect x="8" y="2" width="3" height="10" rx="0.5" />
              <rect x="12" y="0" width="3" height="12" rx="0.5" />
            </svg>
            <svg className="w-[16px] h-[12px]" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 2.4c2.5 0 4.8 1 6.5 2.6l1.2-1.2C13.8 1.9 11 .8 8 .8S2.2 1.9.3 3.8L1.5 5C3.2 3.4 5.5 2.4 8 2.4zm0 3c1.7 0 3.2.7 4.3 1.8l1.2-1.2c-1.4-1.4-3.4-2.2-5.5-2.2S4 4.6 2.5 6l1.2 1.2C4.8 6.1 6.3 5.4 8 5.4zm0 3c.9 0 1.8.4 2.4 1l1.2-1.2c-.9-.9-2.2-1.4-3.6-1.4s-2.7.5-3.6 1.4L5.6 9.4c.6-.6 1.5-1 2.4-1zM8 12l1.5-1.5c-.8-.8-2.2-.8-3 0L8 12z" />
            </svg>
            <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12" fill="none">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.35" />
              <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor" />
              <path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </div>
        </div>
        {/* Content area */}
        <div className="h-[calc(100%-3rem)] overflow-y-auto relative">
          {children}
        </div>
        {/* Version indicator for debug */}
        <button
          onClick={handleDebugTap}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] opacity-30 hover:opacity-60 transition-opacity"
          style={{ color: 'var(--color-ink-subtle)' }}
        >
          v1.0.0 {summitEligible ? '●' : '○'}
        </button>
      </div>
    </div>
  )
}
