//Directional
import WestIcon from '@mui/icons-material/West'
import EastIcon from '@mui/icons-material/East'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

//Input
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import SearchIcon from '@mui/icons-material/Search'

//Social
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

//Actions
import ClearIcon from '@mui/icons-material/Clear'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CropIcon from '@mui/icons-material/Crop'
import AddIcon from '@mui/icons-material/Add'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MessageIcon from '@mui/icons-material/Message'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
//Display
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import CircleIcon from '@mui/icons-material/Circle'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import TitleIcon from '@mui/icons-material/Title'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
//Feedback
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

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
  //Directional
  leftArrow: WestIcon,
  rightArrow: EastIcon,
  back: ArrowBackIosIcon,
  forward: ArrowForwardIosIcon,
  dropdownUp: ArrowDropUpIcon,
  dropdownDown: ArrowDropDownIcon,
  //Input
  checkbox: CheckBoxOutlineBlankIcon,
  checkboxChecked: CheckBoxIcon,
  checkboxIndeterminate: IndeterminateCheckBoxIcon,
  radioButton: RadioButtonUncheckedIcon,
  radioButtonFilled: RadioButtonCheckedIcon,
  search: SearchIcon,
  //Social
  link: InsertLinkOutlinedIcon,
  portfolio: WorkOutlineIcon,
  //Actions
  close: ClearIcon,
  closeChip: HighlightOffIcon,
  crop: CropIcon,
  plus: AddIcon,
  chatBubble: ChatBubbleOutlineOutlinedIcon, //called comment in design
  chat: MessageIcon,
  edit: EditOutlinedIcon,
  likeEmpty: ThumbUpAltOutlinedIcon,
  likeFilled: ThumbUpIcon,
  menuDots: MoreVertIcon,
  leave: LogoutIcon,
  //Display
  camera: CameraEnhanceOutlinedIcon,
  calendar: CalendarTodayOutlinedIcon,
  circle: CircleIcon,
  person: PersonOutlineOutlinedIcon,
  message: ChatOutlinedIcon,
  page: ArticleOutlinedIcon,
  group: GroupsOutlinedIcon,
  description: DescriptionOutlinedIcon,
  title: TitleIcon,
  localOffer: LocalOfferOutlinedIcon, //called status in design
  dash: RemoveOutlinedIcon,
  tasks: ChecklistOutlinedIcon, //called checkList in design
  lock: LockOutlinedIcon, //called password in design
  email: EmailOutlinedIcon,
  account: AccountCircleOutlinedIcon,
  clock: QueryBuilderOutlinedIcon,
  notifications: NotificationsNoneOutlinedIcon,
  //Feedback
  check: CheckOutlinedIcon,
  checkCircle: CheckCircleOutlineOutlinedIcon,
  error: ErrorOutlineIcon,
  warning: WarningAmberIcon,
  info: InfoOutlinedIcon,
  help: HelpOutlineOutlinedIcon,
}
