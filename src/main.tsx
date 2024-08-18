
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo.ts'

createRoot(document.getElementById('root')!).render(
  // 类似于useContext可以让请求的域名不再重复写了
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
