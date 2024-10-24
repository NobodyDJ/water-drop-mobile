import { gql } from "@apollo/client";

export const GET_ORG = gql`
    query getOrganizationInfo(
        $id: String!
        ) {
            getOrganizationInfo(id: $id) {
            data {
                description
                name
                tags
                id
                orgFrontImg {
                    url
                }
                orgRoomImg {
                    url
                }
                orgOtherImg {
                    url
                }
                logo
                address
                tel
                longitude
                latitude
                identityCardBackImg
                identityCardFrontImg
                businessLicense
            }
            code
            message
        }
    }
`;