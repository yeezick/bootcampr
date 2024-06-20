import { UserInterface } from './UserInterface'

export interface TeamMembersInterface {
  members: UserInterface[]
  membersMap: { [key: string]: UserInterface }
  loading: boolean
  error: string | null
}
