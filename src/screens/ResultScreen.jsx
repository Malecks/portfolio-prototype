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

const portfolioColors = {
  classic: '#9B7ED9',
  summit: '#6B8DD6',
  income: '#4CAF50',
}

const riskStats = {
  conservative: { returnRange: '3%–5%', riskLevel: '3/10' },
  balanced: { returnRange: '5%–7%', riskLevel: '5/10' },
  growth: { returnRange: '6.5%–8%', riskLevel: '8/10' },
  aggressive: { returnRange: '8%–12%', riskLevel: '10/10' },
  'dynamic-bond': { returnRange: '4%–6%', riskLevel: '4/10' },
  'core-bond': { returnRange: '3%–5%', riskLevel: '2/10' },
  'money-market': { returnRange: '2%–4%', riskLevel: '1/10' },
}

const portfolioDescriptions = {
  conservative: 'This conservative mix prioritizes capital preservation with steady, predictable returns. Ideal for short-term goals or low risk tolerance.',
  balanced: 'A balanced approach that blends growth potential with stability. Suitable for medium-term goals with moderate risk tolerance.',
  growth: 'This growth-oriented mix gives you exposure to global stocks and some long-duration bonds. Meant for long-term returns with some protection from volatility.',
  aggressive: 'Maximum growth potential through heavy equity exposure. Best for long time horizons and high risk tolerance.',
  'dynamic-bond': 'Actively managed bonds that adapt to market conditions. Offers higher income potential with moderate interest rate sensitivity.',
  'core-bond': 'Diversified investment-grade bonds for stable, predictable income. Lower volatility with consistent returns.',
  'money-market': 'Ultra-safe short-term securities with high liquidity. Minimal risk with easy access to your funds.',
}

// Asset class colors from design system
const assetColors = {
  equities: '#6B8DD6',
  bonds: '#4CAF50',
  cash: '#9B7ED9',
  gold: '#C9A227',
}

const getAssetColor = (name) => {
  const lower = name.toLowerCase()
  if (lower.includes('equit')) return assetColors.equities
  if (lower.includes('bond') || lower.includes('fixed') || lower.includes('income') || lower.includes('investment grade') || lower.includes('dynamic')) return assetColors.bonds
  if (lower.includes('cash') || lower.includes('money market')) return assetColors.cash
  if (lower.includes('gold')) return assetColors.gold
  return '#E0E0E0'
}

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
  const { currentPortfolio, answers, reset, setScreen } = useApp()

  const portfolioType = portfolioLabels[currentPortfolio.type]
  const riskProfile = riskLabels[currentPortfolio.riskProfile]
  const segments = allocations[currentPortfolio.riskProfile] || allocations.growth
  const stats = riskStats[currentPortfolio.riskProfile] || riskStats.growth
  const description = portfolioDescriptions[currentPortfolio.riskProfile] || portfolioDescriptions.growth
  const accentColor = portfolioColors[currentPortfolio.type]
  const goalLabel = answers.goal !== null ? goalLabels[answers.goal] : null

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onClose={reset} />

      <div className="flex-1 px-5 pt-4 pb-6 overflow-y-auto">
        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-positive-soft)' }}
          >
            <svg
              className="w-7 h-7"
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
          className="text-[24px] font-bold tracking-[-0.02em] leading-tight text-center mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          Great fit for you
        </h1>
        <p className="text-[14px] leading-relaxed text-center mb-5" style={{ color: 'var(--color-ink-muted)' }}>
          {goalLabel
            ? `Based on your ${goalLabel} goals and risk tolerance.`
            : `This portfolio matches your investment preferences.`}
        </p>

        {/* Portfolio card - matches AdjustSheet style */}
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Header with type and risk profile */}
          <div className="flex items-start gap-3 mb-5">
            <div
              className="w-1 rounded-full self-stretch"
              style={{ backgroundColor: accentColor }}
            />
            <div className="flex-1">
              <span className="text-[14px] block" style={{ color: 'var(--color-ink-muted)' }}>
                {portfolioType}
              </span>
              <span
                className="text-[28px] font-bold tracking-[-0.02em] block mt-0.5"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {riskProfile}
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-3 mb-5">
            <div
              className="flex-1 p-3 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface-sunken)' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[12px]" style={{ color: 'var(--color-ink-muted)' }}>
                  Expected return
                </span>
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: 'var(--color-ink-subtle)' }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <span
                className="text-[20px] font-bold tracking-[-0.01em]"
                style={{ color: 'var(--color-ink)' }}
              >
                {stats.returnRange}
              </span>
            </div>
            <div
              className="flex-1 p-3 rounded-xl"
              style={{ backgroundColor: 'var(--color-surface-sunken)' }}
            >
              <span className="text-[12px] block mb-1" style={{ color: 'var(--color-ink-muted)' }}>
                Risk level
              </span>
              <span
                className="text-[20px] font-bold tracking-[-0.01em]"
                style={{ color: 'var(--color-ink)' }}
              >
                {stats.riskLevel}
              </span>
            </div>
          </div>

          {/* About section */}
          <div className="mb-5">
            <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
              About this portfolio
            </h3>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              {description}
            </p>
          </div>

          {/* Donut chart */}
          <div className="flex justify-center mb-5">
            <DonutChart segments={segments} size={140} />
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {segments.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: getAssetColor(s.name) }}
                  />
                  <span className="text-[15px]" style={{ color: 'var(--color-ink)' }}>
                    {s.name}
                  </span>
                </div>
                <span
                  className="text-[15px] font-semibold tabular-nums"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {s.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 p-5 space-y-3" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={() => setScreen('confirm-update')}>
          Confirm and update
        </Button>
        <Button variant="ghost" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
