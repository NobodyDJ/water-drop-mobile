 
import { useState, useMemo } from 'react';

import style from './index.module.less';
import { Button, Divider, Selector, Tabs, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import { getWeekZh } from '@/utils';
import { useUseCards } from '@/services/card';
import { useSchedulesByCourse, useSubscribeCourse } from '@/services/schedule';
import ConsumeCard from '../ConsumeCard';

interface IProps{
    courseId: string;
    onClose: () => void;
}

/**
*   预约课程弹窗
*   可以选择课程表和消费卡
*/
const SubscribePopup = ({ 
    courseId,
    onClose,
}: IProps) => {
    const { data } = useSchedulesByCourse(courseId); // 获取课程的安排
    const { data: cards } = useUseCards(courseId); // 获取该课程下的消费卡
    const [selectSchedule, setSelectSchedule] = useState<string[]>([]);
    const [selectCard, setSelectCard] = useState<string[]>([]);
    const { subscribe, loading } = useSubscribeCourse();
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
    // 处理预约课程
    const subscribeHandler = async () => {
        if (selectSchedule.length === 0 || selectCard.length === 0) {
            Toast.show({
                content: '请选择对应的上课时间和消费卡',
            });
            return;
        }
        const res = await subscribe(selectSchedule[0], selectCard[0]);
        if (res?.code === 200) {
            Toast.show({
                content: res.message,
            });
            onClose();
            return;
        }
        Toast.show({
            content: res?.message,
        });
    };
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
              loading={loading}
              className={style.button}
              onClick={subscribeHandler}
            >
              立即预约
            </Button>
        </div>
    );
};

export default SubscribePopup;
