import { useEffect, useState } from 'react'
import openBox from 'assets/Images/open-box.png'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  resetTicketFields,
  setVisibleTicketDialog,
} from 'utils/redux/slices/taskBoardSlice'
import {
  selectProjectTracker,
  selectProjectCompleted,
} from 'utils/redux/slices/projectSlice'
import '../styles/NoTicketsCreated.scss'
import { doTicketsExist } from 'utils/helpers/taskHelpers'
import { PrimaryButton } from 'components/Buttons'
import {
  selectAuthUser,
  selectUserProjectId,
} from 'utils/redux/slices/userSlice'

export const NoTicketsCreated = () => {
  const {
    _id: userId,
    payment: { experience },
  } = useAppSelector(selectAuthUser)
  const projectId = useAppSelector(selectUserProjectId)
  const [ticketsExist, setTicketsExist] = useState(false)
  const projectTracker = useAppSelector(selectProjectTracker)
  const dispatch = useAppDispatch()
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const openCreateTicketDialog = () => {
    dispatch(setVisibleTicketDialog('create'))
    dispatch(
      resetTicketFields({
        createdBy: experience === 'sandbox' ? 'edwardEngineer' : userId,
        status: 'toDo',
        projectId,
      })
    )
  }

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
            <h3>Your team hasn't created any stories.</h3>
            <p>
              Maximize efficiency and visualize work by tracking stories here.
              Move the story through the board from To Do to Complete. You'll be
              one step closer to shipping a live product with each completed
              story!
            </p>
          </div>
          <PrimaryButton
            label='Create story'
            onClick={openCreateTicketDialog}
            startIcon='plus'
            disabled={projectCompleted}
          />
        </div>
      </div>
    )
  } else return null
}
