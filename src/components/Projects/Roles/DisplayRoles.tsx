import { selectAuthUser } from '../../../utilities/redux/slices/users/userSlice';
import { useAppSelector } from '../../../utilities/redux/hooks';
import { Role } from '../../../utilities/types/ProjectInterface';

type Props = {
  roles: Role[];
};

export const DisplayRoles = ({ roles }: Props) => {
  const authUser = useAppSelector(selectAuthUser);
  return <div>DisplayRoles</div>;
};
