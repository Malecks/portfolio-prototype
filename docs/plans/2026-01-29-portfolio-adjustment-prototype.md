# Portfolio Adjustment Prototype

Mobile web prototype for adjusting investment portfolio type and risk profile.

## Purpose

Stakeholder demos and personal design exploration. Should be visually polished and interactive.

## Tech Stack

React + Tailwind CSS, runs in mobile browser.

## Starting State

- User has Classic Growth portfolio
- Balance: $304,776.17
- Hidden debug toggle for Summit eligibility

## Portfolio Model

| Type | Risk Profiles | Selection Method |
|------|---------------|------------------|
| Classic | Aggressive, Growth, Balanced, Conservative | Questionnaire |
| Summit | Aggressive, Growth, Balanced, Conservative | Questionnaire + eligibility check |
| Income | Dynamic bond, Core bond, Money market | User picks freely |

### Summit Eligibility

Requires passing three checks (simulated via debug toggle):
- Household income
- Emergency fund
- Limited cushion

## Screens

1. **Portfolio Overview** - Current balance, holdings, "Adjust portfolio" entry
2. **Adjust Portfolio Sheet** - Two paths: change type or update risk profile
3. **Portfolio Selection** - Cards for Classic / Summit / Income
4. **Summit Eligibility** - Blocker screen if toggle = fail
5. **Risk Questionnaire** - Goal → Timeline → Risk tolerance (3 screens)
6. **Income Selection** - Pick bond type
7. **Result Screen** - Confirmation with portfolio summary
8. **Debug Menu** - Hidden toggle (tap version 5x) for Summit eligibility

## Navigation Flow

```
Portfolio Overview
       │
       ▼
Adjust Portfolio (sheet)
       │
       ├─── "Change portfolio type"
       │           │
       │           ▼
       │    Portfolio Selection
       │           │
       │     ┌─────┼─────┐
       │     ▼     ▼     ▼
       │  Classic Summit Income
       │     │     │       │
       │     │     ▼       ▼
       │     │  Eligibility?  Income Selection
       │     │   (if fail)         │
       │     │     │               │
       │     ▼     ▼               │
       │   Questionnaire           │
       │   (Goal→Timeline→Risk)    │
       │           │               │
       │           ▼               ▼
       │      Result Screen ◄──────┘
       │
       └─── "Update risk profile"
                   │
                   ▼
             Questionnaire
                   │
                   ▼
              Result Screen
```

## Questionnaire

### Goal Options
- Save for retirement
- Buy a house
- Build an emergency fund
- Save for education
- General savings

### Timeline Options
- Less than 3 years
- 3-5 years
- 5-10 years
- 10+ years

### Risk Tolerance
Stepped slider: Low → Medium-Low → Medium → Medium-High → High

### Risk Profile Calculation

Risk tolerance is weighted heavily:

| Risk Tolerance | Timeline | Result |
|----------------|----------|--------|
| Low | Any | Conservative |
| Medium-Low | <5 years | Conservative |
| Medium-Low | 5+ years | Balanced |
| Medium | <3 years | Balanced |
| Medium | 3-10 years | Balanced |
| Medium | 10+ years | Growth |
| Medium-High | <5 years | Balanced |
| Medium-High | 5+ years | Growth |
| High | <5 years | Growth |
| High | 5+ years | Aggressive |

Goal provides context in result screen but doesn't affect calculation.

## Visual Design

### Color Palette
- Primary: `#1c1c1e` (very dark grey)
- Success: `#22c55e`
- Background: `#ffffff`
- Muted text: `#6b7280`
- Borders: `#e5e7eb`

### Components
- `MobileFrame` - Phone chrome (status bar, safe areas)
- `Header` - Back button + title + optional close
- `BottomSheet` - Slide-up modal
- `SelectionCard` - Option card with title, description, badge
- `RiskSlider` - Stepped slider with labels
- `DonutChart` - SVG allocation chart
- `Button` - Primary (filled) and secondary (outline)
- `ChecklistItem` - For eligibility items
- `ResultScreen` - Success state with summary

### Style Notes
- Clean white backgrounds, subtle gray borders
- iOS-style status bar
- Cards with light shadows
- Bottom-anchored primary buttons
