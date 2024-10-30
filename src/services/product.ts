import { GET_PRODUCT, GET_PRODUCT_TYPES, GET_PRODUCTS, GET_PRODUCTS_BY_ORG_ID } from '@/graphql/product';
import { DEFAULT_PAGE_SIZE, DEFAULT_TYPE } from '@/utils/constants';
import { IProduct, TProductQuery, TProductsQuery, TProductTypeQuery } from '@/utils/types';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Toast } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';

// 获取当前定位
const getPosition = () => new Promise<{ latitude: number; longitude: number }>((r) => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    console.log(latitude, longitude);
    r({ latitude, longitude });
  }, () => {
    r({ latitude: 0, longitude: 0 });
  });
});

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
  const pn = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<IProduct[]>([]);
  const [get] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);
  const init = async (pageNum = 1) => {
    const toast = Toast.show({
      icon: 'loading',
      content: '加载中…',
    })
    const {
      latitude,
      longitude,
    } = await getPosition();
    const res = await get({
      fetchPolicy: 'network-only',
      variables: {
        type: type === DEFAULT_TYPE ? '' : type,
        latitude,
        longitude,
        page: {
          pageNum,
          pageSize: DEFAULT_PAGE_SIZE
        }
      },
      onCompleted(){
        toast.close();
      }
    })
    return res.data?.getProductsForH5.data || [];
  }
  const loadMoreHandler = async () => {
    const res = await init(pn.current + 1);
    if (res.length > 0) {
      pn.current += 1;
      setHasMore(true);
      setData((old) => [...old, ...res]);
    } else {
      setHasMore(false);
    }
  };

  const onRefreshHandler = async () => {
    pn.current = 1;
    setHasMore(true);
    const res = await init();
    setData(res);
  };

  useEffect(() => {
    onRefreshHandler();
  }, [name, type]);
  return {
    onRefresh: onRefreshHandler,
    loadMore: loadMoreHandler,
    hasMore,
    data,
  };
};


export const useProductsByOrgId = (orgId: string) => {
  const { data } = useQuery<TProductsQuery>(
    GET_PRODUCTS_BY_ORG_ID,
    {
      variables: {
        orgId,
      },
    },
  );

  return data?.getProductsByOrgIdForH5.data;
};

/**
 * 获取单个商品
 * @param id
 * @returns
 */
export const useProductInfo = (id?: string) => {
  const { data, loading } = useQuery<TProductQuery>(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  return { data: data?.getProductInfo.data, loading };
};