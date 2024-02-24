import { useEffect, useState } from 'react'
import openBox from 'assets/Images/open-box.png'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { setVisibleTicketDialog } from 'utils/redux/slices/taskBoardSlice'
import { selectProjectTracker } from 'utils/redux/slices/projectSlice'
import '../styles/NoTicketsCreated.scss'
import { PrimaryButton } from 'components/Buttons'
import { doTicketsExist } from 'utils/helpers/taskHelpers'

export const NoTicketsCreated = () => {
  const [ticketsExist, setTicketsExist] = useState(false)
  const projectTracker = useAppSelector(selectProjectTracker)
  const dispatch = useAppDispatch()
  const openCreateTicketDialog = () =>
    dispatch(setVisibleTicketDialog('create'))

  useEffect(() => {
    setTicketsExist(doTicketsExist(projectTracker))
  }, [projectTracker])

  if (!ticketsExist) {
    return (
      <div className='no-tickets-created'>
        <div className='content'>
          <div className='image'>
            <img src={openBox} alt='kanbanImage' />
          </div>
          <div className='text'>
            <h3>Your team hasn’t created any tasks.</h3>
            <p>
              Maximize efficiency and visualize work by tracking tasks here.
              Move the task through the board from To Do to Complete. You’ll be
              one step closer to shipping a live product with each completed
              task!
            </p>
          </div>
          <PrimaryButton
            handler={openCreateTicketDialog}
            text='Create a task'
            startIcon='plus'
          />
        </div>
      </div>
    )
  } else return null
}
