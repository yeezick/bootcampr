import { isEmptyString } from './inputUtils'
import { isSandboxId, isWaitlistExperience } from './taskHelpers'

export const checkErrorState = (e, setErrorStates) => {
  const { name, value } = e.target
  setErrorStates(errorStates => {
    return {
      ...errorStates,
      [name]: isEmptyString(value),
    }
  })
}

export const generateDefaultPicture = (firstName, lastName) =>
  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=FFA726&color=1A237E&rounded=true&bold=true`

export const handleUserProfileInputChange = (
  e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
  setUpdateUserForm,
  setErrorStates
) => {
  const { name, value } = e.target
  const nestedLinks = ['githubUrl', 'linkedinUrl', 'portfolioUrl']
  checkErrorState(e, setErrorStates)

  if (nestedLinks.includes(name)) {
    setUpdateUserForm(prevForm => ({
      ...prevForm,
      links: {
        ...prevForm.links,
        [name]: value,
      },
    }))
  } else {
    setUpdateUserForm(currUserForm => {
      return { ...currUserForm, [name]: value }
    })
  }
}

// recurring users who completed a project, presented their project but haven't joined to anothor project
export const statusInactive = (payment, projects) => {
  return (
    payment.experience === 'inactive' &&
    !payment.paid &&
    projects.activeProject === null &&
    projects.projects?.length
  )
}
// recurring users who completed a project, presented their project but haven't joined to anothor project
export const statusRecurringUnpaid = payment => {
  return payment.experience === 'recurring' && !payment.paid
}

// recurring users who completed a project, paid, are waiting to be matched with a new team
export const statusRecurringWaitlist = (payment, projects) => {
  return (
    payment.experience === 'recurring' &&
    payment.paid &&
    projects.activeProject === null &&
    projects.projects?.length
  )
}

// first time users who are exploring the app or waiting to be matched with their first team
export const statusSandboxOrWaitlist = (payment, projects) => {
  return (
    isSandboxId(payment.experience) ||
    (isWaitlistExperience(payment.experience) &&
      projects.activeProject === null &&
      !projects.projects?.length)
  )
}
