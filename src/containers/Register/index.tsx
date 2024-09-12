import {
    Form,
    Input,
    Button,
    Space,
  } from 'antd-mobile'
import { Link, useNavigate } from 'react-router-dom';
import style from './index.module.less'
import { useMutation } from '@apollo/client';
import { STUDENT_REGISTER } from '@/graphql/user';
import md5 from 'md5';
import {showSuccess, showFail} from '@/utils/index'
/**
*   注册
*/

interface IValue{
    password: string;
    account: string;
}

const Register = () => {
    const [form] = Form.useForm();
    const nav = useNavigate();
    // 参数1执行突变，参数2选项如error loading data
    const [register] = useMutation(STUDENT_REGISTER);
    const onRegisterHandler = async (values: IValue) => {
        const res = await register({
            variables: {
                password: md5(values.password),
                account: values.account
            }
        })
        if (res.data.studentRegister.code === 200) {
            // 注册成功后，返回登录页面
            showSuccess(res.data.studentRegister.message);
            nav('/login');
            return
        }
        const data = res.data.studentRegister;
        showFail(data);
    }
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img src="https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png" alt="" />
            </div>
            <Form
                layout='horizontal'
                onFinish={onRegisterHandler}
                form={form}
                footer={
                <Button block type='submit' color='primary' size='large'>
                    注册
                </Button>
                }
            >
                <Form.Item
                rules={[{
                    required: true,
                    message: '用户名不能为空',
                }, {
                    pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
                    message: '有且只能包含小写字母和数字，长度大于 6，小于 10',
                }]}
                label="用户名"
                name="account"
                >
                <Input placeholder="请输入用户名" clearable />
                </Form.Item>
                <Form.Item
                    label="输入密码"
                    name="password"
                    rules={[{
                        required: true,
                        message: '密码不能为空',
                    },{
                        pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
                        message: '有且只能包含小写字母和数字，长度大于 6',
                    }]}
                >
                <Input
                    placeholder="请输入密码"
                    clearable
                    type="password"
                />
                </Form.Item>
                <Form.Item
                    rules={[{
                    required: true,
                    message: '密码不能为空',
                }, {
                    pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
                    message: '有且只能包含小写字母和数字，长度大于 6',
                }, {
                    validator: (_, value) => {
                    const password = form.getFieldValue('password');
                    if (password === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject();
                    },
                    message: '两次输入的密码需要一致',
                }]}
                label="确认密码"
                name="passwordConfirm">
                <Input
                    placeholder="请再次输入密码"
                    clearable
                    type="password"
                />
                </Form.Item>
            </Form>
            <div>
                <Space>
                有账号？去
                <Link to="/login">登录</Link>
                </Space>
            </div>
        </div>
    );
};

export default Register;
