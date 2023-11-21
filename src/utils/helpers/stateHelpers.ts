import { getOneProject } from 'utils/api'
import { setProject } from 'utils/redux/slices/projectSlice'

export const handleFormInputChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setFormValues
) => {
  const { name, value } = e.target
  setFormValues(currForm => {
    return { ...currForm, [name]: value }
  })
}

export const storeUserProject = async (dispatch, projectId) => {
  if (projectId) {
    const randomUserProject = await getOneProject(projectId)
    dispatch(setProject(randomUserProject))
  }
}

export const passwordInputLabel = (
  passwordInputName: string,
  signUpInput: string,
  changePasswordInput: string,
  resetPasswordInput: string
) => {
  switch (passwordInputName) {
    case 'sign-up':
      return signUpInput
    case 'settings-pwd-reset':
      return changePasswordInput
    case 'email-pwd-reset':
      return resetPasswordInput
    default:
      return ''
  }
}
