import { useState, useEffect } from 'react';

import style from './index.module.less';
import { ICardRecord } from '@/utils/types';
import { Space, Tag } from 'antd-mobile';
import { CARD_TYPE, DAY_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';

interface IProps{
    dataSource: ICardRecord;
}

/**
*   消费卡的展示
*/
const ConsumeCard = ({
    dataSource
}: IProps) => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (
        <div className={style.container}>
            <Space>
                <span>
                    {
                        dataSource.card.type === CARD_TYPE.TIME[0] &&
                        (
                            <Tag
                                color='primary'
                                fill='outline'
                            >
                                {CARD_TYPE.TIME[1]}
                            </Tag>
                        )
                    }
                    {
                        dataSource.card.type === CARD_TYPE.DURATION[0] && 
                        (
                            <Tag
                                color="warning"
                                fill="outline"
                            >
                                {CARD_TYPE.DURATION[1]}
                            </Tag>
                        )
                    }
                    <span className={style.name}>
                        {dataSource.card.name}
                    </span>
                </span>
                <span>
                  有效期至：
                  {dayjs(dataSource.endTime).format(DAY_FORMAT)}
                </span>
            </Space>
            {dataSource.card.type === CARD_TYPE.TIME[0] && (
                <Space justify="between" block className={style.residueTime}>
                    <span>
                        剩余
                        {dataSource.residueTime}
                        次
                    </span>
                </Space>
            )}
        </div>
    );
};

export default ConsumeCard;
