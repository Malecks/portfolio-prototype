import { AppProvider, useApp } from './context/AppContext'
import { MobileFrame } from './components/MobileFrame'
import { PortfolioOverview } from './screens/PortfolioOverview'
import { AdjustSheet } from './screens/AdjustSheet'
import { PortfolioSelection } from './screens/PortfolioSelection'
import { SummitIneligible } from './screens/SummitIneligible'
import { IncomeSelection } from './screens/IncomeSelection'
import { GoalScreen } from './screens/GoalScreen'
import { TimelineScreen } from './screens/TimelineScreen'
import { RiskScreen } from './screens/RiskScreen'
import { ResultScreen } from './screens/ResultScreen'
import { ConfirmProfileScreen } from './screens/ConfirmProfileScreen'
import { LoadingScreen } from './screens/LoadingScreen'

function AppContent() {
  const { screen } = useApp()

  const screens = {
    overview: PortfolioOverview,
    'adjust-sheet': AdjustSheet,
    'portfolio-selection': PortfolioSelection,
    'summit-ineligible': SummitIneligible,
    'income-selection': IncomeSelection,
    goal: GoalScreen,
    timeline: TimelineScreen,
    risk: RiskScreen,
    result: ResultScreen,
    'confirm-profile': ConfirmProfileScreen,
    loading: LoadingScreen,
  }

  const Screen = screens[screen] || PortfolioOverview

  return (
    <MobileFrame>
      <Screen />
    </MobileFrame>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
