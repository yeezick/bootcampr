import { FaSpinner } from 'react-icons/fa'
import './Loader.scss'

export const Loader: React.FC = () => {
  return (
    <div className="loading-status">
      <FaSpinner className="loading-icon" />
      <h3>Bootcamper</h3>
    </div>
  )
}