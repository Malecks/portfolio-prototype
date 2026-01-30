import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { RiskSlider } from '../components/RiskSlider'

export function RiskScreen() {
  const { answers, setAnswers, setScreen, reset, completeFlow } = useApp()

  const riskValue = answers.riskTolerance ?? 2

  const handleChange = (value) => {
    setAnswers({ ...answers, riskTolerance: value })
  }

  const handleContinue = () => {
    completeFlow()
    setScreen('result')
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('timeline')} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-6">
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />
        </div>

        <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-subtle)' }}>Risk</span>
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2 mt-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          Risk and loss tolerance
        </h1>
        <p className="text-[15px] leading-relaxed mb-10" style={{ color: 'var(--color-ink-muted)' }}>
          How comfortable are you with short-term losses in exchange for potentially higher long-term returns?
        </p>

        <div className="py-4">
          <RiskSlider value={riskValue} onChange={handleChange} />
        </div>

        <div
          className="mt-8 p-4 rounded-2xl"
          style={{ backgroundColor: 'var(--color-surface-sunken)' }}
        >
          <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
            {riskValue <= 1 && 'Conservative investors prioritize capital preservation over growth. Your portfolio will focus on stable, low-volatility investments.'}
            {riskValue === 2 && 'Balanced investors seek moderate growth with some protection against losses. Your portfolio will mix growth and stability.'}
            {riskValue === 3 && 'Growth-oriented investors accept more volatility for higher potential returns. Your portfolio will lean toward equities.'}
            {riskValue >= 4 && 'Aggressive investors maximize growth potential and can handle significant short-term losses. Your portfolio will be heavily weighted toward equities.'}
          </p>
        </div>
      </div>

      <div className="p-5" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
