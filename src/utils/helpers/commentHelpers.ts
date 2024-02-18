import { fetchIcon } from 'utils/components/Icons'

export const determineLikeIcon = likedByUser => {
  const iconProps = { sx: { cursor: 'pointer' } }
  const iconType = likedByUser ? 'likeFilled' : 'likeOutlined'
  return fetchIcon(iconType, iconProps)
}
