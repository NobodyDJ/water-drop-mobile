import { gql } from "@apollo/client";

// 查询
export const FIND = gql`
query find($id: String!){
    find(id: $id){
        name
        desc
        id
    }
}
`;

// 更新
export const UPDATE = gql`
mutation update($id: String!, $params: UserInput!){
    update(id: $id, params: $params)
}
`;