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
} from 'utils/redux/slices/taskBoardSlice'
import { handleReduxInputChange } from 'utils/helpers'

// TODO: Rename projectTracker to project
export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const visibleTickets = useAppSelector(selectVisibleTickets)
  const [ticketsExist, setTicketsExist] = useState(false)
  const dispatch = useAppDispatch()

  console.log('visibleTickets', visibleTickets)

  useEffect(() => {
    const doTicketsExist = () => {
      if (visibleTickets) {
        const oneTicketExists = Object.keys(visibleTickets).some(
          status => visibleTickets[status]?.length > 0
        )
        setTicketsExist(oneTicketExists)
        return oneTicketExists
      } else {
        setTicketsExist(false)
        return false
      }
    }

    doTicketsExist()
  }, [projectTracker])

  const openDialog = () => dispatch(setVisibleTicketDialog('create'))

  return (
    <div className='AllTickets'>
      <BoardHeader />
      {ticketsExist ? (
        <BoardColumns
          getAllTicket={visibleTickets}
          setGetAllTicket={setVisibleTickets}
        />
      ) : (
        <NoTicketsCreated />
      )}
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
