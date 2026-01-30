export function DonutChart({ segments, size = 120 }) {
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Use design token colors
  const colors = [
    'oklch(25% 0.02 70)',  // chart-1: dark warm
    'oklch(55% 0.03 70)',  // chart-2: medium warm
    'oklch(80% 0.02 80)',  // chart-3: light warm
  ]

  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((segment, i) => {
        const dashLength = (segment.value / 100) * circumference
        const dashOffset = -offset
        offset += dashLength

        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors[i] || segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dasharray 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        )
      })}
    </svg>
  )
}
