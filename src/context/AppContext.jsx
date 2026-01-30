import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [currentPortfolio, setCurrentPortfolio] = useState({
    type: 'classic',
    riskProfile: 'growth',
    balance: 304776.17,
  })

  const [screen, setScreen] = useState('overview')
  const [selectedType, setSelectedType] = useState(null)
  const [answers, setAnswers] = useState({ goal: null, timeline: null, riskTolerance: null })
  const [incomeChoice, setIncomeChoice] = useState(null)
  const [summitEligible, setSummitEligible] = useState(true)
  const [debugTapCount, setDebugTapCount] = useState(0)

  const calculateRiskProfile = (timeline, risk) => {
    // Risk tolerance weighted heavily
    if (risk <= 1) return 'conservative' // Low
    if (risk === 2) {
      // Medium-Low
      return timeline < 2 ? 'conservative' : 'balanced'
    }
    if (risk === 3) {
      // Medium
      if (timeline === 0) return 'balanced'
      if (timeline <= 2) return 'balanced'
      return 'growth'
    }
    if (risk === 4) {
      // Medium-High
      return timeline < 2 ? 'balanced' : 'growth'
    }
    // High (5)
    return timeline < 2 ? 'growth' : 'aggressive'
  }

  const completeFlow = () => {
    const type = selectedType || currentPortfolio.type
    let riskProfile = currentPortfolio.riskProfile

    if (type === 'income') {
      riskProfile = incomeChoice
    } else if (answers.timeline !== null && answers.riskTolerance !== null) {
      riskProfile = calculateRiskProfile(answers.timeline, answers.riskTolerance)
    }

    setCurrentPortfolio({
      ...currentPortfolio,
      type,
      riskProfile,
    })
  }

  const reset = () => {
    setSelectedType(null)
    setAnswers({ goal: null, timeline: null, riskTolerance: null })
    setIncomeChoice(null)
    setScreen('overview')
  }

  const handleDebugTap = () => {
    const newCount = debugTapCount + 1
    setDebugTapCount(newCount)
    if (newCount >= 5) {
      setSummitEligible(!summitEligible)
      setDebugTapCount(0)
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentPortfolio,
        screen,
        setScreen,
        selectedType,
        setSelectedType,
        answers,
        setAnswers,
        incomeChoice,
        setIncomeChoice,
        summitEligible,
        completeFlow,
        reset,
        handleDebugTap,
        calculateRiskProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
