import React, { FC } from 'react';
import { AddImageInterface } from '../../../utilities/types/UserInterface';

interface UserImageProps {
  setProfileImage: (arg: AddImageInterface) => void;
}
const AddUserProfileImage = ({ setProfileImage }: UserImageProps) => {
  return (
    <>
      <input onChange={(e: any) => setProfileImage(e.target.files[0])} type="file" accept="image/*" />
    </>
  );
};

export default AddUserProfileImage;
