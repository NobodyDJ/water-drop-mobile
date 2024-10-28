import { GET_WXPAY_CONFIG } from '@/graphql/order';
import { TWxConfigQuery } from '@/utils/types';
import { useMutation } from '@apollo/client';

export const useWxpayConfig = () => {
  const [get, { loading }] = useMutation<TWxConfigQuery>(GET_WXPAY_CONFIG);

  const getHandler = async (productId: string, amount: number) => {
    const res = await get({
      variables: {
        productId,
        amount,
      },
    });

    return res.data?.getWxpayConfig.data;
  };

  return {
    getWxConfig: getHandler,
    loading,
  };
};