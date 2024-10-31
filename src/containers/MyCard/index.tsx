import { useState, useEffect } from 'react';

import style from './index.module.less';
import { useCards } from '@/services/card';
import CardItem from './components/CardItem';

/**
*   我的消费卡
*/
const MyCard = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    const { data } = useCards();
    return (
        <div className={style.container}>
            {
                data?.map((item)=><CardItem key={item.id} data={item}></CardItem>)
            }
        </div>
    );
};

export default MyCard;
