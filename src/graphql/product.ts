import { gql } from '@apollo/client';

export const GET_PRODUCT_TYPES = gql`
query getProductTypes{
  getProductTypes{
    data {
      key
      title
    }
  }
}
`;