import Home from '@/containers/Home';
import My from '@/containers/My';
import { ROUTE_KEY } from './menus';
import OrgInfo from '@/containers/OrgInfo';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG_INFO]: OrgInfo
};