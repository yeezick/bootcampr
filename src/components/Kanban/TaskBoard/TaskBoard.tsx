import { useEffect, useState } from 'react'
import '../Ticket.scss'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { BoardColumns } from './BoardColumns'
import { NoTicketsCreated } from './NoTicketsCreated'
import { BoardHeader } from './BoardHeader'
import { Box, Dialog, DialogContent } from '@mui/material'
import { IoMdClose } from 'react-icons/io'
import {
  TicketStatusFields,
  TicketTextFields,
} from '../CreateTickets/CreateTicket'
import {
  setTicketFields,
  selectVisibleTicketDialog,
  setVisibleTicketDialog,
  setVisibleTickets,
  selectVisibleTickets,
  setInitialVisibleTickets,
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'

// TODO: Rename projectTracker to project
export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const [ticketsExist, setTicketsExist] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setInitialVisibleTickets(projectTracker))
  }, [])

  useEffect(() => {
    const doTicketsExist = () => {
      const oneTicketExists = Object.keys(projectTracker).some(
        status => projectTracker[status]?.length > 0
      )

      setTicketsExist(oneTicketExists)
      return oneTicketExists
    }

    doTicketsExist()
  }, [projectTracker])

  const openDialog = () => dispatch(setVisibleTicketDialog('create'))

  return (
    <div className='AllTickets'>
      <BoardHeader />
      {ticketsExist ? <BoardColumns /> : <NoTicketsCreated />}
      <button onClick={openDialog}>CLICK TO OPEN DIALOG</button>
      <TicketDialog />
    </div>
  )
}

export const TicketDialog = () => {
  const dispatch = useAppDispatch()
  const visibleTicketDialog = useAppSelector(selectVisibleTicketDialog)
  const closeDialog = () => {
    dispatch(setVisibleTicketDialog(''))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleReduxInputChange(e, dispatch, setTicketFields)

  const ticketsStatus = ''

  return (
    <Dialog open={visibleTicketDialog} maxWidth='lg'>
      <form>
        <DialogContent>
          {/* <Box className='ticketDetailOpenModalBox'> */}
          <IoMdClose className='close-x' onClick={closeDialog} />
          <Box className='createTicketBox'>
            <TicketTextFields handleInputChange={handleInputChange} />
            <TicketStatusFields
              ticketsStatus={ticketsStatus}
              handleInputChange={handleInputChange}
              closeModal={closeDialog}
            />
          </Box>
          {/* </Box> */}
        </DialogContent>
      </form>
    </Dialog>
  )
}
