import { useApp } from '../context/AppContext'
import { DonutChart } from '../components/DonutChart'
import { Button } from '../components/Button'

const portfolioLabels = {
  classic: 'Classic',
  summit: 'Summit',
  income: 'Income',
}

const riskLabels = {
  conservative: 'Conservative',
  balanced: 'Balanced',
  growth: 'Growth',
  aggressive: 'Aggressive',
  'dynamic-bond': 'Dynamic Bond',
  'core-bond': 'Core Bond',
  'money-market': 'Money Market',
}

const holdings = [
  { name: 'Equities', value: 60, amount: 182865.70 },
  { name: 'Bonds', value: 30, amount: 91432.85 },
  { name: 'Cash', value: 10, amount: 30477.62 },
]

const chartColors = [
  'oklch(25% 0.02 70)',
  'oklch(55% 0.03 70)',
  'oklch(80% 0.02 80)',
]

export function PortfolioOverview() {
  const { currentPortfolio, setScreen } = useApp()

  const label = `${portfolioLabels[currentPortfolio.type]} ${riskLabels[currentPortfolio.riskProfile]}`

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="p-1 -ml-1 rounded-lg transition-colors hover:bg-[var(--color-surface-sunken)]"
            style={{ color: 'var(--color-ink)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>TFSA</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-ink-subtle)' }}>
            <path d="M12 15l-5-5h10l-5 5z" />
          </svg>
        </div>
        <button
          className="p-2 -mr-2 rounded-lg transition-colors hover:bg-[var(--color-surface-sunken)]"
          style={{ color: 'var(--color-ink)' }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Balance */}
      <div className="px-5 pt-2 pb-5">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-[40px] font-bold tracking-[-0.02em] leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            ${currentPortfolio.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[14px] font-medium" style={{ color: 'var(--color-ink-subtle)' }}>CAD</span>
        </div>
        <div
          className="text-[14px] font-medium mt-2"
          style={{ color: 'var(--color-positive)' }}
        >
          +$6,241.52 (+2.09%) all time
        </div>
      </div>

      {/* Portfolio badge */}
      <div className="px-5 pb-6">
        <span
          className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-semibold tracking-[-0.01em]"
          style={{
            backgroundColor: 'var(--color-surface-sunken)',
            color: 'var(--color-ink)',
          }}
        >
          {label}
        </span>
      </div>

      {/* Chart and holdings */}
      <div className="px-5 pb-8">
        <div className="flex items-center gap-6">
          <DonutChart segments={holdings} size={96} />
          <div className="flex-1 space-y-2.5">
            {holdings.map((h, i) => (
              <div key={h.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: chartColors[i] }}
                  />
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{h.name}</span>
                </div>
                <span className="text-[13px] font-semibold tabular-nums" style={{ color: 'var(--color-ink)' }}>{h.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 pb-8 flex gap-3">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border transition-all duration-200 hover:border-[var(--color-border-strong)] active:scale-[0.98]"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface-raised)',
          }}
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--color-ink)' }}>
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Deposit</span>
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border transition-all duration-200 hover:border-[var(--color-border-strong)] active:scale-[0.98]"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-surface-raised)',
          }}
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--color-ink)' }}>
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Transfer</span>
        </button>
      </div>

      {/* Holdings section */}
      <div className="px-5 pb-6">
        <button className="flex items-center justify-between w-full mb-4 group">
          <span className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>Holdings</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ color: 'var(--color-ink-subtle)' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div className="space-y-3">
          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: 'var(--color-surface-sunken)' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>Equities (BND)</div>
                <div className="text-[12px] mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>Diversified equity portfolio</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[15px] tabular-nums" style={{ color: 'var(--color-ink)' }}>$182,865.70</div>
                <div className="text-[12px] mt-0.5 font-medium" style={{ color: 'var(--color-positive)' }}>+2.4%</div>
              </div>
            </div>
          </div>
          <div
            className="p-4 rounded-2xl"
            style={{ backgroundColor: 'var(--color-surface-sunken)' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>Bonds</div>
                <div className="text-[12px] mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>Corporate bonds</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[15px] tabular-nums" style={{ color: 'var(--color-ink)' }}>$91,432.85</div>
                <div className="text-[12px] mt-0.5 font-medium" style={{ color: 'var(--color-positive)' }}>+0.8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom action */}
      <div className="p-5" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={() => setScreen('adjust-sheet')}>
          Adjust portfolio
        </Button>
      </div>
    </div>
  )
}
