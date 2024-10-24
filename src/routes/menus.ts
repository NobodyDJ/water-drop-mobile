import mySvg from '@/assets/my.svg';
import courseSvg from '@/assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: string;
  hideInMenu?: boolean;
  isMenu?: boolean;
  hideHeader?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG_INFO: 'OrgInfo',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '',
    name: '精品课程',
    icon: courseSvg,
    isMenu: true,
    hideHeader: false
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    icon: mySvg,
    isMenu: true,
    hideHeader: false
  },
  [ROUTE_KEY.ORG_INFO]: {
    path: 'orgInfo/:id',
    name: '门店详情',
    isMenu: false,
  }
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];