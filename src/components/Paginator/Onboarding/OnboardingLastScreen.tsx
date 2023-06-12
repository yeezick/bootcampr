export const OnboardingLastScreen = ({ handlePageNavigation }) => {
  return (
    <div>
      <h1>Onboarding Last Screen</h1>
      <button onClick={() => handlePageNavigation('previous')}>Previous</button>
    </div>
  )
}
