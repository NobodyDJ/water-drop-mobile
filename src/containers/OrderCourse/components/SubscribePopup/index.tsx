/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo } from 'react';

import style from './index.module.less';
import { Button, Divider, Selector, Tabs } from 'antd-mobile';
import dayjs from 'dayjs';
import { getWeekZh } from '@/utils';
import { useUseCards } from '@/services/card';
import { useSchedulesByCourse } from '@/services/schedule';
import ConsumeCard from '../ConsumeCard';

interface IProps{
    courseId: string
}

/**
*   预约课程弹窗
*   可以选择课程表和消费卡
*/
const SubscribePopup = ({ 
    courseId
}: IProps) => {
    const { data } = useSchedulesByCourse(courseId); // 获取课程的安排
    const { data: cards } = useUseCards(courseId); // 获取该课程下的消费卡
    const [selectSchedule, setSelectSchedule] = useState<string[]>([]);
    const [selectCard, setSelectCard] = useState<string[]>([]);
    // 未来可选的七天课程安排
    const weeks = useMemo(() => {
        const w = [];
        for (let i = 1; i < 8; i++) {
            const day = dayjs().add(i, 'day');
            const week = getWeekZh(day.format('dddd'));
            const times = data?.filter((item) => day.isSame(item.schoolDay, 'day'));
            const orderTimes = times?.map((time) => ({
                label: `${time.startTime.slice(0, 5)}-${time.endTime.slice(0, 5)}`,
                value: time.id,
            }));
            w.push({
                weekLabel: week,
                weekValue: day.format('dddd'),
                orderTimes
            })
        }
        return w;
    }, [data]);
    // 可使用的消费卡
    const newCards = useMemo(() => cards?.map((item) => ({
      label: <ConsumeCard dataSource={item} />,
      value: item.id,
    })), [cards]);
    return (
        <div className={style.container}>
            <Divider>请选择预约时间</Divider>
            {/* 此处是一个tab切换区域 */}
            <Tabs>
            {weeks.map((week) => (
                <Tabs.Tab title={week.weekLabel} key={week.weekValue}>
                    <Selector
                        columns={3}
                        options={week.orderTimes || []}
                        onChange={(arr) => setSelectSchedule(arr)}
                    />
                </Tabs.Tab>
                ))}
            </Tabs>
            <Divider>请选择消费卡</Divider>
            <Selector
              columns={1}
              onChange={(arr) => setSelectCard(arr)}
              options={newCards || []}
            />
            <Divider />
            <Button
              color="primary"
              className={style.button}
            >
              立即预约
            </Button>
        </div>
    );
};

export default SubscribePopup;
