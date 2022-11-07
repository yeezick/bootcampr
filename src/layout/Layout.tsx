import React, { useEffect } from 'react';
import { Loader } from '../components/Loader/Loader';
import { verify } from '../utilities/api/users';
import { useAppDispatch, useAppSelector } from '../utilities/redux/hooks';
import { uiStatus, updateAuthUser } from '../utilities/redux/slices/users/userSlice';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(uiStatus)
  
  useEffect(() => {
    const verifyUser = async () => {
      const authUser = await verify()
      if (authUser) dispatch(updateAuthUser(authUser))
    }
    verifyUser()
  }, [])
  
  if (status.isLoading) {
    return <Loader />
  }

  return <div>{children};</div>;
};
