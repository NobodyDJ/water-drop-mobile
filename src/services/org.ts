import { GET_ORG } from "@/graphql/org";
import { TOrgQuery } from "@/utils/types";
import { useQuery } from "@apollo/client";

// 获取部门的具体信息
export const useOrganization = (id: string) => {
    const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
        variables: {
            id,
        },
    });
    return {
        loading,
        data: data?.getOrganizationInfo.data
    }
}