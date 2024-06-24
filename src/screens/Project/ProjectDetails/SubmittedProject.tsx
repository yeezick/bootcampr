import { getFullUrl } from 'utils/helpers'
import { useAppSelector } from 'utils/redux/hooks'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'

export const SubmittedProject = () => {
  const { deployedUrl } = useAppSelector(selectCompletedInfo)
  const fullUrl = getFullUrl(deployedUrl)
  return (
    <div>
      <h2>Submitted Project URL</h2>
      <p>
        Your submitted project URL is:{' '}
        <a
          href={fullUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='deployed-url'
        >
          {deployedUrl}
        </a>
      </p>
    </div>
  )
}
