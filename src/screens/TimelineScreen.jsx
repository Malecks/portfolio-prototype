import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { SelectionCard } from '../components/SelectionCard'

const timelines = [
  { id: 0, label: 'Less than 3 years' },
  { id: 1, label: '3-5 years' },
  { id: 2, label: '5-10 years' },
  { id: 3, label: '10+ years' },
]

export function TimelineScreen() {
  const { answers, setAnswers, setScreen, reset } = useApp()

  const handleSelect = (id) => {
    setAnswers({ ...answers, timeline: id })
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      <Header title="" onBack={() => setScreen('goal')} onClose={reset} />

      <div className="flex-1 px-5 pt-4">
        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-6">
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-ink)' }} />
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>

        <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-ink-subtle)' }}>Timeline</span>
        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-2 mt-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          When will you need this money?
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          Longer timelines allow for more growth-oriented strategies.
        </p>

        <div className="space-y-3">
          {timelines.map((t) => (
            <SelectionCard
              key={t.id}
              title={t.label}
              selected={answers.timeline === t.id}
              onClick={() => handleSelect(t.id)}
            />
          ))}
        </div>
      </div>

      <div className="p-5" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Button onClick={() => setScreen('risk')} disabled={answers.timeline === null}>
          Continue
        </Button>
      </div>
    </div>
  )
}
