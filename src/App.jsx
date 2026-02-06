import { AppProvider, useApp } from './context/AppContext'
import { MobileFrame } from './components/MobileFrame'
import { PortfolioOverview } from './screens/PortfolioOverview'
import { AdjustSheet } from './screens/AdjustSheet'
import { PortfolioSelection } from './screens/PortfolioSelection'
import { UpdateRiskProfile } from './screens/UpdateRiskProfile'
import { PortfolioComparison } from './screens/PortfolioComparison'
import { SummitIneligible } from './screens/SummitIneligible'
import { AboutIncome } from './screens/AboutIncome'
import { IncomeSelection } from './screens/IncomeSelection'
import { GoalScreen } from './screens/GoalScreen'
import { TimelineScreen } from './screens/TimelineScreen'
import { RiskScreen } from './screens/RiskScreen'
import { ResultScreen } from './screens/ResultScreen'
import { ConfirmProfileScreen } from './screens/ConfirmProfileScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { ConfirmUpdateScreen } from './screens/ConfirmUpdateScreen'

function AppContent() {
  const { screen } = useApp()

  const screens = {
    overview: PortfolioOverview,
    'adjust-sheet': AdjustSheet,
    'portfolio-selection': PortfolioSelection,
    'update-risk-profile': UpdateRiskProfile,
    'portfolio-comparison': PortfolioComparison,
    'summit-ineligible': SummitIneligible,
    'about-income': AboutIncome,
    'income-selection': IncomeSelection,
    goal: GoalScreen,
    timeline: TimelineScreen,
    risk: RiskScreen,
    result: ResultScreen,
    'confirm-profile': ConfirmProfileScreen,
    loading: LoadingScreen,
    'confirm-update': ConfirmUpdateScreen,
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
