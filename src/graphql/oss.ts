import { gql } from "@apollo/client";

// 查询 graphql查询语句
export const GET_OSS_INFO = gql`
query getOSSInfo{
    getOSSInfo{
    expire
    policy
    signature
    accessId
    host
  }
}
`;