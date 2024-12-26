import React, { useState } from 'react';
import { notification } from 'antd';
import defaultProfile from '../assets/profile-default.svg';

interface UserCardProps {
  user: any;
  currentUserId: string;
  handleFollow: (followUserId: string) => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({ user, currentUserId, handleFollow }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const onFollowClick = async () => {
    try {
      await handleFollow(user.id);
      setIsFollowed(true);
    } catch (err : any) {
      notification.error({
        message: 'Follow Failed',
        description: err?.message || 'Something went wrong.',
        placement: 'topRight',
      });
    }
  };

  return (
    <div
      key={user.id}
      className="bg-white w-36 h-40 rounded-lg px-3 py-3 flex flex-col justify-around items-center shadow-md"
    >
      <div className="w-full h-fit flex justify-center">
        <img
          src={defaultProfile}
          alt="Profile"
          className="w-12 h-12 rounded-full bg-green-100"
        />
      </div>
      <h2 className="text-center font-[600] text-[14px]">
        {user.profileDetails.name || 'Unknown'}
      </h2>
      <button
        className={`${
          isFollowed ? 'bg-white border border-blue-500 text-[#3b82f6]' : 'bg-blue-500'
        } rounded px-4 py-1 text-center text-[14px] text-white`}
        onClick={onFollowClick}
        disabled={isFollowed}
      >
        {isFollowed ? 'Followed' : 'Follow'}
      </button>
    </div>
  );
};

export default UserCard;
