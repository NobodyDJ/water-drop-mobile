import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Toast } from 'antd-mobile';

// 服务器地址部署区域
// let uri = `http://${window.location.hostname}:3000/graphql`;
let uri = '/graphql'
if (process.env.NODE_ENV === 'production') {
  uri = ''; // 这里填写相关线上地址 
}

const httpLink = createHttpLink({
    uri,
});

const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    Toast.show({
      content: '请求参数或者返回的数据格式不对',
    });
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        Toast.clear();
        Toast.show({
          content: '登录失效，请登录',
        });
      }
    });
  }
  if (networkError) {
    Toast.clear();
    Toast.show({
      content: networkError.message,
    });
  }
});


// 每次请求时候携带token信息
const authLink = setContext((_, { headers }) => {
    // 发送请求之前添加Authorization属性
    // 获取到的token中携带用户的id信息
    const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache', // 非缓存协议
    }
  },
  cache: new InMemoryCache({
    addTypename: false,
  }), // 缓存查询结果
})