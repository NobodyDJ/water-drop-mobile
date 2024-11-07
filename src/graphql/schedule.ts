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

export const GET_SCHEDULES_BY_COURSE = gql`
query getSchedulesByCourse($courseId: String!){
  getSchedulesByCourse(courseId: $courseId){
    code
    message
    data {
      id
      schoolDay
      startTime
      endTime
    }
    page {
      total
    }
  }
}`;