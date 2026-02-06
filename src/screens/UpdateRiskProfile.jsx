import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

const steps = [
  {
    title: 'Goal',
    description: 'Set a target to work toward',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ink)' }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8l-4 4-4-4" />
        <path d="M8 16l4-4 4 4" />
      </svg>
    ),
  },
  {
    title: 'Timeline',
    description: "How soon you'll reach your goals can determine the right volatility of assets",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ink)' }}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: 'Risk',
    description: 'Higher risk can create higher returns over a long enough timeline',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ink)' }}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
]

export function UpdateRiskProfile() {
  const { setScreen, reset } = useApp()

  return (
    <div
      className="flex flex-col min-h-full"
      style={{
        backgroundColor: 'var(--color-surface)',
        backgroundImage: 'linear-gradient(to bottom, oklch(94% 0.01 280), oklch(96% 0.008 85), var(--color-surface))',
        backgroundSize: '100% 320px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header title="" onBack={() => setScreen('portfolio-selection')} onClose={reset} transparent />
      <div className="flex items-center justify-center py-5">
        <span className="text-[72px]">📊</span>
      </div>

      <div className="flex-1 px-5 pt-6">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Update your risk profile
        </h1>
        <p
          className="text-[15px] leading-relaxed mb-8"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          If you have a new goal, need your money sooner, or have more flexibility with your investment – it might be time to update your risk profile.
        </p>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div>
                <h3
                  className="text-[15px] font-semibold mb-0.5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <Button onClick={() => setScreen('goal')}>
          Get started
        </Button>
        <Button variant="secondary" onClick={() => {}}>
          Learn more
        </Button>
      </div>
    </div>
  )
}
