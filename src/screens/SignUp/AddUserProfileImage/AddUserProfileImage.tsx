import React, { useEffect, useRef } from 'react';

interface UserImageProps {
  setProfileImageFile: Function;
  setPreviewImage: Function;
  previewImage?: string;
  profileImageFile?: File;
}

const AddUserProfileImage = ({
  setProfileImageFile,
  profileImageFile,
  setPreviewImage,
  previewImage,
}: UserImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileImageFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(profileImageFile);
    } else {
      setPreviewImage(null);
    }
  }, [profileImageFile]);

  const getImageFile = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fileInputRef?.current?.click();
  };

  const removeImg = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setProfileImageFile(null);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type.substr(0, 5) === 'image') {
      setProfileImageFile(file);
    } else {
      setProfileImageFile(null);
    }
  };

  return (
    <>
      <input ref={fileInputRef} onChange={onImageChange} style={{ display: 'none' }} type="file" accept="image/*" />
      {previewImage ? (
        <button onClick={(e) => removeImg(e)}>remove image</button>
      ) : (
        <button onClick={(e) => getImageFile(e)}>Change image</button>
      )}
    </>
  );
};

export default AddUserProfileImage;
