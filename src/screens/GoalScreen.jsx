import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { SelectionCard } from '../components/SelectionCard'

const goals = [
  { id: 0, label: 'Save for retirement' },
  { id: 1, label: 'Buy a house' },
  { id: 2, label: 'Build an emergency fund' },
  { id: 3, label: 'Save for education' },
  { id: 4, label: 'General savings' },
]

export function GoalScreen() {
  const { answers, setAnswers, setScreen, reset } = useApp()

  const handleSelect = (id) => {
    setAnswers({ ...answers, goal: id })
  }

  const handleBack = () => {
    setScreen('adjust-sheet')
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={handleBack} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-6">
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-subtle)' }}>Goal</span>
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2 mt-2"
          style={{ color: 'var(--color-ink)' }}
        >
          What are you saving for?
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          This helps us understand your investment timeline.
        </p>

        <div className="space-y-3">
          {goals.map((g) => (
            <SelectionCard
              key={g.id}
              title={g.label}
              selected={answers.goal === g.id}
              onClick={() => handleSelect(g.id)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 p-5" style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={() => setScreen('timeline')} disabled={answers.goal === null}>
          Continue
        </Button>
      </div>
    </div>
  )
}
