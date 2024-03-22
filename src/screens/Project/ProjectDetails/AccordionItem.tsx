import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export const AccordionItem = ({ title, details }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls='panel1-content'
        id='panel1-header'
      >
        <Typography className='title'>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className='details-div'>{details}</div>
      </AccordionDetails>
    </Accordion>
  )
}
