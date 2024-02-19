import { UserInterface } from 'interfaces'

export const removeAuthUserFromList = (
  allMembers: UserInterface[],
  authUser: UserInterface
) => {
  const filteredMembers = allMembers.filter(
    member => member._id !== authUser._id
  )
  return filteredMembers
}
