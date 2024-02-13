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
//TODO: gitHub
//TODO: linkedIn
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
//TODO: google
//Actions
import ClearIcon from '@mui/icons-material/Clear'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
//TODO: copy
import CropIcon from '@mui/icons-material/Crop'
//TODO: attach
//TODO: upload
//TODO: delete
import AddIcon from '@mui/icons-material/Add'
//TODO: eyeShow
//TODO: eyeHide
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import MessageIcon from '@mui/icons-material/Message'
//TODO: newMessage
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
//TODO: send
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
//Display
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined'
//TODO: cameraAdd
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
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
//TODO: camera
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
//TODO: userRemoval
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
  //TODO: gitHub
  //TODO: linkedIn
  portfolio: WorkOutlineIcon,
  //TODO: google
  //Actions
  close: ClearIcon,
  closeChip: HighlightOffIcon,
  //TODO: copy
  crop: CropIcon,
  //TODO: attach
  //TODO: upload
  //TODO: delete
  plus: AddIcon,
  //TODO: eyeShow
  //TODO: eyeHide
  chatBubble: ChatBubbleOutlineOutlinedIcon, //called comment in design
  chat: MessageIcon,
  //TODO: newMessage
  edit: EditOutlinedIcon,
  //TODO: send
  likeEmpty: ThumbUpOffAltIcon,
  likeFilled: ThumbUpAltIcon,
  menuDots: MoreVertIcon,
  leave: LogoutIcon,
  //Display
  camera: CameraEnhanceOutlinedIcon,
  //TODO: cameraAdd
  calendar: CalendarTodayOutlinedIcon,
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
  //TODO: videoCamera
  notifications: NotificationsNoneOutlinedIcon,
  //TODO: userRemoval
  //Feedback
  check: CheckOutlinedIcon,
  checkCircle: CheckCircleOutlineOutlinedIcon,
  error: ErrorOutlineIcon,
  warning: WarningAmberIcon,
  info: InfoOutlinedIcon,
  help: HelpOutlineOutlinedIcon,
}
