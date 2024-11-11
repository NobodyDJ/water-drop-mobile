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
        // renderHook()用于测试需要在组件上运行的hooks
        const { result } = renderHook(() => useRequest(service, {}));
        await waitFor(() => { }); // 异步等待函数
        // 断言
        expect(result.current.data).toBe(true);
    })

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