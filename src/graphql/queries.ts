import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      profileDetails {
        name
        age
      }
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query ($id: String!) {
    user(id: $id) {
      id
      profileDetails {
        name
        age
      }
      followers {
        id
      }
      following {
        id
      }
    }
  }
`;

export const GET_SUGGESTED_USER = gql`
query GetSuggestedUsers($currentUserId: ID!) {
  getSuggestedUsers(currentUserId: $currentUserId) {
    id
    email
    profileDetails {
      name
      age
    }
  }
}
`