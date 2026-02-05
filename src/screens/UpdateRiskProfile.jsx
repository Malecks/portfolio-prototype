import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

const riskProfiles = [
  {
    id: 'aggressive',
    title: 'Aggressive',
    description: 'Best for investors with a very long timeline, who are comfortable with significant volatility, and want maximum growth potential.',
  },
  {
    id: 'growth',
    title: 'Growth',
    description: 'Best for investors with a long timeline, who are comfortable with higher risk, and want the highest returns.',
  },
  {
    id: 'balanced',
    title: 'Balanced',
    description: 'Best for investors with a medium timeline, who want a mix of growth and stability.',
  },
  {
    id: 'conservative',
    title: 'Conservative',
    description: 'Best for investors with a shorter timeline, who prioritize capital preservation over growth.',
  },
]

function AccordionItem({ profile, isCurrentProfile, isExpanded, onToggle }) {
  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[17px] font-semibold"
            style={{ color: 'var(--color-ink)' }}
          >
            {profile.title}
          </span>
          {isCurrentProfile && (
            <span
              className="px-2.5 py-1 rounded-full text-[13px] font-medium"
              style={{
                backgroundColor: 'var(--color-surface-sunken)',
                color: 'var(--color-primary)',
              }}
            >
              Your profile
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          style={{ color: 'var(--color-ink-muted)' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isExpanded && (
        <p
          className="pb-4 text-[15px] leading-relaxed"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          {profile.description}
        </p>
      )}
    </div>
  )
}

export function UpdateRiskProfile() {
  const { currentPortfolio, setScreen, reset } = useApp()
  const [expandedId, setExpandedId] = useState(currentPortfolio.riskProfile)

  const handleToggle = (profileId) => {
    setExpandedId(expandedId === profileId ? null : profileId)
  }

  const handleGetStarted = () => {
    setScreen('goal')
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('portfolio-selection')} onClose={reset} />

      <div className="flex-1 px-5 pt-2">
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          Update your risk profile
        </h1>
        <p
          className="text-[15px] leading-relaxed mb-6"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          If you have a new goal, need your money sooner, or have more flexibility with your investment – it might be time to update your risk profile.
        </p>

        <div>
          {riskProfiles.map((profile) => (
            <AccordionItem
              key={profile.id}
              profile={profile}
              isCurrentProfile={profile.id === currentPortfolio.riskProfile}
              isExpanded={expandedId === profile.id}
              onToggle={() => handleToggle(profile.id)}
            />
          ))}
        </div>
      </div>

      <div
        className="sticky bottom-0 p-5"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <Button onClick={handleGetStarted}>
          Get started
        </Button>
      </div>
    </div>
  )
}
