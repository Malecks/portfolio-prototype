import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { DonutChart } from '../components/DonutChart'

const portfolioLabels = {
  classic: 'Classic',
  summit: 'Summit',
  income: 'Income',
}

const portfolioColors = {
  classic: '#9B7ED9',
  summit: '#6B8DD6',
  income: '#4CAF50',
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

const riskStats = {
  conservative: { returnRange: '3%–5%', riskLevel: '3/10' },
  balanced: { returnRange: '5%–7%', riskLevel: '5/10' },
  growth: { returnRange: '6.5%–8%', riskLevel: '8/10' },
  aggressive: { returnRange: '8%–12%', riskLevel: '10/10' },
}

const portfolioDescriptions = {
  conservative: 'This conservative mix prioritizes capital preservation with steady, predictable returns. Ideal for short-term goals or low risk tolerance.',
  balanced: 'A balanced approach that blends growth potential with stability. Suitable for medium-term goals with moderate risk tolerance.',
  growth: 'This growth-oriented mix gives you exposure to global stocks and some long-duration bonds. Meant for long-term returns with some protection from volatility.',
  aggressive: 'Maximum growth potential through heavy equity exposure. Best for long time horizons and high risk tolerance.',
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
  if (lower.includes('bond')) return assetColors.bonds
  if (lower.includes('gold')) return assetColors.gold
  if (lower.includes('cash')) return assetColors.cash
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
    { name: 'Equities', value: 85 },
    { name: 'Bonds', value: 12.5 },
    { name: 'Gold', value: 2.5 },
  ],
}

const portfolioTypeDescriptions = {
  classic: 'Traditional mix of assets hand picked by our experts',
  summit: 'Enhanced portfolio with alternative investments',
  income: 'Fixed income focused for steady returns',
}

const riskProfileDescriptions = {
  conservative: 'Best for short term goals with lower risk tolerance.',
  balanced: 'A balanced mix of growth and stability.',
  growth: 'Best for long term goals with a mix of assets to balance risk.',
  aggressive: 'Maximum growth potential for long time horizons.',
}

const equityPercentages = {
  conservative: 30,
  balanced: 50,
  growth: 80,
  aggressive: 90,
}

function PencilIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'var(--color-ink-muted)' }}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function VariantA({ currentPortfolio, setScreen, reset, setSelectedType }) {
  const portfolioType = portfolioLabels[currentPortfolio.type]
  const riskProfile = riskLabels[currentPortfolio.riskProfile]
  const segments = allocations[currentPortfolio.riskProfile] || allocations.growth
  const stats = riskStats[currentPortfolio.riskProfile] || riskStats.growth
  const description = portfolioDescriptions[currentPortfolio.riskProfile] || portfolioDescriptions.growth
  const accentColor = portfolioColors[currentPortfolio.type]

  return (
    <>
      <Header title="" onClose={reset} />

      <div className="flex-1 px-5 pt-2 pb-6 overflow-y-auto">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Adjust your portfolio
        </h1>
        <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--color-ink-muted)' }}>
          Change your portfolio type or update your risk profile.
        </p>

        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
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
                style={{ color: 'var(--color-ink)' }}
              >
                {riskProfile}
              </span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
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

          <div className="mb-6">
            <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
              About this portfolio
            </h3>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              {description}
            </p>
          </div>

          <div className="flex justify-center mb-5">
            <DonutChart segments={segments} size={160} />
          </div>

          <div className="space-y-3 mb-5">
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

          <button
            className="w-full py-3 rounded-full border text-[15px] font-semibold transition-colors hover:bg-[var(--color-surface-sunken)]"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-ink)',
            }}
          >
            See details
          </button>
        </div>
      </div>

      <div className="sticky bottom-0 p-5 space-y-3" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <button
          onClick={() => setScreen('portfolio-selection')}
          className="w-full py-4 px-6 rounded-2xl font-semibold text-[15px] text-white transition-all duration-200 active:scale-[0.98]"
          style={{ backgroundColor: 'var(--color-ink)' }}
        >
          Change portfolio type
        </button>
        <button
          onClick={() => {
            setSelectedType(null)
            setScreen('goal')
          }}
          className="w-full py-4 px-6 rounded-2xl font-semibold text-[15px] border transition-all duration-200 active:scale-[0.98] hover:border-[var(--color-border-strong)]"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-ink)',
          }}
        >
          Update risk profile
        </button>
      </div>
    </>
  )
}

