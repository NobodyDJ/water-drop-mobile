import { useProductsByOrgId } from '@/services/product';
import { Result } from 'antd-mobile';
import style from './index.module.less';

interface IProps {
  orgId: string;
}

/**
* 门店推荐的课程，只显示最多 5 条
*/
const RecommendProducts = ({
  orgId,
}: IProps) => {
  const data = useProductsByOrgId(orgId);
  if (!data) {
    return <Result status="warning" title="提示" description="没有推荐的课程" />;
  }
  return (
    <div className={style.container}>
      {
        data.map((item) => (<div>{item.name}</div>))
      }
    </div>
  );
};

export default RecommendProducts;