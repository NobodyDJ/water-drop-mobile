import { useState, useCallback } from "react";
import useMount from "./useMount";

/**
 * 1. 实现组件初始化，发送请求
 */

interface IOptions {
    params: Record<string, string>;
    manual?: Boolean;
    onSuccess?: (res: unknown) => void;// 用于异步请求
    onError?: (res: unknown) => void;
}


// Record<string, string> 是一个key 和 value 都是string的对象。
const useRequest = (
    service: (params: Record<string, string>) => Promise<unknown>,
    options:IOptions
) => {
    const [data, setData] = useState<unknown>();
    const [loading, setLoading] = useState<boolean>(false);

    // 性能优化 如果请求没有发生变化则不做初始话
    const init = useCallback((curParams: Record<string, string>) => {
        setLoading(true);
        service(curParams).then((res) => {
            setData(res);
            setLoading(false);
            options.onSuccess && options.onSuccess(res);
        }).catch((error) => {
            setLoading(false);
            options.onError && options.onError(error);
        })
    }, [service])

    useMount(() => {
        // 首次挂载该组件回进行初始化
        if (!options.manual) {
            init(options.params);
        }
    })

    const run = (runParams: Record<string, string>) => {
        init(runParams)
    }
    return { loading, data, run };
}

export default useRequest;