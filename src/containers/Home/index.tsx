import style from './index.module.less';
import { SearchBar } from 'antd-mobile';
import TypeSelect from './components/TypeSelect';

/**
*   首页
*/
const Home = () => {
    const onSearchHandler = () => {

    };
    
    const onTypeChangeHandler = (key: string) => {
        console.log('key', key);
    };
    
    return (
        <div className={style.container}>
            <SearchBar
                placeholder="搜索课程试试"
                onSearch={onSearchHandler}
            />
            <TypeSelect onChange={onTypeChangeHandler} />
        </div>
    );
};

export default Home;
