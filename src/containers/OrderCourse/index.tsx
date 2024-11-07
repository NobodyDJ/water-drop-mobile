import style from './index.module.less';
import { useCanSubscribeCourses } from '@/services/schedule';
import { DotLoading, Popup, Result, Space, Steps } from 'antd-mobile';
import { Step } from 'antd-mobile/es/components/steps/step';
import CourseList from './components/CourseList';
import { useState } from 'react';
import SubscribePopup from './components/SubscribePopup';

/**
*   预约课程
*/
const OrderCourse = () => {
    const [curCourse, setCurCourse] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const { data, loading } = useCanSubscribeCourses();
    const onSubscribeHandler = (id: string) => {
      setCurCourse(id);
      setShowPopup(true);
    };
    if (loading) {
        return (
            <Space justify="center">
                <DotLoading color="primary" />
            </Space>
        )
    }
    if (!data || data.length === 0) {
        return (
            <Result
                status='warning'
                title="没有可以约的课程"
            />
        )
    }
    return (
        <div className={style.container}>
            <Steps
                direction="vertical"
            >
                {
                    data.map((item) => (
                        <Step
                            title={item.name}
                            key={item.id}
                            description={
                                item.courses ? (<CourseList dataSource={item.courses} onSubscribe={onSubscribeHandler}/>) : null
                            }
                            icon={(
                                <img
                                    className={style.logo}
                                    src={item.logo}
                                    alt="门店logo"
                                />
                            )}
                        />
                    ))
                }
            </Steps>
            <Popup
                visible={showPopup}
                position="bottom"
                onMaskClick={() => {
                  setShowPopup(false);
                }}
                onClose={() => {
                  setShowPopup(false);
                }}
            >
                <SubscribePopup courseId={curCourse} />
            </Popup>
        </div>
    );
};

export default OrderCourse;
