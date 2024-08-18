import { useEffect, useRef } from 'react';
import useLatest from './useLatest';
/**
 * @param fn
 */

const useUnmount = (fn: () => void) => {
    const fnRef = useLatest(fn);
    useEffect(() => () => fnRef.current(), []);
}

export default useUnmount;