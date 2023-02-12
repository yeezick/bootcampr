import {UserInterface} from './UserInterface'

export interface ProjectInterface {
  createdAt?: string
  duration: string
  meeting_cadence: string
  overview: string
  project_owner: string | UserInterface
  roles?: string[]
  status: string
  technologies_used?: string[]
  title: string
  updatedAt?: string
  _id?: string
  __v?: number
}
