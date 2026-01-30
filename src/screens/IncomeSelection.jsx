import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { SelectionCard } from '../components/SelectionCard'

const incomeOptions = [
  {
    id: 'dynamic-bond',
    title: 'Dynamic Bond',
    description: 'Actively managed bonds that adapt to market conditions for potentially higher returns.',
  },
  {
    id: 'core-bond',
    title: 'Core Bond',
    description: 'Diversified investment-grade bonds for stable, predictable income.',
  },
  {
    id: 'money-market',
    title: 'Money Market',
    description: 'Ultra-safe short-term securities with high liquidity and minimal risk.',
  },
]

export function IncomeSelection() {
  const { incomeChoice, setIncomeChoice, setScreen, reset, completeFlow } = useApp()

  const handleContinue = () => {
    completeFlow()
    setScreen('loading')
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('portfolio-selection')} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          Select the income portfolio for you
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Choose the fixed income strategy that matches your goals.
        </p>

        <div className="space-y-3">
          {incomeOptions.map((opt) => (
            <SelectionCard
              key={opt.id}
              title={opt.title}
              description={opt.description}
              selected={incomeChoice === opt.id}
              onClick={() => setIncomeChoice(opt.id)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 p-5" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={handleContinue} disabled={!incomeChoice}>
          Continue
        </Button>
      </div>
    </div>
  )
}
