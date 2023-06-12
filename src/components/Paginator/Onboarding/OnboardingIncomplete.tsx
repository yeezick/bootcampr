export const OnboardingIncomplete = ({ handlePageNavigation }) => {
  return (
    <div>
      <h1>Onboarding Incomplete</h1>
      <button onClick={() => handlePageNavigation('next')}>Next</button>
    </div>
  )
}
