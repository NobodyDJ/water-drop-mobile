import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/services/product';
import { TCourse } from '@/utils/types';
import { useMemo } from 'react';
import Hr from '@/components/Hr';
import { Result } from 'antd-mobile';
import style from './index.module.less';
import BaseInfo from './components/BaseInfo';
import CourseInfo from './components/CourseInfo';
import BuyBottom from './components/BuyBottom';

/**
* 商品详情
*/
const ProductInfo = () => {
  const { id } = useParams();
  const { data } = useProductInfo(id || '');
  const courses = useMemo(() => {
    const cs: Record<string, TCourse> = {}; // 这里很重要的知识点的运用，哈希表，一个课程id对应多个消费卡
    data?.cards?.forEach((item) => {
      cs[item.course.id] = {
        ...item.course,
        cardName: cs[item.course.id] ? (`${cs[item.course.id].cardName} / ${item.name}`) : item.name, // 这里是将同一节课对应的所有消费卡，保存到一起，用'/'符号分割
      };
    });
    return Object.values(cs);
  }, [data?.cards]);

  if (!data) {
    return (
      <Result
        status="warning"
        title="提示"
        description="没有该商品信息"
      />
    );
  }
  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <CourseInfo data={courses} />
      <BuyBottom data={data} />
    </div>
  );
};

export default ProductInfo;