import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
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

const chartColors = [
  'oklch(25% 0.02 70)',
  'oklch(55% 0.03 70)',
  'oklch(80% 0.02 80)',
]

const allocations = {
  conservative: [
    { name: 'Equities', value: 30 },
    { name: 'Bonds', value: 55 },
    { name: 'Cash', value: 15 },
  ],
  balanced: [
    { name: 'Equities', value: 50 },
    { name: 'Bonds', value: 40 },
    { name: 'Cash', value: 10 },
  ],
  growth: [
    { name: 'Equities', value: 70 },
    { name: 'Bonds', value: 25 },
    { name: 'Cash', value: 5 },
  ],
  aggressive: [
    { name: 'Equities', value: 90 },
    { name: 'Bonds', value: 8 },
    { name: 'Cash', value: 2 },
  ],
}

export function AdjustSheet() {
  const { currentPortfolio, setScreen, reset } = useApp()

  const label = `${portfolioLabels[currentPortfolio.type]} ${riskLabels[currentPortfolio.riskProfile]}`
  const segments = allocations[currentPortfolio.riskProfile] || allocations.growth

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          Adjust your portfolio
        </h1>

        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          You have been matched to your current portfolio based on your risk profile. You can switch to a different portfolio or update your profile.
        </p>

        {/* Current portfolio card */}
        <div
          className="p-4 rounded-2xl mb-6"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>{label}</span>
            <span
              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--color-positive-soft)',
                color: 'var(--color-positive)',
              }}
            >
              Current
            </span>
          </div>

          <div className="flex items-center gap-5">
            <DonutChart segments={segments} size={72} />
            <div className="flex-1 space-y-1.5">
              {segments.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[i] }} />
                    <span style={{ color: 'var(--color-ink-muted)' }}>{s.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums" style={{ color: 'var(--color-ink)' }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
          {currentPortfolio.type === 'classic' && 'Classic is a traditional mix of stocks, bonds, and cash designed for long-term growth with your risk tolerance in mind.'}
          {currentPortfolio.type === 'summit' && 'Summit offers enhanced returns through alternative investments, designed for qualified investors.'}
          {currentPortfolio.type === 'income' && 'Income portfolios focus on generating steady returns through fixed income securities.'}
        </p>
      </div>

      {/* Bottom actions */}
      <div className="p-5 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={() => setScreen('portfolio-selection')}>
          Change portfolio type
        </Button>
        <Button variant="secondary" onClick={() => setScreen('goal')}>
          Update your risk profile
        </Button>
      </div>
    </div>
  )
}
