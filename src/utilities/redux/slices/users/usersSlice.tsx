import { UserInterface } from "../../../Interface/UserInterface"

export interface UserState {
  users: UserInterface[] | null;
  loading: boolean;
  singleUser: UserInterface | null
}

const initialState: UserState = {
  users: [],
  singleUser: null,
  loading: false
}