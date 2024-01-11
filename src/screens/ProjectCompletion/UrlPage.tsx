import { useState, useEffect } from 'react'
import { editProject } from 'utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from 'utils/redux/store'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import {
  selectProject,
  updateDeployedUrl,
} from 'utils/redux/slices/projectSlice'
import { Stack } from '@mui/material'
import { PrimaryButton, SecondaryButton } from 'components/Buttons'
import { DomainLink } from 'layout/DomainLink'

export const UrlPage = ({ handlePageNavigation }) => {
  const authUser = useSelector(selectAuthUser)
  const [inputChange, setInputChange] = useState('')
  const project = useSelector(selectProject)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const projectID = project._id

  useEffect(() => {
    setIsLoading(false)
  }, [])

  //TODO: convert alerts to MUI toast to match Figma designs

  const handleSubmit = async e => {
    e.preventDefault()
    if (isUrl(inputChange)) {
      const isDuplicate = Object.entries(
        project.completedInfo?.deployedUrl || {}
      ).some(([userId, url]: [string, string]) => {
        return userId === authUser._id && url === inputChange
      })

      if (isDuplicate) {
        alert('URL already exists in the list.')
        return
      }

      const updatedProject = {
        completedInfo: {
          ...project.completedInfo,
          deployedUrl: {
            ...project.completedInfo?.deployedUrl,
            [authUser._id]: inputChange,
          },
        },
      }

      try {
        setIsLoading(true)
        const response = await editProject(projectID, updatedProject)

        if (response) {
          dispatch(updateDeployedUrl(updatedProject.completedInfo.deployedUrl))
          handlePageNavigation('next')
          setIsLoading(false)
        }
      } catch (error) {
        console.error('An error occurred while saving the URL.', error)
        setIsLoading(false)
      }
    } else {
      alert('Please enter a valid URL')
    }
  }

  const handleInputChange = e => {
    setInputChange(e.target.value)
    setIsDisabled(!isUrl(inputChange))
  }

  const isUrl = string => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '(www\\.)' +
        '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}$',
      'i'
    )
    return urlPattern.test(string)
  }

  return (
    <div
      className='project-completion-url-page'
      aria-live='polite'
      aria-labelledby='formHeading'
    >
      <h1 id='formHeading'>Congrats! You've shipped a live product!</h1>
      <form onSubmit={handleSubmit}>
        <Stack className='form-content' spacing={'32px'}>
          <p>First, input the URL to your website.</p>
          <label htmlFor='projectUrl'>
            <p>Project URL</p>
          </label>
          <input
            id='projectUrl'
            onChange={handleInputChange}
            type='text'
            value={inputChange}
          />
          <Stack className='btn-container'>
            <SecondaryButton>
              <DomainLink route={`/project/${projectID}`} domain={'project'}>
                Cancel
              </DomainLink>
            </SecondaryButton>
            <PrimaryButton
              isDisabled={isDisabled || isLoading}
              paginatorBtn
              text='Presentation'
              type='submit'
              aria-disabled={isDisabled || isLoading}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  )
}
