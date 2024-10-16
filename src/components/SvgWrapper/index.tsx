import style from './index.module.less';
import { ReactSVG } from 'react-svg';

interface IProps{
    src?: string;
    height?: string;
    width?: string;
    color?: string;
}

/**
*   svg组件
*/
const SvgWrapper = ({
    src,
    height = '25',
    width = '25',
    color,
}: IProps) => {
    const beforeInjectionHandler = (svg: SVGSVGElement) => {
        svg.setAttribute('style', `height: ${height};width:${width}`);
        svg.childNodes.forEach((item) => {
            const it = item as HTMLElement;
            if (it.tagName === 'path' && color) {
                it.setAttribute('fill', color);
            }
        });
    };

    if (!src) {
        return null
    }

    return (
        <div className={style.container}>
            <ReactSVG
                src={src}
                wrapper="span"
                beforeInjection={beforeInjectionHandler}
            />
        </div>);
};

export default SvgWrapper;
