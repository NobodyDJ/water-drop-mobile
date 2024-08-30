import { Button, Form, Input } from 'antd-mobile';


/**
*
*/
const Register = () => {
    // const onFinish = (values: any) => {
    //     console.log('提交操作')
    // }
    return(<>
        <Form
        layout='horizontal'
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>水平布局表单</Form.Header>
        <Form.Item
          name='name'
          label='姓名'
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item name='address' label='地址' help='详情地址'>
          
        </Form.Item>
        <Form.Item name='amount' label='数量' childElementPosition='right'>
        </Form.Item>
        <Form.Item
          name='delivery'
          label='送货上门'
          childElementPosition='right'
        >
        </Form.Item>
      </Form>
    </>)
};

export default Register;
