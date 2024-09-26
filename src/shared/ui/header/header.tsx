import { FC } from 'react';

import style from "./header.module.scss"
import logoSvg from "./images/logo.svg"

const Header: FC = () => {
    return <div className={style.header}>
        <div className="container">
            <div className={style.logo}>
                <img src={logoSvg} alt="logo" />
            </div>
        </div>
    </div>;
};

export default Header;