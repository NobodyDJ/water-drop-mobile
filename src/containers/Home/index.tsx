import style from './index.module.less';
import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

/**
*
*/
const Home = () => {
    const nav = useNavigate();
    return (
        <div className={style.container}>
            <Button onClick={() => {
                nav('/my');
            }}
            >
                去编辑个人信息
            </Button>
        </div>
    );
};

export default Home;
