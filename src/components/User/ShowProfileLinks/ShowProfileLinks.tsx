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
  const [customInputs, setCustomInputs] = useState<any>([]);

  const addCustomInput = () => {
    setCustomInputs((link: any) => {
      return [
        ...link,
        {
          type: 'text',
          value: '',
        },
      ];
    });
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    console.log(id);
    setCustomInputs((link: any) => {
      const newCustomInputArr = link.slice();
      newCustomInputArr[id].value = value;
      console.log(newCustomInputArr[id].value);
      return newCustomInputArr;
    });
  };
  return {
    /* <button type="button" onClick={addCustomInput}>
  + Add Custom Link
</button>

{customInputs.map((link: any, index: any) => {
  return (
    <div key={index}>
      <label htmlFor="customUrlName">
        Url Name
        <input id={index} type={link.type} name="customUrlName" onChange={handleCustomInputChange} required />
      </label>
      <label htmlFor="customUrlLink">
        Url Link
        <input id={index} type={link.type} name="customUrlLink" onChange={handleCustomInputChange} required />
      </label>
    </div>
  );
})} */
  };
};
