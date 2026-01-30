import { useEffect, useState } from 'react'

export function Toast({ message, visible, onHide, delay = 0 }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      // Delay showing the toast
      const showTimer = setTimeout(() => {
        setShow(true)
      }, delay)

      // Auto-hide after delay + 4 seconds
      const hideTimer = setTimeout(() => {
        onHide()
      }, delay + 4000)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    } else {
      setShow(false)
    }
  }, [visible, onHide, delay])

  return (
    <div
      className="absolute left-0 right-0 bottom-28 z-50 flex justify-center"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
        transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full shadow-lg"
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'white',
        }}
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-positive)' }}
        >
          <path d="M5 12l5 5L20 7" />
        </svg>
        <span className="text-[13px] font-medium">{message}</span>
      </div>
    </div>
  )
}
