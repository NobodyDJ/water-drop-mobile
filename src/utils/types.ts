/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPropChild{
    children: React.ReactNode
}

export interface IStudent {
    id: string;
    tel: string;
    name: string;
    desc: string;
    avatar: string;
    refetchHandler?: () => void;
    currentOrg?: string;
}

export interface IStore{
    key: string;
    store: Record<string, any>;
    setStore: (payload: Record<string, any>) => void;
}