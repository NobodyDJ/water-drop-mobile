import { IPropChild } from '@/utils/types';
import { connect, useGetStudent } from '@/hooks/userHooks';
import { DotLoading } from 'antd-mobile';

/**
*   获取用户信息组件
*/
const StudentInfo = ({ children }: IPropChild) => {
    const { loading } = useGetStudent();
    return (
        loading ?
            <DotLoading /> :
            <div>
                {children}
            </div>
    );
};

const ConnectedStudentInfo = connect(StudentInfo);

export default ConnectedStudentInfo;