function VariantB({ currentPortfolio, setScreen, reset, setSelectedType }) {
  const portfolioType = portfolioLabels[currentPortfolio.type]
  const riskProfile = riskLabels[currentPortfolio.riskProfile]
  const stats = riskStats[currentPortfolio.riskProfile] || riskStats.growth
  const equityPct = equityPercentages[currentPortfolio.riskProfile] || 70

  return (
    <>
      <Header title="" onBack={() => setScreen('overview')} />

      <div className="flex-1 px-5 pt-4 pb-6 overflow-y-auto">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          Adjust your portfolio
        </h1>
        <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-ink-muted)' }}>
          If you have a new goal, need your money sooner, or have more flexibility with your investment – it might be time to update your portfolio.
        </p>

        <div className="space-y-4">
          {/* Portfolio type card */}
          <button
            onClick={() => setScreen('portfolio-selection')}
            className="w-full text-left p-5 rounded-2xl transition-colors hover:bg-[var(--color-surface-sunken)]"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h3
                  className="text-[17px] font-semibold mb-1"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {portfolioType}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                  {portfolioTypeDescriptions[currentPortfolio.type]}
                </p>
              </div>
              <PencilIcon />
            </div>
          </button>

          {/* Risk profile card */}
          <button
            onClick={() => {
              setSelectedType(null)
              setScreen('goal')
            }}
            className="w-full text-left p-5 rounded-2xl transition-colors hover:bg-[var(--color-surface-sunken)]"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h3
                  className="text-[17px] font-semibold mb-1"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {riskProfile}
                </h3>
                <p className="text-[14px] leading-relaxed mb-3" style={{ color: 'var(--color-ink-muted)' }}>
                  {riskProfileDescriptions[currentPortfolio.riskProfile] || riskProfileDescriptions.growth}
                </p>
                <div className="flex gap-4 text-[13px] font-medium" style={{ color: 'var(--color-ink)' }}>
                  <span>{equityPct}% equities</span>
                  <span>{stats.riskLevel} risk</span>
                </div>
              </div>
              <PencilIcon />
            </div>
          </button>

          {/* Theme card (placeholder) */}
          <button
            className="w-full text-left p-5 rounded-2xl transition-colors hover:bg-[var(--color-surface-sunken)]"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <h3
                className="text-[17px] font-semibold"
                style={{ color: 'var(--color-ink)' }}
              >
                Theme
              </h3>
              <PencilIcon />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export function AdjustSheet() {
  const { currentPortfolio, setScreen, reset, adjustSheetVariant, setAdjustSheetVariant, setSelectedType } = useApp()

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* A/B Toggle */}
      <div className="absolute top-14 right-4 z-20 flex rounded-full overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <button
          onClick={() => setAdjustSheetVariant('A')}
          className="px-3 py-1 text-[11px] font-semibold transition-colors"
          style={{
            backgroundColor: adjustSheetVariant === 'A' ? 'var(--color-ink)' : 'var(--color-surface)',
            color: adjustSheetVariant === 'A' ? 'white' : 'var(--color-ink-muted)',
          }}
        >
          A
        </button>
        <button
          onClick={() => setAdjustSheetVariant('B')}
          className="px-3 py-1 text-[11px] font-semibold transition-colors"
          style={{
            backgroundColor: adjustSheetVariant === 'B' ? 'var(--color-ink)' : 'var(--color-surface)',
            color: adjustSheetVariant === 'B' ? 'white' : 'var(--color-ink-muted)',
          }}
        >
          B
        </button>
      </div>

      {adjustSheetVariant === 'A' ? (
        <VariantA currentPortfolio={currentPortfolio} setScreen={setScreen} reset={reset} setSelectedType={setSelectedType} />
      ) : (
        <VariantB currentPortfolio={currentPortfolio} setScreen={setScreen} reset={reset} setSelectedType={setSelectedType} />
      )}
    </div>
  )
}
