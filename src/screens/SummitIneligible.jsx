import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

const requirements = [
  { label: 'Household income check', passed: false },
  { label: 'Emergency fund check', passed: true },
  { label: 'Limited cushion check', passed: false },
]

export function SummitIneligible() {
  const { setScreen, reset, setSelectedType } = useApp()

  const handleChooseAnother = () => {
    setSelectedType(null)
    setScreen('portfolio-selection')
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('portfolio-selection')} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          You don't qualify for Summit
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Based on your financial profile, you don't currently meet the requirements for a Summit portfolio.
        </p>

        <div className="space-y-3 mb-6">
          {requirements.map((req, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                backgroundColor: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
              }}
            >
              {req.passed ? (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
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
              ) : (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-negative-soft)' }}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--color-negative)' }}
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
              )}
              <span
                className="text-[15px]"
                style={{ color: req.passed ? 'var(--color-ink-muted)' : 'var(--color-ink)', fontWeight: req.passed ? 400 : 500 }}
              >
                {req.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
          You can still choose Classic or Income portfolios, or check back later when your financial situation changes.
        </p>
      </div>

      <div className="p-5 space-y-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={handleChooseAnother}>
          Choose another portfolio
        </Button>
        <Button variant="ghost" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
