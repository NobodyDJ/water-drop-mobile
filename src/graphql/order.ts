import { gql } from '@apollo/client';

export const GET_WXPAY_CONFIG = gql`
mutation getWxpayConfig($productId: String!, $quantity: Float!, $amount: Float!){
  getWxpayConfig(productId: $productId, quantity: $quantity, amount: $amount){
    code
    data {
      appId
      timeStamp
      nonceStr
      package
      signType
      paySign
    }
    message
  }
}
`;
