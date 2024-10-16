import { useProductTypes } from '@/services/products';
import { SpinLoading, Tabs } from 'antd-mobile';
import style from './index.module.less';

interface IProps {
  onChange: (key: string) => void;
}

/**
* 分类选择器
*/
const TypeSelect = ({
  onChange,
}: IProps) => {
  const { data, loading } = useProductTypes();
  if (loading && data.length === 0) {
    return <SpinLoading />;
  }
  return (
    <Tabs
      className={style.tabs}
      onChange={onChange}
      defaultActiveKey={
      data[0].key
    }
    >
      {data.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      ))}
    </Tabs>
  );
};

export default TypeSelect;