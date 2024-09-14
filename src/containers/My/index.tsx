import { useUploadOSS } from '@/hooks/useUpload';
import { Button, Form, ImageUploader, Input} from 'antd-mobile';
import style from './index.module.less'
import { COMMIT_STUDENT_INFO } from '@/graphql/user';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useUserContext } from '@/hooks/userHooks';
import { IStudent } from '@/utils/types';
import { showFail, showSuccess } from '@/utils';
/**
*
*/
const My = () => {
    const [form] = Form.useForm()
    const uploadHandler = useUploadOSS();
    const { store } = useUserContext();
    const [commit] = useMutation(COMMIT_STUDENT_INFO);
    useEffect(() => {
        if (!store.tel) return;
        form.setFieldsValue({
            tel: store.tel,
            name: store.name,
            desc: store.desc,
            avatar: [{
                url: store.avatar,
            }],
        });
    }, [store]);

    // 自定义手机号校验规则
    const validatePhoneNumber = (_: unknown, value: string) => {
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!value) {
            return Promise.reject(new Error('电话不能为空'));
        }
        if (!phoneRegex.test(value)) {
            return Promise.reject(new Error('请输入有效的中国大陆手机号码'));
        }
        return Promise.resolve();
    };

    const onClickHandler = async (values: IStudent & { avatar: [{ url: string }] }) => {
        const res = await commit(
            {
                variables: {
                    params: {
                        ...values,
                        avatar: values.avatar[0]?.url,
                    },
                },
            },
        );
        if (res.data.commitStudentInfo.code === 200) {
            store.refetchHandler();
            showSuccess(res.data.commitStudentInfo.message);
            return;
        }
           showFail(res.data.commitStudentInfo.message);
    }

    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img src="https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png" alt="" />
            </div>
            <Form
                form={form}
                layout='horizontal'
                className={style.formPadding}
                onFinish={onClickHandler}
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Header>请提交个人信息，都是必填的</Form.Header>
                <Form.Item
                    name='name'
                    label='昵称'
                    className={style['am-form-item']}
                    rules={[{ required: true, message: '昵称不能为空' }]}
                >
                    <Input placeholder='请输入昵称' />
                </Form.Item>
                <Form.Item
                    name='tel'
                    label='电话'
                    className={style['am-form-item']}
                    rules={[
                        { required: true, message: '电话不能为空' },
                        { validator: validatePhoneNumber }, // 手机号码校验
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='avatar'
                    label='头像'
                    className={style['am-form-item']}
                    rules={[{ required: true }]}
                >
                    <ImageUploader
                        maxCount={1}
                        upload={uploadHandler}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default My;
