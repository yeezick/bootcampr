import { Stack } from '@mui/material'
import { PresentationDetails } from './PresentationDetails'
import './Presentation.scss'

export const Presentation = () => {
  return (
    <Stack spacing={'32px'} className='page-content'>
      <PresentationDetails />
      <div className='presentation-decision'>
        <h3>
          Let us know if your team is presenting when you submit your project!
        </h3>
      </div>
    </Stack>
  )
}
