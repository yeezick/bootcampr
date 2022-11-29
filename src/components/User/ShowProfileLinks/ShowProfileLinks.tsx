import React, { useEffect, useState } from 'react';
import { emptyUrl } from '../../../utilities/data/userConstants';
import { useAppSelector } from '../../../utilities/redux/hooks';
import { selectAuthUser } from '../../../utilities/redux/slices/users/userSlice';
import { CustomUrlInterface } from '../../../utilities/types/UserInterface';

interface customLinkProps {
  customLinks: any;
  index: number;
}

export const CustomLink = ({ customLinks, index }: customLinkProps) => {
  const authUser = useAppSelector(selectAuthUser);
  const [urlForm, updateUrlForm] = useState<CustomUrlInterface>(emptyUrl);
  const { customUrlLink, customUrlName, _id } = customLinks;

  useEffect(() => {
    const onLoad = () => {
      updateUrlForm(customLinks);
    };
    onLoad();
  }, [customLinks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUrlForm({ ...urlForm, [name]: value });
  };

  return (
    <div key={index}>
      <label htmlFor="customUrlName">
        Url Name
        <input
          defaultValue={customUrlName}
          type="text"
          name="customUrlName"
          onChange={(event) => handleInputChange(event)}
        />
      </label>
      <label htmlFor="customUrlName">
        Url Name
        <input
          defaultValue={customUrlLink}
          type="text"
          name="customUrlLink"
          onChange={(event) => handleInputChange(event)}
        />
      </label>
    </div>
  );
};

export const AddProfileLinks = () => {
  return <div>ShowProfileLinks</div>;
};
