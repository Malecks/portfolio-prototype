import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

const features = [
  {
    title: 'Stocks, bonds, and cash',
    description: 'Choose from three income portfolios to find the perfect balance of assets for you.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ink)' }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2M12 16v2M8.5 8.5l1.5 1M14 14.5l1.5 1M6 12h2M16 12h2" />
      </svg>
    ),
  },
  {
    title: 'Steady and predictable performance',
    description: 'Built for the highest returns and fewest surprises.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ink)' }}>
        <path d="M3 21h18" />
        <path d="M5 21V7l5-4 5 4v14" />
        <path d="M19 21V11l-4-3" />
        <path d="M9 9v.01M9 13v.01M9 17v.01" />
      </svg>
    ),
  },
  {
    title: 'Managed for performance',
    description: 'These managed portfolios use intelligent oversight and active rebalancing for long-term growth.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-ink)' }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export function AboutIncome() {
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
        <span className="text-[72px]">🌺</span>
      </div>

      <div className="flex-1 px-5 pt-4">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] leading-tight mb-4"
          style={{ color: 'var(--color-ink)' }}
        >
          About Income
        </h1>
        <p
          className="text-[15px] leading-relaxed mb-8"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          Our Income portfolios are designed to provide steady, low-risk returns with full liquidity. They're a great fit for investors who want their cash to work harder while still being able to access it at any time.
        </p>

        <div className="space-y-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {feature.icon}
              </div>
              <div>
                <h3
                  className="text-[15px] font-semibold mb-0.5"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <Button onClick={() => setScreen('income-selection')}>
          Choose an Income portfolio
        </Button>
        <Button variant="secondary" onClick={() => {}}>
          Learn more
        </Button>
      </div>
    </div>
  )
}
