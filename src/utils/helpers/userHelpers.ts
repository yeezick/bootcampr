import { isEmptyString } from './inputUtils'

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
