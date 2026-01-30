import { useEffect, useState } from 'react'

export function Toast({ message, visible, onHide, delay = 0 }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      const showTimer = setTimeout(() => {
        setShow(true)
      }, delay)

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

  // Phone frame is 844px tall, centered. Position toast 120px above bottom of frame.
  // From center: 422px (half height) - 120px = 302px below center
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: show
          ? 'translate(-50%, 272px) scale(1)'
          : 'translate(-50%, 284px) scale(0.95)',
        opacity: show ? 1 : 0,
        transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: show ? 'auto' : 'none',
        zIndex: 9999,
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
