import React, { FC } from 'react';
import { AddImageInterface } from '../../../utilities/types/UserInterface';

interface UserImageProps {
  setProfileImageFile: (arg: AddImageInterface) => void;
}
const AddUserProfileImage = ({ setProfileImageFile }: UserImageProps) => {
  return (
    <>
      <input onChange={(e: any) => setProfileImageFile(e.target.files[0])} type="file" accept="image/*" />
      {/* <input
        onChange={(e: any) => setProfileImageFile(e.target.files[0])}
        type="file"
        accept=".jpg, .png, .gif, .webp"
      /> */}
    </>
  );
};

export default AddUserProfileImage;
