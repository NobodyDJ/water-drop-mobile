import { gql } from '@apollo/client';

export const GET_CAN_SUBSCRIBE_COURSES = gql`
query getCanSubscribeCourses {
  getCanSubscribeCourses {
    data {
      id
      logo
      name
      courses {
        id
        coverUrl
        name
        teachers {
          id
          name
        }
      }
    }
  }
}
`;