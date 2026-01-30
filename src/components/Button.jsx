export function Button({ children, onClick, variant = 'primary', disabled = false, className = '' }) {
  const baseStyles = `
    w-full py-4 px-6 rounded-2xl font-semibold text-[15px] tracking-[-0.01em]
    transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
    active:scale-[0.98]
  `

  const variants = {
    primary: `
      text-white
      hover:opacity-90
      active:opacity-100
    `,
    secondary: `
      border hover:border-[var(--color-border-strong)]
      active:bg-[var(--color-surface-sunken)]
    `,
    ghost: `
      hover:bg-[var(--color-surface-sunken)]
      active:bg-[var(--color-border)]
    `,
  }

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-ink)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface-raised)',
      color: 'var(--color-ink)',
      borderColor: 'var(--color-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-ink)',
    },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed active:scale-100' : ''} ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </button>
  )
}
