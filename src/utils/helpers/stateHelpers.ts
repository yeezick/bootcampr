import { getOneProject } from 'utils/api'
import { emptyProject } from 'utils/data/projectConstants'
import { setProject, setProjectLoading } from 'utils/redux/slices/projectSlice'
import { setInitialVisibleTickets } from 'utils/redux/slices/taskBoardSlice'

export const handleFormInputChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  setFormValues
) => {
  const { name, value } = e.target
  setFormValues(currForm => {
    return { ...currForm, [name]: value }
  })
}

export const handleReduxInputChange = (e, dispatch, reducer) => {
  const { name, value } = e.target
  dispatch(reducer({ [name]: value }))
}

export const storeUserProject = async (dispatch, projectId = 'sandbox') => {
  dispatch(setProjectLoading(true))
  try {
    let userProject
    if (projectId === 'waitlist') {
      userProject = {
        ...emptyProject,
        _id: 'waitlist',
      }
    } else {
      userProject = await getOneProject(projectId)
    }

    dispatch(setProject(userProject))
    dispatch(setInitialVisibleTickets(userProject.projectTracker))
  } catch (error) {
    console.error('Store user project failed: ', error)
  } finally {
    dispatch(setProjectLoading(false))
  }
}
