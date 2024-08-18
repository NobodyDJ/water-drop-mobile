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
`