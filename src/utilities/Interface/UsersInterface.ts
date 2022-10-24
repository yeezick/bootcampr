import { UserInterface } from "./UserInterface"

export interface UsersInterface {
  users: UserInterface[] | null;
  loading: boolean;
  singleUser: UserInterface | null
}
