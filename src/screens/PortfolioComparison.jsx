import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

const portfolioData = {
  summit: {
    id: 'summit',
    title: 'Summit',
    emoji: '🏔️',
    heroTitle: 'Upgrade to Summit',
    projection: '+$129K',
    allocation: [
      { label: 'Stocks', percentage: 70, color: '#6B8DD6' },
      { label: 'Private markets', percentage: 30, color: '#E8925B' },
    ],
    features: [
      {
        icon: 'trend',
        title: 'Designed for high growth',
        description: 'Combine high-performing public equities with alts, for long-term returns.',
      },
      {
        icon: 'lock',
        title: 'Access to alts',
        description: 'Private equity and private credit have long been reserved for the wealthy. Summit brings them into a managed portfolio for all investors.',
      },
      {
        icon: 'person',
        title: 'Managed for performance',
        description: 'This managed portfolio uses intelligent oversight and active rebalancing for long-term growth.',
      },
    ],
    cta: 'Find out if you qualify',
  },
  classic: {
    id: 'classic',
    title: 'Classic',
    emoji: '🥧',
    heroTitle: 'Switch to Classic',
    projection: '+$89K',
    allocation: [
      { label: 'Stocks', percentage: 60, color: '#6B8DD6' },
      { label: 'Bonds', percentage: 30, color: '#4CAF50' },
      { label: 'Cash', percentage: 10, color: '#9B7ED9' },
    ],
    features: [
      {
        icon: 'trend',
        title: 'Time-tested approach',
        description: 'A traditional mix of stocks, bonds, and cash that has delivered consistent results over decades.',
      },
      {
        icon: 'balance',
        title: 'Risk-based allocation',
        description: 'Your portfolio is automatically balanced based on your risk profile, from conservative to aggressive.',
      },
      {
        icon: 'person',
        title: 'Professionally managed',
        description: 'Expert oversight with regular rebalancing to keep your portfolio on track.',
      },
    ],
    cta: 'Continue with Classic',
  },
}

function TrendIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function BalanceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 6l7-3 7 3" />
      <path d="M5 6v6a7 7 0 0 0 7 7 7 7 0 0 0 7-7V6" />
    </svg>
  )
}

const iconComponents = {
  trend: TrendIcon,
  lock: LockIcon,
  person: PersonIcon,
  balance: BalanceIcon,
}

function GrowthChart({ projection }) {
  return (
    <div className="relative h-48 mb-4">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 300 150"
        preserveAspectRatio="none"
      >
        {/* Dashed baseline */}
        <path
          d="M 20 120 Q 100 110, 150 90 T 280 60"
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Solid growth line */}
        <path
          d="M 20 120 Q 80 100, 140 70 T 280 30"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        {/* End dot */}
        <circle cx="280" cy="30" r="4" fill="var(--color-ink)" />
      </svg>

      {/* Projection label */}
      <div
        className="absolute right-8 top-8 text-[14px] font-semibold"
        style={{ color: 'var(--color-ink)' }}
      >
        {projection}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
        <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>Today</span>
        <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>Age 65</span>
      </div>
    </div>
  )
}

function AllocationBar({ allocation }) {
  return (
    <div className="mb-3">
      <div className="h-3 rounded-full overflow-hidden flex mb-2">
        {allocation.map((item, i) => (
          <div
            key={i}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: item.color,
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {allocation.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[13px]" style={{ color: 'var(--color-ink)' }}>
              {item.label}
            </span>
            <span className="text-[13px]" style={{ color: 'var(--color-ink-muted)' }}>
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PortfolioToggle({ selected, onSelect, options }) {
  return (
    <div
      className="inline-flex rounded-full p-1"
      style={{ backgroundColor: 'var(--color-surface-sunken)' }}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="px-5 py-2 rounded-full text-[14px] font-medium transition-colors"
          style={{
            backgroundColor: selected === option ? 'var(--color-surface)' : 'transparent',
            color: selected === option ? 'var(--color-ink)' : 'var(--color-ink-muted)',
            boxShadow: selected === option ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  )
}

function FeatureItem({ icon, title, description }) {
  const IconComponent = iconComponents[icon] || TrendIcon

  return (
    <div className="flex gap-4">
      <div
        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
        style={{ color: 'var(--color-ink)' }}
      >
        <IconComponent />
      </div>
      <div className="flex-1">
        <h4
          className="text-[15px] font-semibold mb-1"
          style={{ color: 'var(--color-ink)' }}
        >
          {title}
        </h4>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export function PortfolioComparison() {
  const { currentPortfolio, selectedType, setScreen, reset } = useApp()
  const [viewingPortfolio, setViewingPortfolio] = useState(selectedType || 'summit')

  const targetPortfolio = selectedType || 'summit'
  const currentType = currentPortfolio.type
  const toggleOptions = [targetPortfolio, currentType].filter((v, i, a) => a.indexOf(v) === i)

  const data = portfolioData[viewingPortfolio] || portfolioData.summit
  const targetData = portfolioData[targetPortfolio] || portfolioData.summit

  const handleContinue = () => {
    setScreen('goal')
  }

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
      <h1
        className="text-[24px] font-bold tracking-[-0.02em] leading-tight text-center mb-2"
        style={{ color: 'var(--color-ink)' }}
      >
        {targetData.heroTitle}
      </h1>
      <div className="flex items-center justify-center py-3">
        <span className="text-[72px]">{targetData.emoji}</span>
      </div>

      <div className="flex-1 px-5 overflow-y-auto">
        {/* Chart section */}
        <GrowthChart projection={data.projection} />

        {/* Allocation bar */}
        <AllocationBar allocation={data.allocation} />

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <PortfolioToggle
            selected={viewingPortfolio}
            onSelect={setViewingPortfolio}
            options={toggleOptions}
          />
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ backgroundColor: 'var(--color-border)' }} />

        {/* About section */}
        <h3
          className="text-[17px] font-bold mb-5"
          style={{ color: 'var(--color-ink)' }}
        >
          About {targetData.title}
        </h3>

        <div className="space-y-5 mb-6">
          {targetData.features.map((feature, i) => (
            <FeatureItem
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="p-5 space-y-3" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={handleContinue}>
          {targetData.cta}
        </Button>
        <Button variant="secondary" onClick={() => {}}>
          Learn more
        </Button>
      </div>
    </div>
  )
}
