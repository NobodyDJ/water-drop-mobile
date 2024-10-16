import styles from './index.module.less';
import { Outlet } from 'react-router-dom';
import Bottom from '../Bottom';
import Header from '../Header';

/**
*
*/
const Layout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <Outlet />
            <Bottom />
        </div>
    );
};

export default Layout;
