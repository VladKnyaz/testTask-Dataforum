import { FC } from 'react';
import style from "./home.module.scss"
import Stream from '../../widgets/stream/ui/stream';
import CarouselWidget from '../../widgets/carousel/carousel';

const Home: FC = () => {
    return <div className={style.home}>
        <Stream/>
        <CarouselWidget/>
    </div>;
};

export default Home;