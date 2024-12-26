import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($input: UserInput!) {
    signup(input: $input) {
      token
      user {
        id
        profileDetails {
          name
          age
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        profileDetails {
          name
        }
      }
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation AddFollower($loggedInUserId: String!, $followUserId: String!) {
    addFollower(loggedInUserId: $loggedInUserId, followUserId: $followUserId) {
      success
      message
    }
  }
`;

