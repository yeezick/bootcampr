import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import TitleIcon from '@mui/icons-material/Title'
import { IconMap } from 'interfaces/components'

export const fetchIcon = name => {
  const MappedIcon = iconMap[name]
  return <MappedIcon />
}

/**
 * To view icon, visit:
 * https://mui.com/material-ui/material-icons/
 */
export const iconMap: IconMap = {
  account: AccountCircleOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  chatBubble: ChatBubbleOutlineOutlinedIcon,
  description: DescriptionOutlinedIcon,
  email: EmailOutlinedIcon,
  group: GroupsOutlinedIcon,
  localOffer: LocalOfferOutlinedIcon,
  link: InsertLinkOutlinedIcon,
  lock: LockOutlinedIcon,
  person: PersonOutlineOutlinedIcon,
  plus: AddIcon,
  tasks: ChecklistOutlinedIcon,
  title: TitleIcon,
}
