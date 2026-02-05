import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { SelectionCard } from '../components/SelectionCard'

// Variant A data
const portfolioListA = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Traditional mix of equities, bonds, and cash with risk-based allocation.',
  },
  {
    id: 'summit',
    title: 'Summit',
    description: 'Enhanced portfolio with alternative investments for qualified investors.',
    badge: 'Premium',
  },
  {
    id: 'income',
    title: 'Income',
    description: 'Fixed income focused portfolios for steady, predictable returns.',
  },
]

// Variant B data
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
    description: 'Enhanced portfolio with alternative investments for qualified investors.',
  },
  income: {
    id: 'income',
    title: 'Income',
    emoji: '🐷',
    description: 'Fixed income focused portfolios for steady, predictable returns.',
  },
}

function PortfolioCard({ portfolio, isCurrent, onSelect, onLearnMore }) {
  return (
    <div
      className="rounded-2xl p-4 transition-colors"
      style={{
        backgroundColor: 'var(--color-surface-raised)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={onSelect}
          className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--color-surface-sunken)' }}
        >
          <span className="text-[32px]">{portfolio.emoji}</span>
        </button>
        <div className="flex-1 pt-1">
          <button
            onClick={onSelect}
            className="w-full text-left"
          >
            <div className="flex items-center gap-2 mb-1">
              <h3
                className="text-[17px] font-semibold"
                style={{ color: 'var(--color-ink)' }}
              >
                {portfolio.title}
              </h3>
              {isCurrent && (
                <span
                  className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{
                    backgroundColor: 'var(--color-surface-sunken)',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  Your portfolio
                </span>
              )}
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
              {portfolio.description}
            </p>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLearnMore()
            }}
            className="mt-2 flex items-center gap-1 text-[14px] font-semibold transition-colors hover:opacity-70"
            style={{ color: 'var(--color-ink)' }}
          >
            Learn more
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function LearnMoreModal({ portfolio, onClose }) {
  if (!portfolio) return null

  return (
    <div
      className="absolute inset-0 z-50 flex items-end"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-3xl p-6 pb-8"
        style={{ backgroundColor: 'var(--color-surface)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: 'var(--color-border-strong)' }} />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-surface-sunken)' }}
          >
            <span className="text-[28px]">{portfolio.emoji}</span>
          </div>
          <h2
            className="text-[22px] font-bold tracking-[-0.02em]"
            style={{ color: 'var(--color-ink)' }}
          >
            {portfolio.title}
          </h2>
        </div>

        <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--color-ink-muted)' }}>
          {portfolio.description}
        </p>

        <div
          className="p-4 rounded-xl mb-5"
          style={{ backgroundColor: 'var(--color-surface-sunken)' }}
        >
          <p className="text-[13px] text-center" style={{ color: 'var(--color-ink-muted)' }}>
            More portfolio details coming soon
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-semibold text-[15px] transition-all duration-200 active:scale-[0.98]"
          style={{
            backgroundColor: 'var(--color-ink)',
            color: 'white',
          }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

function VariantA({ currentPortfolio, setScreen, reset, summitEligible, selectedType, setSelectedType }) {
  const selected = selectedType || currentPortfolio.type

  const handleContinue = () => {
    if (selected === 'income') {
      setScreen('income-selection')
    } else if (selected === currentPortfolio.type) {
      // Same portfolio type - go to risk profile update
      setScreen('update-risk-profile')
    } else if (selected === 'summit' && !summitEligible) {
      setScreen('summit-ineligible')
    } else {
      // Different portfolio type - go to comparison
      setScreen('portfolio-comparison')
    }
  }

  return (
    <>
      <Header title="" onBack={() => setScreen('overview')} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Choose a portfolio
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Select the portfolio type that best fits your needs.
        </p>

        <div className="space-y-3">
          {portfolioListA.map((p) => (
            <SelectionCard
              key={p.id}
              title={p.title}
              description={p.description}
              badge={p.badge}
              selected={selected === p.id}
              onClick={() => setSelectedType(p.id)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 p-5" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={handleContinue} disabled={!selected}>
          Continue
        </Button>
      </div>
    </>
  )
}

function VariantB({ currentPortfolio, setScreen, reset, summitEligible, setSelectedType }) {
  const [learnMorePortfolio, setLearnMorePortfolio] = useState(null)

  const handleSelect = (portfolioId) => {
    setSelectedType(portfolioId)

    if (portfolioId === 'income') {
      setScreen('income-selection')
    } else if (portfolioId === currentPortfolio.type) {
      // Same portfolio type - go to risk profile update
      setScreen('update-risk-profile')
    } else if (portfolioId === 'summit' && !summitEligible) {
      setScreen('summit-ineligible')
    } else {
      // Different portfolio type - go to comparison
      setScreen('portfolio-comparison')
    }
  }

  const otherPortfolios = Object.values(portfolios).filter(p => p.id !== currentPortfolio.type)
  const currentPortfolioData = portfolios[currentPortfolio.type]

  return (
    <>
      <Header title="" onBack={() => setScreen('overview')} onClose={reset} />

      <div className="flex-1 px-5 pt-4 pb-6">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Choose a portfolio
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Select the portfolio type that best fits your needs.
        </p>

        <div className="space-y-3 mb-6">
          {otherPortfolios.map((p) => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              isCurrent={false}
              onSelect={() => handleSelect(p.id)}
              onLearnMore={() => setLearnMorePortfolio(p)}
            />
          ))}
        </div>

        <div className="h-px mb-6" style={{ backgroundColor: 'var(--color-border)' }} />

        <PortfolioCard
          portfolio={currentPortfolioData}
          isCurrent={true}
          onSelect={() => handleSelect(currentPortfolioData.id)}
          onLearnMore={() => setLearnMorePortfolio(currentPortfolioData)}
        />
      </div>

      <LearnMoreModal
        portfolio={learnMorePortfolio}
        onClose={() => setLearnMorePortfolio(null)}
      />
    </>
  )
}

export function PortfolioSelection() {
  const {
    selectedType,
    setSelectedType,
    setScreen,
    reset,
    summitEligible,
    currentPortfolio,
    portfolioSelectionVariant,
    setPortfolioSelectionVariant,
  } = useApp()

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* A/B Toggle */}
      <div className="absolute top-14 right-4 z-20 flex rounded-full overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        <button
          onClick={() => setPortfolioSelectionVariant('A')}
          className="px-3 py-1 text-[11px] font-semibold transition-colors"
          style={{
            backgroundColor: portfolioSelectionVariant === 'A' ? 'var(--color-ink)' : 'var(--color-surface)',
            color: portfolioSelectionVariant === 'A' ? 'white' : 'var(--color-ink-muted)',
          }}
        >
          A
        </button>
        <button
          onClick={() => setPortfolioSelectionVariant('B')}
          className="px-3 py-1 text-[11px] font-semibold transition-colors"
          style={{
            backgroundColor: portfolioSelectionVariant === 'B' ? 'var(--color-ink)' : 'var(--color-surface)',
            color: portfolioSelectionVariant === 'B' ? 'white' : 'var(--color-ink-muted)',
          }}
        >
          B
        </button>
      </div>

      {portfolioSelectionVariant === 'A' ? (
        <VariantA
          currentPortfolio={currentPortfolio}
          setScreen={setScreen}
          reset={reset}
          summitEligible={summitEligible}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      ) : (
        <VariantB
          currentPortfolio={currentPortfolio}
          setScreen={setScreen}
          reset={reset}
          summitEligible={summitEligible}
          setSelectedType={setSelectedType}
        />
      )}
    </div>
  )
}
