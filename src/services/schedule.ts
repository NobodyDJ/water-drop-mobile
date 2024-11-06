import { GET_CAN_SUBSCRIBE_COURSES } from '@/graphql/schedule';
import { TOrgsQuery } from '@/utils/types';
import { useQuery } from '@apollo/client';

// 获取我的可以约的课程
export const useCanSubscribeCourses = () => {
  const { loading, data } = useQuery<TOrgsQuery>(GET_CAN_SUBSCRIBE_COURSES);

  return {
    loading,
    data: data?.getCanSubscribeCourses.data,
  };
};