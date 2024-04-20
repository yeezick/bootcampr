import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import CircleIcon from '@mui/icons-material/Circle'
import CropIcon from '@mui/icons-material/Crop'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import EastIcon from '@mui/icons-material/East'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import MessageIcon from '@mui/icons-material/Message'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import SearchIcon from '@mui/icons-material/Search'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import TitleIcon from '@mui/icons-material/Title'
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import WestIcon from '@mui/icons-material/West'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

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
  back: ArrowBackIosIcon,
  calendar: CalendarTodayOutlinedIcon,
  camera: CameraEnhanceOutlinedIcon,
  chat: MessageIcon,
  chatBubble: ChatBubbleOutlineOutlinedIcon, //called comment in design
  check: CheckOutlinedIcon,
  checkbox: CheckBoxOutlineBlankIcon,
  checkboxChecked: CheckBoxIcon,
  checkboxIndeterminate: IndeterminateCheckBoxIcon,
  checkCircle: CheckCircleOutlineOutlinedIcon,
  circle: CircleIcon,
  clock: QueryBuilderOutlinedIcon,
  close: ClearIcon,
  closeChip: HighlightOffIcon,
  crop: CropIcon,
  dash: RemoveOutlinedIcon,
  description: DescriptionOutlinedIcon,
  dropdownUp: ArrowDropUpIcon,
  dropdownDown: ArrowDropDownIcon,
  edit: EditOutlinedIcon,
  email: EmailOutlinedIcon,
  error: ErrorOutlineIcon,
  forward: ArrowForwardIosIcon,
  group: GroupsOutlinedIcon,
  help: HelpOutlineOutlinedIcon,
  info: InfoOutlinedIcon,
  leave: LogoutIcon,
  leftArrow: WestIcon,
  likeEmpty: ThumbUpAltOutlinedIcon,
  likeFilled: ThumbUpIcon,
  link: InsertLinkOutlinedIcon,
  lock: LockOutlinedIcon, //called password in design
  localOffer: LocalOfferOutlinedIcon, //called status in design
  message: ChatOutlinedIcon,
  menuDots: MoreVertIcon,
  notifications: NotificationsNoneOutlinedIcon,
  radioButton: RadioButtonUncheckedIcon,
  radioButtonFilled: RadioButtonCheckedIcon,
  rightArrow: EastIcon,
  page: ArticleOutlinedIcon,
  plus: AddIcon,
  person: PersonOutlineOutlinedIcon,
  portfolio: WorkOutlineIcon,
  search: SearchIcon,
  tasks: ChecklistOutlinedIcon, //called checkList in design
  title: TitleIcon,
  warning: WarningAmberIcon,
}
