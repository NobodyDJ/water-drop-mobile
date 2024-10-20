import { GET_PRODUCT_TYPES, GET_PRODUCTS } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/contansts';
import { TProductsQuery, TProductTypeQuery } from '@/utils/types';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect } from 'react';

export const useProductTypes = () => {
  const { data, loading } = useQuery<TProductTypeQuery>(GET_PRODUCT_TYPES);

  return {
    data: data?.getProductTypes.data || [],
    loading,
  };
};

/**
 * 获取商品列表
 * @param pageNum
 * @param pageSize
 * @param type
 */
export const useProducts = (
  name = '',
  type = '',
) => {
  const [get, { data }] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);
  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中…',
    })
    const res = await get({
      fetchPolicy: 'network-only',
      variables: {
        type: type === DEFAULT_TYPE ? '' : type,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE
        }
      }
    })
    toast.close();
    return res;
  }
  useEffect(() => {
    init();
  }, [name, type]);
  const onRefreshHandler = () => init();
  return {
    onRefresh: onRefreshHandler,
    data: data?.getProductsForH5.data,
  };
};