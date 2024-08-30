
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './theme.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo.ts'
import { ConfigProvider } from "antd-mobile";
import zhCN from 'antd-mobile/es/locales/zh-CN'

createRoot(document.getElementById('root')!).render(
  // 类似于useContext可以让请求的域名不再重复写了
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ConfigProvider>
)
