import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { IconMap } from 'interfaces/components'

export const fetchIcon = name => {
  const MappedIcon = iconMap[name]
  return <MappedIcon />
}

export const iconMap: IconMap = {
  account: AccountCircleOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  description: DescriptionOutlinedIcon,
  email: EmailOutlinedIcon,
  group: GroupsOutlinedIcon,
  lock: LockOutlinedIcon,
  plus: AddIcon,
  tasks: ChecklistOutlinedIcon,
}
