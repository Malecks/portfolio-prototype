import { useApp } from '../context/AppContext'
import { DonutChart } from '../components/DonutChart'

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

// Asset class colors from design system
const assetColors = {
  equities: '#6B8DD6',
  bonds: '#4CAF50',
  cash: '#9B7ED9',
}

function DetailRow({ label, value, secondaryValue, onPress, copyable, badge, info }) {
  return (
    <div className="flex items-start justify-between py-3.5">
      <span className="text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <span className="text-[14px] font-medium block" style={{ color: 'var(--color-ink)' }}>{value}</span>
          {secondaryValue && (
            <span className="text-[12px] mt-0.5 block" style={{ color: 'var(--color-ink-subtle)' }}>{secondaryValue}</span>
          )}
        </div>
        {badge && (
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide"
            style={{
              backgroundColor: 'var(--color-surface-sunken)',
              color: 'var(--color-ink-muted)',
            }}
          >
            {badge}
          </span>
        )}
        {copyable && (
          <button
            className="p-1.5 -m-1 rounded-full hover:bg-[var(--color-surface-sunken)] transition-colors"
            onClick={() => navigator.clipboard?.writeText(value)}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        )}
        {info && (
          <button className="p-1.5 -m-1 rounded-full hover:bg-[var(--color-surface-sunken)] transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
        )}
        {onPress && (
          <button
            onClick={onPress}
            className="p-1.5 -m-1 rounded-full hover:bg-[var(--color-surface-sunken)] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export function PortfolioOverview() {
  const { currentPortfolio, setScreen } = useApp()

  const portfolioLabel = `${portfolioLabels[currentPortfolio.type]} ${riskLabels[currentPortfolio.riskProfile]}`

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

      {/* Quick actions */}
      <div className="px-5 pb-6 flex gap-3">
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

        {/* Chart and breakdown */}
        <div className="flex items-center gap-6 mb-4">
          <DonutChart segments={holdings} size={80} />
          <div className="flex-1 space-y-2">
            {holdings.map((h, i) => (
              <div key={h.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: h.name === 'Equities' ? assetColors.equities : h.name === 'Bonds' ? assetColors.bonds : assetColors.cash }}
                  />
                  <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>{h.name}</span>
                </div>
                <span className="text-[13px] font-semibold tabular-nums" style={{ color: 'var(--color-ink)' }}>{h.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Holdings list */}
        <div className="space-y-2">
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

      {/* Account details section */}
      <div className="px-5 pb-6">
        <h3 className="font-semibold text-[15px] mb-1" style={{ color: 'var(--color-ink)' }}>Account details</h3>

        <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
          <DetailRow label="Account type" value="TFSA" />
          <DetailRow label="Account number" value="WW89AA123CAD" copyable />
          <DetailRow label="Goal" value="General savings" />
          <DetailRow
            label="Portfolio"
            value={portfolioLabels[currentPortfolio.type]}
            secondaryValue={riskLabels[currentPortfolio.riskProfile]}
            onPress={() => setScreen('adjust-sheet')}
          />
          <DetailRow label="Fees" value="0.4%" badge="Premium" info />
        </div>
      </div>

      {/* Bottom nav - sticky */}
      <div
        className="sticky bottom-0 flex items-center justify-around py-3 px-5"
        style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}
      >
          <button className="flex flex-col items-center gap-1 p-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink)' }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            <span className="text-[10px] font-medium" style={{ color: 'var(--color-ink)' }}>Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[10px] font-medium" style={{ color: 'var(--color-ink-subtle)' }}>Search</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="text-[10px] font-medium" style={{ color: 'var(--color-ink-subtle)' }}>Activity</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] font-medium" style={{ color: 'var(--color-ink-subtle)' }}>Profile</span>
          </button>
      </div>
    </div>
  )
}
