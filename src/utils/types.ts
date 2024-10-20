/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IPage {
  pageNum: number;
  pageSize: number;
  total: number;
}


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

export interface IProductType {
  key: string;
  title: string;
}

export interface IImage {
  id: number;
  url: string;
  remark?: string;
}

/**
 * 门店
 */
export interface IOrganization {
  id: string;
  orgFrontImg?: IImage[];
  orgRoomImg?: IImage[];
  orgOtherImg?: IImage[];
  name: string;
  logo?: string;
  tags?: string;
  description?: string;
  address?: string;
  tel?: string;
  longitude?: string;
  latitude?: string;
}

/**
 * 商品类型
 */
export interface IProduct {
  id: string;
  limitBuyNumber: number;
  name: string;
  reason: string;
  coverUrl: string;
  bannerUrl: string;
  desc: string;
  originalPrice: number;
  stock: number;
  status: string;
  tags?: string;
  curStock: number;
  buyNumber?: number;
  preferentialPrice: number;
  displayType: string;
  distance?: string;
  org: IOrganization;
}
type TBaseQuery<T> = { [key: string]: { __typename?: 'Query', data: T, page: IPage } };
export type TProductTypeQuery = TBaseQuery<IProductType[]>;
export type TProductsQuery = TBaseQuery<IProduct[]>;