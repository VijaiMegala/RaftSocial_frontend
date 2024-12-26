import React from 'react';
import { FiImage } from 'react-icons/fi';

interface ProfilePicUploadProps {
  image: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePicUpload: React.FC<ProfilePicUploadProps> = ({ image, handleImageUpload }) => {
  return (
    <div className="mb-4 text-center">
      <div className="flex justify-center items-center mt-2 flex-col">
        {image ? (
          <img
            src={image}
            alt="Uploaded preview"
            className="w-24 h-24 object-cover rounded-full border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border flex items-center justify-center text-gray-500">
            <FiImage className="w-8 h-8" />
            Profile Pic
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default ProfilePicUpload;
