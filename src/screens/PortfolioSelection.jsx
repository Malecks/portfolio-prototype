import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'

const riskProfileData = {
  conservative: {
    title: 'Conservative',
    description: 'Best for shorter timelines with a focus on preserving your capital.',
    returnRange: '3%–5% return',
    riskScore: '3/10 Risk',
  },
  balanced: {
    title: 'Balanced',
    description: 'Best for medium term goals with a mix of growth and stability.',
    returnRange: '5%–6.5% return',
    riskScore: '5/10 Risk',
  },
  growth: {
    title: 'Growth',
    description: 'Best for long term goals with a mix of assets to balance risk.',
    returnRange: '6.5%–8% return',
    riskScore: '8/10 Risk',
  },
  aggressive: {
    title: 'Aggressive',
    description: 'Best for very long timelines with maximum growth potential.',
    returnRange: '8%–10% return',
    riskScore: '9/10 Risk',
  },
  'dynamic-bond': {
    title: 'Dynamic Bond',
    description: 'Actively managed bonds that adapt to market conditions for higher returns.',
    returnRange: '4%–6% return',
    riskScore: '3/10 Risk',
  },
  'core-bond': {
    title: 'Core Bond',
    description: 'Diversified investment-grade bonds for stable, predictable income.',
    returnRange: '3%–5% return',
    riskScore: '2/10 Risk',
  },
  'money-market': {
    title: 'Money Market',
    description: 'Ultra-safe short-term securities with high liquidity and minimal risk.',
    returnRange: '2%–4% return',
    riskScore: '1/10 Risk',
  },
}

const portfolios = {
  classic: {
    id: 'classic',
    title: 'Classic',
    emoji: '🥧',
    description: 'Traditional mix of equities, bonds, and cash with risk-based allocation.',
  },
  summit: {
    id: 'summit',
    title: 'Summit',
    emoji: '🏔️',
    description: 'Super charge your portfolio with access to private markets',
  },
  income: {
    id: 'income',
    title: 'Income',
    emoji: '🌺',
    description: 'Steady income with a mix of dividend stocks and bonds',
  },
}

export function PortfolioSelection() {
  const {
    setSelectedType,
    setScreen,
    reset,
    summitEligible,
    currentPortfolio,
  } = useApp()

  const riskProfile = riskProfileData[currentPortfolio.riskProfile]
  const otherPortfolios = Object.values(portfolios).filter(p => p.id !== currentPortfolio.type)

  const handleSelectPortfolio = (portfolioId) => {
    setSelectedType(portfolioId)

    if (portfolioId === 'income') {
      setScreen('about-income')
    } else if (portfolioId === 'summit' && !summitEligible) {
      setScreen('summit-ineligible')
    } else {
      setScreen('portfolio-comparison')
    }
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('overview')} onClose={reset} />

      <div className="flex-1 px-5 pt-4 pb-8">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Edit your portfolio
        </h1>
        <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-ink-muted)' }}>
          If you have a new goal, need your money sooner, or have more flexibility with your investment – it might be time to update your portfolio.
        </p>

        {/* Update your risk profile */}
        <h2
          className="text-[17px] font-semibold mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          Update your risk profile
        </h2>

        <button
          onClick={() => {
            setSelectedType(currentPortfolio.type)
            setScreen('update-risk-profile')
          }}
          className="w-full text-left rounded-2xl p-4 mb-8 transition-colors active:scale-[0.99]"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <span
              className="px-3 py-1 rounded-full text-[13px] font-semibold"
              style={{
                backgroundColor: 'var(--color-primary-muted, #E8E0F0)',
                color: 'var(--color-primary, #6B5B95)',
              }}
            >
              {riskProfile.title}
            </span>
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <p className="text-[14px] leading-relaxed mb-3" style={{ color: 'var(--color-ink-muted)' }}>
            {riskProfile.description}
          </p>
          <div className="flex gap-2">
            <span
              className="px-3 py-1 rounded-full text-[13px] font-medium"
              style={{
                backgroundColor: 'var(--color-surface-sunken)',
                color: 'var(--color-ink-muted)',
              }}
            >
              {riskProfile.returnRange}
            </span>
            <span
              className="px-3 py-1 rounded-full text-[13px] font-medium"
              style={{
                backgroundColor: 'var(--color-surface-sunken)',
                color: 'var(--color-ink-muted)',
              }}
            >
              {riskProfile.riskScore}
            </span>
          </div>
        </button>

        {/* Change your portfolio */}
        <h2
          className="text-[17px] font-semibold mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          Change your portfolio
        </h2>

        <div className="space-y-3">
          {otherPortfolios.map((portfolio) => (
            <button
              key={portfolio.id}
              onClick={() => handleSelectPortfolio(portfolio.id)}
              className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-colors active:scale-[0.99]"
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--color-surface-sunken)' }}
              >
                <span className="text-[32px]">{portfolio.emoji}</span>
              </div>
              <div className="flex-1">
                <h3
                  className="text-[17px] font-semibold mb-0.5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {portfolio.title}
                </h3>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                  {portfolio.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
