import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const messages = [
  'Analyzing your answers...',
  'Finding the right portfolio...',
  'Optimizing asset allocation...',
  'Calculating expected returns...',
  'Finalizing your recommendation...',
]

export function LoadingScreen() {
  const { currentPortfolio, setScreen } = useApp()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [messageFade, setMessageFade] = useState(true)

  const targetValue = currentPortfolio.balance
  const duration = 4000 // 4 seconds

  useEffect(() => {
    const startTime = Date.now()
    const messageInterval = duration / messages.length

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(elapsed / duration, 1)
      setProgress(newProgress)

      // Update message based on progress with fade
      const newMessageIndex = Math.min(
        Math.floor(elapsed / messageInterval),
        messages.length - 1
      )
      if (newMessageIndex !== messageIndex) {
        setMessageFade(false)
        setTimeout(() => {
          setMessageIndex(newMessageIndex)
          setMessageFade(true)
        }, 150)
      }

      if (elapsed >= duration) {
        clearInterval(progressInterval)
        // Small delay before transitioning to result
        setTimeout(() => setScreen('result'), 300)
      }
    }, 16) // ~60fps

    return () => clearInterval(progressInterval)
  }, [duration, setScreen, messageIndex])

  // Eased progress for smoother animation
  const easedProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic
  const currentValue = Math.floor(easedProgress * targetValue)

  // Format as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div
      className="flex flex-col min-h-full items-center justify-center px-8"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="w-full max-w-xs">
        {/* Rotating message */}
        <p
          className="text-[15px] text-center mb-8 h-6 transition-opacity duration-150"
          style={{
            color: 'var(--color-ink-muted)',
            opacity: messageFade ? 1 : 0,
          }}
        >
          {messages[messageIndex]}
        </p>

        {/* Progress bar container */}
        <div
          className="h-2 rounded-full overflow-hidden mb-4"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          {/* Progress bar fill */}
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${easedProgress * 100}%`,
              backgroundColor: 'var(--color-ink)',
            }}
          />
        </div>

        {/* Currency value */}
        <p
          className="text-[28px] font-bold tracking-[-0.02em] text-center tabular-nums"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
        >
          {formatCurrency(currentValue)}
        </p>
      </div>
    </div>
  )
}
