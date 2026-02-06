import { useApp } from '../context/AppContext'
import { Header } from '../components/Header'
import { Button } from '../components/Button'

export function ConfirmUpdateScreen() {
  const { reset, confirmUpdate } = useApp()

  const handleFinish = () => {
    confirmUpdate()
  }

  return (
    <div className="flex flex-col min-h-full" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Hero area with overlaid header */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(to bottom, oklch(94% 0.01 280), oklch(96% 0.008 85), var(--color-surface))',
        }}
      >
        <Header title="" onClose={reset} transparent />
        <div className="flex items-center justify-center py-10">
          <span className="text-[72px]">📢</span>
        </div>
      </div>

      <div className="flex-1 px-5 pt-6">

        <h1
          className="text-[28px] font-bold tracking-[-0.02em] leading-tight mb-3"
          style={{ color: 'var(--color-ink)' }}
        >
          Your portfolio is ready to be updated!
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: 'var(--color-ink-muted)' }}>
          To finish updating your risk profile we'll rebalance your portfolio over the next few trading days. You'll see your holdings will update as trades complete.
        </p>

        {/* Warning box */}
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: '#FEF9E7' }}
        >
          <div className="flex gap-3">
            <span className="text-[18px]">⚠️</span>
            <div>
              <h3 className="font-semibold text-[15px] mb-1" style={{ color: '#92700C' }}>
                Non-registered accounts
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: '#92700C' }}>
                Updating your risk profile in a non-registered may result in taxable gains or losses.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 p-5 space-y-3" style={{ backgroundColor: 'var(--color-surface)' }}>
        <Button onClick={handleFinish}>
          Finish updating
        </Button>
        <Button variant="ghost" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
