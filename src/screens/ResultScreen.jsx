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

const goalLabels = [
  'retirement',
  'house purchase',
  'emergency fund',
  'education',
  'savings',
]

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
  'dynamic-bond': [
    { name: 'Dynamic Bonds', value: 85 },
    { name: 'Cash', value: 15 },
  ],
  'core-bond': [
    { name: 'Investment Grade', value: 90 },
    { name: 'Cash', value: 10 },
  ],
  'money-market': [
    { name: 'Money Market', value: 95 },
    { name: 'Cash', value: 5 },
  ],
}

export function ResultScreen() {
  const { currentPortfolio, answers, reset } = useApp()

  const label = `${portfolioLabels[currentPortfolio.type]} ${riskLabels[currentPortfolio.riskProfile]}`
  const segments = allocations[currentPortfolio.riskProfile] || allocations.growth
  const goalLabel = answers.goal !== null ? goalLabels[answers.goal] : null

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onClose={reset} />

      <div className="flex-1 px-5 pt-6">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-positive-soft)' }}
          >
            <svg
              className="w-8 h-8"
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
          </div>
        </div>

        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight text-center mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          {label} is a great fit for you
        </h1>
        <p className="text-[15px] leading-relaxed text-center mb-8" style={{ color: 'var(--color-ink-muted)' }}>
          {goalLabel
            ? `Based on your ${goalLabel} goals and risk tolerance, we've matched you to this portfolio.`
            : `This portfolio matches your investment preferences.`}
        </p>

        {/* Portfolio card */}
        <div
          className="p-4 rounded-2xl mb-6"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="mb-4">
            <span
              className="inline-block px-3 py-1.5 rounded-full text-[13px] font-semibold text-white"
              style={{ backgroundColor: 'var(--color-ink)' }}
            >
              {label}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <DonutChart segments={segments} size={88} />
            <div className="flex-1 space-y-2">
              {segments.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartColors[i] }} />
                    <span style={{ color: 'var(--color-ink-muted)' }}>{s.name}</span>
                  </div>
                  <span className="font-semibold tabular-nums" style={{ color: 'var(--color-ink)' }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: 'var(--color-positive-soft)' }}
            >
              <svg
                className="w-3.5 h-3.5"
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
            </div>
            <div>
              <span className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>Withdraw any time</span>
              <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>Access your funds when you need them</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: 'var(--color-positive-soft)' }}
            >
              <svg
                className="w-3.5 h-3.5"
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
            </div>
            <div>
              <span className="font-semibold text-[15px]" style={{ color: 'var(--color-ink)' }}>0.5% fee</span>
              <p className="text-[13px] mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>Simple, transparent pricing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={reset}>
          Confirm and update
        </Button>
        <Button variant="ghost" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
