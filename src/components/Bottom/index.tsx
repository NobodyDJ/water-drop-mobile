import { useState, useEffect } from 'react';

import style from './index.module.less';
import { TabBar } from 'antd-mobile';
import { routes } from '@/routes/menus';
import { useGoTo, useMatchedRoute } from '@/hooks';
import SvgWrapper from '../SvgWrapper';

/**
*   底部导航栏
*/
const Bottom = () => {
    const [state, setState] = useState();
    const { go } = useGoTo();
    const route = useMatchedRoute();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    // 当地底部导航栏发生变化时
    const onTabChangeHandler = (key: string) => {
        console.log('key', key);
        go(key);
    };
    // iconRender
    const iconRender = (active: boolean, iconUrl?: string) => {
        return <SvgWrapper
                    src={iconUrl}
                    color={active ? '#01979a' : '#999999'}
                />
    }
     // 只有有菜单标记的页面需要底部的菜单选择器
    if (!route?.isMenu) {
        return null;
    }
    return (
        <div className={style.container}>
            <TabBar
                onChange={onTabChangeHandler}
                activeKey={route?.key}
            >
                {
                    routes.filter((it) => it.isMenu).map(
                        (item) => <TabBar.Item
                            key={item.key}
                            title={item.name}
                            icon={(active)=>iconRender(active, item.icon)}
                        />,
                    )
                }
            </TabBar>
        </div>
    );
};

export default Bottom;
