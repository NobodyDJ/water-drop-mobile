import { useParams } from 'react-router-dom';
import style from './index.module.less';
import { Result } from 'antd-mobile';
import { useOrganization } from '@/services/org';
import BaseInfo from './components/BaseInfo';

/**
*   门店详情页面
*/
const OrgInfo = () => {
    const { id } = useParams();
    const { data } = useOrganization(id || '');
    if (!data) {
        return <Result status="warning" title="提示" description="没有该门店信息" />;
    }

    return (
        <div className={style.container}>
            <BaseInfo data={ data } />
        </div>
    );
};

export default OrgInfo;
