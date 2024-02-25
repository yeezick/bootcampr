import { fetchIcon } from 'utils/components/Icons'
import { createSnackBar } from 'utils/redux/slices/snackBarSlice'

export const determineLikeIcon = likedByUser => {
  const iconProps = { sx: { cursor: 'pointer' } }
  const iconType = likedByUser ? 'likeFilled' : 'likeOutlined'
  return fetchIcon(iconType, iconProps)
}

export const successSnackbar = message =>
  createSnackBar({
    message,
    severity: 'success',
  })

export const errorSnackbar = message =>
  createSnackBar({
    message,
    severity: 'error',
  })
