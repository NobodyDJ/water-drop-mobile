/* eslint-disable @typescript-eslint/no-explicit-any */

type TBaseQuery<T> = { [key: string]: { __typename?: 'Query', data: T, page: IPage } };
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
    openid?: string
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

// IOrganization中的所有属性均是可选属性
// type开头的一律用T开头
export type TBaseOrganization = Partial<IOrganization>;

// __typename?: 'Query'：可选字段，表示类型名为 'Query'。这是 GraphQL 查询中特有的类型标识符，用来明确查询返回的类型。
export type TOrgsQuery = TBaseQuery<IOrganization[]>

export type TOrgQuery = TBaseQuery<IOrganization>;

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
  cards?: ICard[];
}

export type TProductTypeQuery = TBaseQuery<IProductType[]>;
export type TProductsQuery = TBaseQuery<IProduct[]>;
export type TProductQuery = TBaseQuery<IProduct>;
/**
 * 课程类型
 */
export interface ICourse {
  id: string;
  name: string; // 标题
  desc?: string;
  group?: string; // 适龄人群
  baseAbility?: string;
  limitNumber: number; // 限制人数
  duration: number; // 持续时长
  reserveInfo?: string;
  refundInfo?: string;
  otherInfo?: string;
}

/**
 * 消费卡
 */
export interface ICard {
  id: string;
  name: string;
  type: string;
  time: number;
  validityDay: number;
  course: ICourse;
}

export type TCourse = ICourse & { cardName: string };

export interface IWxConfig {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

export type TWxConfigQuery = TBaseQuery<IWxConfig>;

/**
 * 个人消费卡
 */
export interface ICardRecord {
  id: string;
  startTime: string;
  endTime: string;
  buyTime: string;
  residueTime: number; // 剩余次数
  status: string;
  card:ICard;
  org: IOrganization;
}

export type TCardRecordsQuery = TBaseQuery<ICardRecord[]>;