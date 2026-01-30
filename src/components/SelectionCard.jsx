export function SelectionCard({ title, description, selected, onClick, badge, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full text-left p-4 rounded-2xl border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.99]'}
      `}
      style={{
        backgroundColor: selected ? 'var(--color-surface-sunken)' : 'var(--color-surface-raised)',
        borderColor: selected ? 'var(--color-ink)' : 'var(--color-border)',
        borderWidth: selected ? '1.5px' : '1px',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-semibold text-[15px] tracking-[-0.01em]"
              style={{ color: 'var(--color-ink)' }}
            >
              {title}
            </span>
            {badge && (
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide"
                style={{
                  backgroundColor: 'var(--color-surface-sunken)',
                  color: 'var(--color-ink-muted)',
                }}
              >
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p
              className="text-[13px] mt-1 leading-relaxed"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {description}
            </p>
          )}
        </div>
        <div
          className="w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
          style={{
            borderColor: selected ? 'var(--color-ink)' : 'var(--color-border-strong)',
            backgroundColor: selected ? 'var(--color-ink)' : 'transparent',
          }}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}
