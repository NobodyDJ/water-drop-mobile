import { IProduct } from '@/utils/types';
import { Grid } from 'antd-mobile';
import { PhoneFill } from 'antd-mobile-icons';
import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';

interface IProps {
  data: IProduct
}
/**
*  购买课程工具bar
*/
const BuyBottom = ({
  data,
}: IProps) => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  const goBuy = () => {
    go(ROUTE_KEY.BUY, {
      id: data.id,
    });
  };
  return (
    <Grid columns={10} className={style.container}>
      <Grid.Item span={4}>
        <span className={style.preferentialPrice}>
          ￥
          {data.preferentialPrice}
        </span>
        <span className={style.originalPrice}>
          ￥
          {data.originalPrice}
        </span>
      </Grid.Item>
      <Grid.Item span={2}>
        <a href={`tel:${store.tel}`}>
          <PhoneFill className={style.tel} />
        </a>
      </Grid.Item>
      <Grid.Item
        span={4}
        className={style.buyButton}
        onClick={goBuy}
      >
        立即抢购
      </Grid.Item>
    </Grid>
  );
};

export default BuyBottom;