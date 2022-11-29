import React, { useEffect, useState } from 'react';
import { emptyUrl } from '../../../utilities/data/userConstants';
import { useAppSelector } from '../../../utilities/redux/hooks';
import { selectAuthUser } from '../../../utilities/redux/slices/users/userSlice';
import { CustomUrlInterface } from '../../../utilities/types/UserInterface';

export const CustomLink = () => {
  const authUser = useAppSelector(selectAuthUser);
  const [urlForm, updateUrlForm] = useState<CustomUrlInterface>(emptyUrl);
  const { customUrlLink, customUrlName } = urlForm;

  useEffect(() => {
    if (authUser) {
      updateUrlForm((currForm) => {
        return {
          ...currForm,
          ...authUser,
        };
      });
    }
  }, [authUser]);

  return <div>ShowProfileLinks</div>;
};

export const ShowProfileLinks = () => {
  return <div>ShowProfileLinks</div>;
};
