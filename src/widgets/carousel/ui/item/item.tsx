import { FC } from 'react';
import style from "./item.module.scss"
import clasnames from "classnames";

interface IProps {
    isActive: boolean
    title: string
    description: string
    name: string
    time: string[]
    img: string
}

const srvURL = import.meta.env.VITE_BASE_URL ?? "https://test.wpdataforum.ru/";

const ItemCarousel: FC<IProps> = ({isActive, title, name, description, time, img}) => {
    const imgUrl = new URL(img, srvURL).toString()
    return <div className={clasnames(style.item, {
        [style.active]: isActive
    })}>
        <div className={style.imgAndTime}>
            <img src={imgUrl} alt="." />
            <div className={style.time}>{time.map((text, index)=>{
                return index % 2 ? ` - ${text}` : text
            })}</div>
        </div>
        <div className={style.info}>
            <div className={style.title}>{title}</div>
            <div className={style.name}>{name}</div>
            <div className={style.description}>{description}</div>
        </div>
    </div>;
};

export default ItemCarousel;