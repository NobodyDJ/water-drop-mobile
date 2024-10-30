import { useState, useEffect } from 'react';

import style from './index.module.less';

/**
*   预约课程
*/
const OrderCourse = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (<div className={style.container}>sss</div>);
};

export default OrderCourse;
