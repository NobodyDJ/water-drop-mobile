import Login from "@/containers/Login";
import Register from "@/containers/Register";

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
    }
]