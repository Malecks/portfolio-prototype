import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { RiskSlider } from '../components/RiskSlider'

const goals = [
  { id: 0, label: 'Retirement' },
  { id: 1, label: 'House purchase' },
  { id: 2, label: 'Emergency fund' },
  { id: 3, label: 'Education' },
  { id: 4, label: 'General savings' },
]

const timelines = [
  { id: 0, label: 'Less than 3 years' },
  { id: 1, label: '3-5 years' },
  { id: 2, label: '5-10 years' },
  { id: 3, label: '10+ years' },
]

const riskLabels = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High']

// Derive reasonable defaults from existing risk profile (0-4 scale)
const getDefaultsFromRiskProfile = (riskProfile) => {
  switch (riskProfile) {
    case 'conservative':
      return { goal: 2, timeline: 0, riskTolerance: 0 }
    case 'balanced':
      return { goal: 4, timeline: 1, riskTolerance: 2 }
    case 'growth':
      return { goal: 0, timeline: 2, riskTolerance: 3 }
    case 'aggressive':
      return { goal: 0, timeline: 3, riskTolerance: 4 }
    default:
      return { goal: 0, timeline: 2, riskTolerance: 2 }
  }
}

export function ConfirmProfileScreen() {
  const { currentPortfolio, answers, setAnswers, setScreen, reset, completeFlow, selectedType } = useApp()

  // Initialize with existing answers or derive from current risk profile
  const defaults = getDefaultsFromRiskProfile(currentPortfolio.riskProfile)
  const [localGoal, setLocalGoal] = useState(answers.goal ?? defaults.goal)
  const [localTimeline, setLocalTimeline] = useState(answers.timeline ?? defaults.timeline)
  const [localRisk, setLocalRisk] = useState(answers.riskTolerance ?? defaults.riskTolerance)

  // Expanded sections
  const [expandedSection, setExpandedSection] = useState(null)

  const handleConfirm = () => {
    const finalAnswers = { goal: localGoal, timeline: localTimeline, riskTolerance: localRisk }
    setAnswers(finalAnswers)
    completeFlow(finalAnswers)
    setScreen('loading')
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const portfolioLabels = {
    classic: 'Classic',
    summit: 'Summit',
    income: 'Income',
  }

  const newType = selectedType || currentPortfolio.type

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('portfolio-selection')} onClose={reset} />

      <div className="flex-1 px-5 pt-4 pb-6 overflow-y-auto">
        <h1
          className="text-[24px] font-bold tracking-[-0.02em] leading-tight mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          Confirm your profile
        </h1>
        <p className="text-[14px] leading-relaxed mb-5" style={{ color: 'var(--color-ink-muted)' }}>
          Review your preferences for your {portfolioLabels[newType]} portfolio. Tap to adjust if needed.
        </p>

        <div className="space-y-3">
          {/* Goal Section */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <button
              onClick={() => toggleSection('goal')}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <span className="text-[12px] uppercase tracking-wider block mb-1" style={{ color: 'var(--color-ink-subtle)' }}>
                  Goal
                </span>
                <span className="text-[16px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                  {goals[localGoal]?.label}
                </span>
              </div>
              <svg
                className="w-5 h-5 transition-transform"
                style={{
                  color: 'var(--color-ink-muted)',
                  transform: expandedSection === 'goal' ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
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
            {expandedSection === 'goal' && (
              <div className="px-4 pb-4 space-y-2">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setLocalGoal(g.id)
                      setExpandedSection(null)
                    }}
                    className="w-full p-3 rounded-xl text-left text-[15px] transition-colors"
                    style={{
                      backgroundColor: localGoal === g.id ? 'var(--color-ink)' : 'var(--color-surface-sunken)',
                      color: localGoal === g.id ? 'white' : 'var(--color-ink)',
                    }}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timeline Section */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <button
              onClick={() => toggleSection('timeline')}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <span className="text-[12px] uppercase tracking-wider block mb-1" style={{ color: 'var(--color-ink-subtle)' }}>
                  Timeline
                </span>
                <span className="text-[16px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                  {timelines[localTimeline]?.label}
                </span>
              </div>
              <svg
                className="w-5 h-5 transition-transform"
                style={{
                  color: 'var(--color-ink-muted)',
                  transform: expandedSection === 'timeline' ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
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
            {expandedSection === 'timeline' && (
              <div className="px-4 pb-4 space-y-2">
                {timelines.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setLocalTimeline(t.id)
                      setExpandedSection(null)
                    }}
                    className="w-full p-3 rounded-xl text-left text-[15px] transition-colors"
                    style={{
                      backgroundColor: localTimeline === t.id ? 'var(--color-ink)' : 'var(--color-surface-sunken)',
                      color: localTimeline === t.id ? 'white' : 'var(--color-ink)',
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Risk Section */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
            }}
          >
            <button
              onClick={() => toggleSection('risk')}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <span className="text-[12px] uppercase tracking-wider block mb-1" style={{ color: 'var(--color-ink-subtle)' }}>
                  Risk tolerance
                </span>
                <span className="text-[16px] font-semibold" style={{ color: 'var(--color-ink)' }}>
                  {riskLabels[localRisk] || 'Medium'}
                </span>
              </div>
              <svg
                className="w-5 h-5 transition-transform"
                style={{
                  color: 'var(--color-ink-muted)',
                  transform: expandedSection === 'risk' ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
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
            {expandedSection === 'risk' && (
              <div className="px-4 pb-6 pt-2">
                <RiskSlider value={localRisk} onChange={setLocalRisk} />
                <p className="text-[13px] mt-4 leading-relaxed" style={{ color: 'var(--color-ink-muted)' }}>
                  {localRisk === 0 && 'Prioritize capital preservation over growth.'}
                  {localRisk === 1 && 'Accept modest volatility for slightly better returns.'}
                  {localRisk === 2 && 'Balance growth potential with stability.'}
                  {localRisk === 3 && 'Accept more volatility for higher growth.'}
                  {localRisk === 4 && 'Maximize growth potential, handle significant swings.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 p-5" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={handleConfirm}>
          Confirm and continue
        </Button>
      </div>
    </div>
  )
}
