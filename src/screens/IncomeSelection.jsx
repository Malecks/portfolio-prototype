import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { DonutChart } from '../components/DonutChart'

const incomePortfolios = [
  {
    id: 'dynamic-bond',
    title: 'Dynamic Bond',
    yield: '4.2%',
    riskLevel: '3/10',
    about: 'Actively managed bonds that adapt to market conditions. This portfolio blends government and corporate bonds with tactical shifts to capture opportunities.',
    holdings: [
      { name: 'Bonds', value: 70 },
      { name: 'Cash', value: 20 },
      { name: 'Equities', value: 10 },
    ],
    holdingNote: 'This portfolio dynamically adjusts between bond types to pursue higher yields while managing risk.',
  },
  {
    id: 'core-bond',
    title: 'Core Bond',
    yield: '3.7%',
    riskLevel: '2/10',
    about: 'Put your money to work with steady returns. This portfolio holds short-term government and corporate bonds to deliver predictable returns with minimal volatility.',
    holdings: [
      { name: 'Bonds', value: 100 },
    ],
    holdingNote: 'This portfolio invests in bonds to provide reliable fixed income with very little downside risk.',
  },
  {
    id: 'money-market',
    title: 'Money Market',
    yield: '3.0%',
    riskLevel: '1/10',
    about: 'Ultra-safe short-term securities with high liquidity. Your money is always accessible with virtually no risk to your principal.',
    holdings: [
      { name: 'Cash', value: 80 },
      { name: 'Bonds', value: 20 },
    ],
    holdingNote: 'This portfolio holds cash equivalents and short-term bonds for maximum safety and liquidity.',
  },
]

export function IncomeSelection() {
  const { setIncomeChoice, setScreen, reset, completeFlow } = useApp()
  const [selectedIndex, setSelectedIndex] = useState(1) // default to Core Bond
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const portfolio = incomePortfolios[selectedIndex]

  // Keep incomeChoice in sync with dropdown selection
  useEffect(() => {
    setIncomeChoice(portfolio.id)
  }, [selectedIndex])

  const handleInvest = () => {
    completeFlow()
    setScreen('loading')
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('about-income')} onClose={reset} />

      <div className="flex-1 px-5 pt-2 pb-4 overflow-y-auto">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] leading-tight mb-4"
          style={{ color: 'var(--color-ink)' }}
        >
          Choose an Income portfolio
        </h1>

        {/* Dropdown picker */}
        <div className="relative mb-5">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full rounded-2xl p-4 flex items-center justify-between"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div>
              <div className="text-[12px] mb-0.5" style={{ color: 'var(--color-ink-muted)' }}>
                Portfolio
              </div>
              <div className="text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                {portfolio.title}
              </div>
            </div>
            <svg
              className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--color-ink)' }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-1 rounded-2xl overflow-hidden z-20"
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              {incomePortfolios.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedIndex(i)
                    setDropdownOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 transition-colors hover:bg-[var(--color-surface-sunken)]"
                  style={{
                    color: 'var(--color-ink)',
                    borderBottom: i < incomePortfolios.length - 1 ? '1px solid var(--color-border)' : 'none',
                    backgroundColor: i === selectedIndex ? 'var(--color-surface-sunken)' : 'transparent',
                  }}
                >
                  <span className="text-[15px] font-medium">{p.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio detail card */}
        <div
          className="rounded-2xl p-5"
          style={{
            backgroundColor: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Accent header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-1 h-10 rounded-full" style={{ backgroundColor: '#4CAF50' }} />
            <div>
              <div className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>Income</div>
              <div className="text-[20px] font-bold" style={{ color: 'var(--color-ink)' }}>
                {portfolio.title}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-3 mb-5">
            <div
              className="flex-1 rounded-xl p-3"
              style={{ backgroundColor: 'var(--color-surface-sunken)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px]" style={{ color: 'var(--color-ink-muted)' }}>Yield</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-ink-subtle)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <span className="text-[20px] font-bold" style={{ color: 'var(--color-ink)' }}>
                {portfolio.yield}
              </span>
            </div>
            <div
              className="flex-1 rounded-xl p-3"
              style={{ backgroundColor: 'var(--color-surface-sunken)' }}
            >
              <div className="text-[12px] mb-1" style={{ color: 'var(--color-ink-muted)' }}>Risk level</div>
              <span className="text-[20px] font-bold" style={{ color: 'var(--color-ink)' }}>
                {portfolio.riskLevel}
              </span>
            </div>
          </div>

          {/* About section */}
          <h4 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
            About this portfolio
          </h4>
          <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--color-ink-muted)' }}>
            {portfolio.about}
          </p>

          {/* Donut chart */}
          <div className="flex justify-center mb-4">
            <DonutChart segments={portfolio.holdings} size={140} />
          </div>

          {/* Holdings legend */}
          <div className="space-y-2 mb-4">
            {portfolio.holdings.map((h, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor:
                        h.name === 'Bonds' ? '#4CAF50' :
                        h.name === 'Cash' ? '#9B7ED9' :
                        '#6B8DD6'
                    }}
                  />
                  <span className="text-[13px] font-medium" style={{ color: 'var(--color-ink)' }}>
                    {h.name}
                  </span>
                </div>
                <span className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                  {h.value}%
                </span>
              </div>
            ))}
          </div>

          <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--color-ink-muted)' }}>
            {portfolio.holdingNote}
          </p>

          {/* See details button */}
          <button
            className="w-full py-3 rounded-xl text-[14px] font-semibold transition-colors"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
              backgroundColor: 'transparent',
            }}
          >
            See details
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="p-5 space-y-3">
        <Button onClick={handleInvest}>
          Invest in {portfolio.title}
        </Button>
        <Button variant="secondary" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
