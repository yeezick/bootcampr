import React, { FC, useEffect, useRef } from 'react';
import { AddImageInterface } from '../../../utilities/types/UserInterface';

interface UserImageProps {
  setProfileImageFile: (arg: AddImageInterface | null) => void;
  setPreviewImage: (arg: any) => void;
  previewImage: any;
  profileImageFile: any;
}

const AddUserProfileImage = ({
  setProfileImageFile,
  profileImageFile,
  setPreviewImage,
  previewImage,
}: UserImageProps) => {
  const fileInputRef: any = useRef();

  useEffect(() => {
    if (profileImageFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(profileImageFile);
    } else {
      setPreviewImage(null);
    }
  }, [profileImageFile]);

  const getImageFile = (e: any) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const removeImg = (e: any) => {
    e.preventDefault();
    setProfileImageFile(null);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        onChange={(e: any) => setProfileImageFile(e.target.files[0])}
        style={{ display: 'none' }}
        type="file"
        accept="image/*"
      />
      {previewImage ? (
        <button onClick={(e) => removeImg(e)}>remove image</button>
      ) : (
        <button onClick={(e) => getImageFile(e)}>Change image</button>
      )}
    </>
  );
};

export default AddUserProfileImage;
