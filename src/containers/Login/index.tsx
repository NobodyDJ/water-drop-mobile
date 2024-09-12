import {
    Form,
    Input,
    Button,
    Space,
  } from 'antd-mobile'
import style from './index.module.less';
import { Link, useNavigate } from 'react-router-dom';
import { STUDENT_LOGIN } from '@/graphql/user';
import { useMutation } from '@apollo/client';
import md5 from 'md5';
import { showFail, showSuccess } from '@/utils';
import { AUTH_TOKEN } from '@/utils/contansts';

/**
*   登录
*/

interface IValue {
    password: string;
    account: string;
}

const Login = () => {
    const [form] = Form.useForm();
    // 参数1执行突变，参数2选项如error loading data
    const [login, { loading }] = useMutation(STUDENT_LOGIN);
    const nav = useNavigate();
    const loginHandler = async (values: IValue) => {
        const res = await login({
            variables: {
                password: md5(values.password),
                account: values.account,
            }
        })
        if (res.data.studentLogin.code === 200) {
            showSuccess(res.data.studentLogin.message);
            localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
            nav('/');
            return;
          }
          const data = res.data.studentLogin;
          showFail(data);
    }
    return (
        <div className={style.container}>
            <div className={style.logo}>
                <img src="https://water-drop-assets-dj.oss-cn-shanghai.aliyuncs.com/images/henglogo%403x.png" alt="" />
            </div>
            <Form
                layout='horizontal'
                onFinish={loginHandler}
                form={form}
                footer={
                <Button loading={loading} block type='submit' color='primary' size='large'>
                    登录
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
            </Form>
            <div>
                <Space>
                没有账号？去
                <Link to="/register">注册</Link>
                </Space>
            </div>
        </div>
    );
};

export default Login;
