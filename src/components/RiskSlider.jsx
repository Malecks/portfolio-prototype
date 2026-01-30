const labels = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High']

export function RiskSlider({ value, onChange }) {
  return (
    <div className="space-y-6">
      <div className="relative pt-3 pb-1">
        {/* Track background */}
        <div
          className="h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--color-border)' }}
        />
        {/* Active track */}
        <div
          className="absolute top-3 left-0 h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: `${(value / 4) * 100}%`,
            backgroundColor: 'var(--color-ink)',
          }}
        />
        {/* Step buttons */}
        <div className="flex justify-between absolute -top-0.5 left-0 right-0">
          {[0, 1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => onChange(step)}
              className="w-7 h-7 rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-95"
              style={{
                backgroundColor: step <= value ? 'var(--color-ink)' : 'var(--color-border-strong)',
                boxShadow: step === value ? '0 0 0 4px var(--color-border)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
      {/* End labels */}
      <div className="flex justify-between text-[12px] font-medium" style={{ color: 'var(--color-ink-subtle)' }}>
        <span>Conservative</span>
        <span>Aggressive</span>
      </div>
      {/* Current selection badge */}
      <div className="text-center">
        <span
          className="inline-block px-4 py-2.5 rounded-full font-semibold text-[14px]"
          style={{
            backgroundColor: 'var(--color-surface-sunken)',
            color: 'var(--color-ink)',
          }}
        >
          {labels[value]}
        </span>
      </div>
    </div>
  )
}
