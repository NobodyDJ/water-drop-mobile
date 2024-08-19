import './App.css'
import { useQuery, useMutation } from '@apollo/client'
import { FIND, UPDATE } from './graphql/demo'
// import React, { useState } from 'react'
import { Button, Form, Input } from 'antd-mobile';
import { useEffect } from 'react';

interface IValue {
  name?: string;
  desc?: string;
}

function App() {

  const { loading, data } = useQuery(FIND, {
    variables: {
      id: '16196544-9921-4514-9c12-b3f3d163289b'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      'dark'
    )
  }, [])

  // 更新
  const [update] = useMutation(UPDATE);

  // 发送更新请求
  const onClickHandler = (v: IValue) => {
    update({
      variables: {
        id: '16196544-9921-4514-9c12-b3f3d163289b',
        params: {
          ...v
        }
      }
    })
  }
  return (
    <>
      <p>
        data:
        { JSON.stringify(data) }
      </p>
      <p>
        loading:
        { `${loading}` }
      </p>
      <Form
        layout="horizontal"
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        )}
      >
        <Form.Item name="name" label="姓名">
          <Input/>
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input/>
        </Form.Item>
      </Form>
    </>
  )
}

export default App
