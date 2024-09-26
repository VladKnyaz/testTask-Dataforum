import { FC, useContext, useEffect, useRef } from 'react';
import style from "./carousel.module.scss"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemCarousel from './ui/item/item';
import { EventContext } from '../../shared/contexts/eventContext';
import { socket } from '../../shared/socket/socket';
import { LeftArrow, RightArrow } from './ui/arrows';


const CarouselWidget: FC = () => {
    const carouselRef = useRef<Carousel | null>(null)
    const eventData = useContext(EventContext)  
    
    useEffect(()=>{
        if (!eventData.valueEventForum) return;
        const activeIndex = eventData.valueEventForum.schedule.findIndex((item)=>item.is_active) || 0;
        if (activeIndex < 0) return;
        
        if (carouselRef.current?.state.currentSlide === activeIndex) return;

        setTimeout(() => {
            if (eventData.valueEventForum.schedule[activeIndex].id == eventData.    valueEventForum.schedule.at(-1)?.id) {
                return carouselRef.current?.next(activeIndex)
            }
            return carouselRef.current?.goToSlide(activeIndex)
            
        }, 900);

       
    }, [carouselRef.current, eventData.valueEventForum])


    return <div className={style.carousel}>
        
        {eventData?.valueEventForum.schedule && eventData.valueEventForum.schedule.length > 0 && <Carousel
            ref={carouselRef}
            arrows
            customLeftArrow={<LeftArrow/>}
            customRightArrow={<RightArrow/>}
            containerClass={style.carousel__container}
            dotListClass=""
            draggable
            focusOnSelect={false}
            itemClass=""
            keyBoardControl
            autoPlay={false}
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 2.5,
                partialVisibilityGutter: 1
                },
                mobile: {
                breakpoint: {
                    max: 464,
                    min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
                },
                tablet: {
                breakpoint: {
                    max: 1024,
                    min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass={style.inner}
            slidesToSlide={1}
            swipeable
            
        >
            {eventData && eventData.valueEventForum.schedule.map((item, index)=>{
                return <ItemCarousel img={item.item.img} time={item.timerange} name={item.item.subtitle} description={item.item.text} title={item.item.title}  key={item.id} isActive={item.is_active}/>
            })}

        </Carousel>}

    </div>;
    
};

export default CarouselWidget;

