/* eslint-disable @typescript-eslint/no-explicit-any */
// 构造一个外层包裹的公共组件，实现每次加载内部子组件时，获取用户信息
// 有定难度 参考第八章8-11~8-14
import { createContext, useContext, useMemo, useState } from "react";
import { IPropChild, IStore } from "./types";

const cxtCache: Record<string, Cxt> = {};

const getCxtProvider = (
    key: string,
    defaultValue: Record<string, any>,
    AppContext: React.Context<IStore>,
) => ({children}: IPropChild) => {
    const [store, setStore] = useState(defaultValue);
    const value = useMemo(() => ({
        key, store, setStore
    }), [store])
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

class Cxt{
    defaultStore: IStore;
    AppContext: React.Context<IStore>;
    Provider: ({ children }: IPropChild) => JSX.Element;
    constructor(key: string, defaultValue: Record<string, any>) {
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: ()=>{},
        }
        // 将全局变量存储在AppContext中
        this.AppContext = createContext(this.defaultStore);
        this.Provider = getCxtProvider(key, defaultValue, this.AppContext);
        cxtCache[key] = this;
    }
}

// 封装了获取具体全局变量的hooks
export const useAppContext = (key: string)=> {
    const cxt = cxtCache[key];
    // useContext返回的数据结构为{ key, store, setStore }
    // 因为AppContext.Provider组件提供的value包含这些值
    const app = useContext(cxt.AppContext);
    return {
        store: app.store,
        setStore: app.setStore
    }
}

// 返回具体子组件
export const connectFactory = (
    key: string,
    defaultValue: Record<string, any>
) => {
    const cxt = cxtCache[key];
    let CurCxt: Cxt;
    if (cxt) {
        CurCxt = cxt;
    } else {
        CurCxt = new Cxt(key, defaultValue);
    }
    // 注意这里需要返回React.ReactNode的数据格式
    return (Child: React.FunctionComponent<any>) => (props: any)=>(
        <CurCxt.Provider>
            <Child {...props} />
        </CurCxt.Provider>
    )
}