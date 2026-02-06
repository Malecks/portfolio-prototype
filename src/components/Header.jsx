export function Header({ title, onBack, onClose, transparent = false }) {
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between px-4 pt-14 pb-3"
      style={transparent ? {} : {
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="w-10">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full transition-colors duration-200 hover:bg-[var(--color-surface-sunken)] active:bg-[var(--color-border)]"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-ink)' }}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>
      <span
        className="font-semibold text-[15px] tracking-[-0.01em]"
        style={{ color: 'var(--color-ink)' }}
      >
        {title}
      </span>
      <div className="w-10 flex justify-end">
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full transition-colors duration-200 hover:bg-[var(--color-surface-sunken)] active:bg-[var(--color-border)]"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-ink)' }}
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
