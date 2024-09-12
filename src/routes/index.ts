import Login from "@/containers/Login";
import Home from "@/containers/Home";
import Register from "@/containers/Register";
import My from "@/containers/My";

export const ROUTE_CONFIG = [
    {
        key: 'register',
        path: '/register',
        element: Register,
        title: '注册'
    },
    {
        key: 'login',
        path: '/login',
        element: Login,
        title: '登录'
    },
    {
        key: 'Home',
        path: '/',
        element: Home,
        title: '首页'
    },
    {
        key: 'My',
        path: '/my',
        element: My,
        title: '个人中心'
    }
]