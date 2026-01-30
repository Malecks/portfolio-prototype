import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { SelectionCard } from '../components/SelectionCard'

const portfolios = [
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

export function PortfolioSelection() {
  const { selectedType, setSelectedType, setScreen, reset, summitEligible, currentPortfolio } = useApp()

  const selected = selectedType || currentPortfolio.type

  const handleContinue = () => {
    if (selected === 'summit' && !summitEligible) {
      setScreen('summit-ineligible')
    } else if (selected === 'income') {
      setScreen('income-selection')
    } else {
      setScreen('goal')
    }
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('adjust-sheet')} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          Choose a portfolio
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Select the portfolio type that best fits your needs.
        </p>

        <div className="space-y-3">
          {portfolios.map((p) => (
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

      <div className="p-5" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={handleContinue} disabled={!selected}>
          Continue
        </Button>
      </div>
    </div>
  )
}
