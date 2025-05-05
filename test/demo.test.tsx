import Bottom from "@/components/Bottom";
import useRequest from "@/hooks/useRequest";
import { getWeekZh } from "@/utils";
import {act, fireEvent, render, renderHook, waitFor} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

describe('测试', () => {
    it('utils 测试', () => {
        const res = getWeekZh('Monday');
        expect(res).toBe('周一');
    })

    it('hooks 测试', async () => {
        const service = () => new Promise((r) => {
            r(true)
        });
        // renderHook()用于测试需要在组件上运行的hooks，相当于给useRequest这个hook提供了组件上下文的运营环境
        const { result } = renderHook(() => useRequest(service, {}));
        await waitFor(() => { }); // 异步等待函数
        // 断言，这里的current相当于指向ref组件
        expect(result.current.data).toBe(true);
    })

    // MemoryRouter用于解决useLocation不在router环境下报错的问题
    it('组件测试', async () => {
        const { getByText } = render(
            <MemoryRouter>
                <Bottom></Bottom>
            </MemoryRouter>
        );

        const myDom = getByText('我的');

        // 如果需要等待 state 的变化，请包 act 函数
        act(() => {
          fireEvent.click(myDom);
        });

        // 断言
        expect(myDom.parentElement?.className).toContain('adm-tab-bar-item-active');
    })
})