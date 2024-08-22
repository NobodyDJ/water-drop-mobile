import { useQuery, useMutation } from '@apollo/client'
import { FIND, UPDATE } from './graphql/demo'
// import React, { useState } from 'react'
import { Button, Form, ImageUploader, Input } from 'antd-mobile';
import { useEffect } from 'react';
import { useUploadOSS } from './hooks/useUpload';
import styles from './App.module.less'
import classNames from 'classnames';

interface IValue {
  name?: string;
  desc?: string;
}

function App() {
  const uploadHandler =  useUploadOSS();
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
        className={styles.container}
        layout="horizontal"
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        )}
      >
        <Form.Item name="name" label="姓名" className={classNames(styles.formBorder, styles.formPadding)}>
          <Input/>
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input/>
        </Form.Item>
        <Form.Item name="avatar" label="头像">
        <ImageUploader upload={uploadHandler}/>
        </Form.Item>
      </Form>
    </>
  )
}

export default App
