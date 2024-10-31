import { GET_CARDS } from '@/graphql/card';
import { TCardRecordsQuery } from '@/utils/types';
import { useQuery } from '@apollo/client';

/**
 *  获取当前消费者的消费卡
 */
export const useCards = () => {
  const { loading, data } = useQuery<TCardRecordsQuery>(GET_CARDS, {
    variables: {
      page: {
        pageSize: 100,
        pageNum: 1,
      },
    },
  });

  return {
    loading,
    data: data?.getCardRecordsForH5.data,
  };
};