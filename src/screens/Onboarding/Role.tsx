import './Role.scss'
import { useEffect, useState } from 'react'
import { CustomCard } from 'components/Card/Card'
import { updateUserProfile } from 'utils/api'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'utils/redux/hooks'
import { selectAuthUser, updateAuthUser } from 'utils/redux/slices/userSlice'
import { PaginatorButton } from 'components/Buttons/PaginatorButtons'
import softwareEngineer from '../../assets/Images/software-engineer.png'
import uxDesigner from '../../assets/Images/ux-designer.png'
import productManager from '../../assets/Images/product-manager.png'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'

export const Role = ({ handlePageNavigation }) => {
  const dispatch = useDispatch()
  const [selectedRole, setSelectedRole] = useState('')
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const authUser = useAppSelector(selectAuthUser)

  const roles = [
    {
      img: uxDesigner,
      title: 'UX Designer',
      description: "I'm comfortable with all aspects of UX Design.",
    },
    {
      img: softwareEngineer,
      title: 'Software Engineer',
      description: "I'm comfortable with MERN/full stack development.",
    },
    {
      img: productManager,
      title: 'Product Manager',
      description: 'I can create user stories and manage prioritization.',
    },
  ]

  const handleRoleSelect = role => {
    setSelectedRole(role)
    setButtonEnabled(true)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await updateUserProfile({
        role: selectedRole,
      })
      dispatch(updateAuthUser(response.userProfile))
      setButtonEnabled(false)
      handlePageNavigation('next')
    } catch (error) {
      console.error(error)
      dispatch(errorSnackbar('Role failed to save. Please try again.'))
    }
  }

  useEffect(() => {
    const { role } = authUser
    if (role) {
      setSelectedRole(role)
      setButtonEnabled(true)
    }
  }, [authUser])

  return (
    <div className='onboarding-container'>
      <div className='welcome-container'>
        <h1>Welcome, {authUser.firstName}!</h1>
        <p>
          Let's start with information we'll use to best match project teams.
        </p>
      </div>
      <div className='role-selection-container'>
        <div>
          <p className='tell-role'>First, tell us your role.</p>
        </div>
        <div className='roles'>
          {roles.map(roleInfo => (
            <RoleCard
              key={roleInfo.title}
              roleInfo={roleInfo}
              handleClick={() => handleRoleSelect(roleInfo.title)}
              selectedRole={selectedRole}
            />
          ))}
        </div>
      </div>
      <div className='onboarding-button-section'>
        <PaginatorButton
          buttonType='primary'
          disabled={!buttonEnabled}
          handler={handleSubmit}
          text='Set availability'
        />
      </div>
    </div>
  )
}

const RoleCard = ({ roleInfo, handleClick, selectedRole }) => {
  const { img, title, description } = roleInfo
  return (
    <CustomCard
      onClick={handleClick}
      key={title}
      isSelected={selectedRole === title}
    >
      <div className='role'>
        <div className='role-avatar'>
          <img src={img} alt={title} />
        </div>
        <div className='role-content'>
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </CustomCard>
  )
}
