import { GET_STUDENT_INFO } from "@/graphql/user";
import { connectFactory, useAppContext } from "@/utils/contextFactory";
import { IStudent } from "@/utils/types";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

const KEY = 'studentInfo';
const DEFAULT_VALUE = {

}

// 获取学生用户的信息
export const useUserContext = () => useAppContext(KEY);

// 获取具体子组件
export const connect = connectFactory(KEY, DEFAULT_VALUE);

// 获取学生信息
export const useGetStudent = () => {
    const { setStore } = useUserContext();
    const location = useLocation();
    const nav = useNavigate()
    const { loading, refetch } = useQuery<{ getStudentInfo: { data: IStudent }  }>(GET_STUDENT_INFO, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            console.log('data', data);
            if (data.getStudentInfo) {
                const { id, name, tel, desc, avatar } = data.getStudentInfo.data;
                setStore({
                    id, name, tel, desc, avatar, refetchHandler: refetch
                });
                // 确保登录之后，不再跳转到登录页面
                if (location.pathname.startsWith('/login')) {
                    nav('/');
                }
                return;
            }
            // 用户没有登录要返回登录界面
            // 防止token没有拿到后，页面重复刷新跳转登陆页面
            setStore({ refetchHandler: refetch });
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                nav(`/login?orgUrl=${window.location.pathname }`);
            }
        },
        onError: () => {
            setStore({ refetchHandler: refetch });
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                nav(`/login?orgUrl=${window.location.pathname}`);
            }
        }
    });
    return { loading };
}

