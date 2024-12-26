import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SUGGESTED_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { ADD_FOLLOWER } from '../graphql/mutation';
import { useUserContext } from '../context/AuthContext';
import UserCard from '../components/UserCard';
import { RightOutlined } from '@ant-design/icons';

export const Users = () => {
  
    
  const { userId } = useUserContext();
  const { data, loading, error } = useQuery(GET_SUGGESTED_USER, {
    variables: { currentUserId: userId },
  });
  const [addFollower] = useMutation(ADD_FOLLOWER);
  const navigate = useNavigate();
  
  if (!userId) {
    return <p>User not logged in. Please log in to continue.</p>;
  }

  const handleFollow = async (followUserId: string) => {
    try {
      const response = await addFollower({
        variables: {
          loggedInUserId: userId,
          followUserId,
        },
      });
      if (response.data.addFollower.success) {
        console.log('Followed successfully');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <p>Error fetching users: {error.message}</p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      <div className="w-3/4 h-5/6 bg-blue-500 m-5 rounded-md overflow-y-auto custom-scrollbar flex flex-wrap gap-4 shadow-lg p-5">
        {data.getSuggestedUsers.map((user: any) => (
          <UserCard
            key={user.id}
            user={user}
            currentUserId={userId}
            handleFollow={handleFollow}
          />
        ))}
      </div>

      <div className="h-[70px] w-full flex justify-end items-center px-10 shadow-md">
        <button
          className="flex items-center text-blue-500 font-medium"
          onClick={() => navigate('/dashboard')}
        >
          Next <RightOutlined className="ml-2" />
        </button>
      </div>
    </div>
  );
};
