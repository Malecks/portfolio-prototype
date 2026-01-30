export function DonutChart({ segments, size = 120 }) {
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  // Asset class colors from design system
  const assetColors = {
    equities: '#6B8DD6',
    bonds: '#4CAF50',
    cash: '#9B7ED9',
    alts: '#E8925B',
    gold: '#C9A227',
    other: '#E0E0E0',
  }

  // Map segment names to colors
  const getColor = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('equit')) return assetColors.equities
    if (lower.includes('bond') || lower.includes('fixed') || lower.includes('income') || lower.includes('investment grade') || lower.includes('dynamic')) return assetColors.bonds
    if (lower.includes('cash') || lower.includes('money market')) return assetColors.cash
    if (lower.includes('alt')) return assetColors.alts
    if (lower.includes('gold')) return assetColors.gold
    return assetColors.other
  }

  // Calculate arc path for each segment
  const polarToCartesian = (angle) => {
    const radians = (angle - 90) * Math.PI / 180
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    }
  }

  const createArcPath = (startAngle, endAngle) => {
    const start = polarToCartesian(startAngle)
    const end = polarToCartesian(endAngle)
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
  }

  const gapAngle = 4 // degrees between segments
  let currentAngle = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((segment, i) => {
        const segmentAngle = (segment.value / 100) * 360 - gapAngle
        const startAngle = currentAngle + gapAngle / 2
        const endAngle = startAngle + segmentAngle
        currentAngle = endAngle + gapAngle / 2

        // Skip tiny segments
        if (segmentAngle < 0.5) return null

        return (
          <path
            key={i}
            d={createArcPath(startAngle, endAngle)}
            fill="none"
            stroke={getColor(segment.name)}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dasharray 500ms cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        )
      })}
    </svg>
  )
}
