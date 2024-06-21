import CircularProgress from '@mui/material/CircularProgress'
import './Loader.scss'

export const Loader = () => {
  return (
    <div className='loader-container '>
      <CircularProgress />
    </div>
  )
}
