import { useEffect } from 'react'

export function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [visible, onHide])

  return (
    <div
      className="fixed left-5 right-5 bottom-24 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lg"
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'white',
        }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-positive)' }}
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'white' }}
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <span className="text-[14px] font-medium">{message}</span>
      </div>
    </div>
  )
}
