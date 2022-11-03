import { FaSpinner } from 'react-icons/fa'
import './Loader.scss'

const Loader: React.FC = () => {

  return (
    <div className="loading-status">
      <FaSpinner className="loading-icon" />
      <h3>Bootcamper</h3>
    </div>
  )
}

export default Loader