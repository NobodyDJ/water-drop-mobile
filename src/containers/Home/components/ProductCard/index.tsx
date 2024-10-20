import { useState, useEffect } from 'react';

import { Image } from 'antd-mobile';
import { IProduct } from '@/utils/types';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

/**
* 商品卡片
*/
const ProductCard = ({
  data,
}: IProps) => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return (
    <div className={style.container}>
      <Image
        src={data.coverUrl}
        className={style.img}
      />
      <div className={style.info}>
        <div className={style.name}>
          {data.name}
        </div>
        <div className={style.org}>
          <span className={style.orgName}>
            {data.org.name}
          </span>
          <span className={style.distance}>
            {data.distance || '未知'}
          </span>
        </div>
        <div className={style.price}>
          <span className={style.preferentialPrice}>
            ¥
            {data.preferentialPrice}
          </span>
          <span className={style.originalPrice}>
            ¥
            {data.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;