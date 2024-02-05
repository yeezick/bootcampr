import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EastIcon from '@mui/icons-material/East'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import TitleIcon from '@mui/icons-material/Title'
import { IconMap, IconProps, MappedIcons } from 'interfaces/components'

export const fetchIcon = (name: MappedIcons, props?: IconProps) => {
  const MappedIcon = iconMap[name]
  return <MappedIcon {...props} />
}

/**
 * To view icon, visit:
 * https://mui.com/material-ui/material-icons/
 */
export const iconMap: IconMap = {
  account: AccountCircleOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  chatBubble: ChatBubbleOutlineOutlinedIcon,
  close: ClearIcon,
  description: DescriptionOutlinedIcon,
  email: EmailOutlinedIcon,
  group: GroupsOutlinedIcon,
  leftArrow: KeyboardBackspaceIcon,
  link: InsertLinkOutlinedIcon,
  localOffer: LocalOfferOutlinedIcon,
  lock: LockOutlinedIcon,
  person: PersonOutlineOutlinedIcon,
  plus: AddIcon,
  rightArrow: EastIcon,
  send: SendOutlinedIcon,
  tasks: ChecklistOutlinedIcon,
  title: TitleIcon,
}
