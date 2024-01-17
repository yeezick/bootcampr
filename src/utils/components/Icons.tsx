import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { IconMap } from 'interfaces/components'

export const fetchIcon = name => {
  const MappedIcon = iconMap[name]
  return <MappedIcon />
}

export const iconMap: IconMap = {
  account: AccountCircleOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  chatBubble: ChatBubbleOutlineOutlinedIcon,
  description: DescriptionOutlinedIcon,
  email: EmailOutlinedIcon,
  group: GroupsOutlinedIcon,
  link: InsertLinkOutlinedIcon,
  lock: LockOutlinedIcon,
  plus: AddIcon,
  tasks: ChecklistOutlinedIcon,
}
