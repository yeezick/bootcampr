import { useEffect, useState } from 'react'
import '../Ticket.scss'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import { BoardColumns } from './BoardColumns/BoardColumns'
import { NoTicketsCreated } from './NoTicketsCreated'
import {
  setVisibleTickets,
  setInitialVisibleTickets,
} from 'utils/redux/slices/taskBoardSlice'
import { selectUserId } from 'utils/redux/slices/userSlice'
import { TicketDialog } from '../TicketDialog/TicketDialog'

export const TaskBoard = () => {
  const projectTracker = useAppSelector(selectProjectTracker)
  const userId = useAppSelector(selectUserId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setInitialVisibleTickets(projectTracker))
  }, [])

  useEffect(() => {
    dispatch(
      setVisibleTickets({
        projectTracker,
        userId,
        changeVisibleTicketType: false,
      })
    )
  }, [projectTracker])

  return (
    <>
      <BoardColumns />
      <NoTicketsCreated />
      <TicketDialog />
    </>
  )
}
