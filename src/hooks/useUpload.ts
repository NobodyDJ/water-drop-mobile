import { useQuery } from "@apollo/client"
import { GET_OSS_INFO } from "../graphql/oss"

export const useUploadOSS = () => {
    // 1.获取签名信息
    // 2.fetch post 请求把参数传到服务端
    const { data } = useQuery(GET_OSS_INFO);

    const uploadHandler = async (file: File) => {
        const formData = new FormData();
        const key = `images/${file.name}`;
        const result = data.getOSSInfo
        formData.append('key', key);
        formData.append('policy', result.policy);
        formData.append('OSSAccessKeyId', result.accessId);
        formData.append('success_action_status', '200');
        formData.append('signature', result.signature);
        formData.append('file', file);
        const res = await fetch(result.host, {
            method: 'POST',
            body: formData
        })
        console.log('res', res);
        console.log(res.url + key);
        return { url: res.url + key };
    }
    return uploadHandler
}