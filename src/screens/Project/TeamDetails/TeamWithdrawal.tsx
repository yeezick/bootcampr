import { TeamWithdrawalModal } from 'interfaces'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
} from '@mui/material'
import './TeamMembers.scss'

export const TeamWithdrawal: React.FC<TeamWithdrawalModal> = ({
  onOpenModal,
  openModal,
  onCloseAll,
  openMenu,
  onCloseMenu,
  anchorEl,
}) => {
  //TODO: Snackbars for success and error messages (New ticket for this)
  //TODO: Withdrawal button logic for removing user from project and navigating to withdrawal page (New ticket for this)
  return (
    <>
      <Menu
        id='withdrawal-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={onCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'tm-open-modal',
        }}
      >
        <MenuItem onClick={onOpenModal}>Withdraw from this project</MenuItem>
      </Menu>
      <Dialog open={openModal} onClose={onCloseMenu} maxWidth='xs' fullWidth>
        <div className='wtd-modal-cont'>
          <div className='wtd-text-cont'>
            <DialogTitle id='wtd-modal-title'>
              Withdraw from project?
            </DialogTitle>
            <DialogContent id='wtd-modal-body'>
              You will lose access to this project portal, team messaging, and
              cannot rejoin the project
            </DialogContent>
          </div>
          <DialogActions id='wtd-btns-cont'>
            <button className='wtd-cancel-btn' onClick={onCloseAll}>
              Cancel
            </button>
            <button className='wtd-remove-btn'>Withdraw from project</button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  )
}
