import { FC } from "react"
import style from "./arrows.module.scss"
import classnames from "classnames"

interface IProps {
    onClick?: () => void;
}

export const LeftArrow: FC<IProps> = ({onClick}) => {

    return (
        <button className={classnames(style.arrow, style.left)} onClick={onClick}></button>
    )
}

export const RightArrow: FC<IProps> = ({onClick}) => {
    return (
        <button className={classnames(style.arrow, style.right)} onClick={onClick}></button>
    )
}