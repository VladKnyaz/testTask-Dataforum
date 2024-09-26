import { FC, useContext, useEffect, useRef, useState } from 'react';
import style from "./carousel.module.scss"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemCarousel from './ui/item/item';
import { EventContext } from '../../shared/contexts/eventContext';
import { socket } from '../../shared/socket/socket';


const CarouselWidget: FC = () => {
    const carouselRef = useRef<Carousel | null>(null)
    const eventData = useContext(EventContext)  
    const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

    // socket.on("current-event", (id: number) => {
        
    //     if (eventData?.valueEventForum.schedule[activeEventIndex].id == id) return;

    //     const activeIndex = eventData?.valueEventForum.schedule.findIndex((item)=>item.id == id) || 0;
    //     setActiveEventIndex(activeIndex)

    //     if (carouselRef.current?.state.currentSlide === activeIndex) return;
        
        
    //     setTimeout(() => {
    //         if (carouselRef.current?.state.currentSlide! > activeIndex) {
    //             return carouselRef.current?.goToSlide(activeIndex)
    //         }
    //         carouselRef.current?.next(activeIndex-1)
    //     }, 700);
    // });

    useEffect(()=>{
        if (!eventData) return;
        const activeIndex = eventData?.valueEventForum.schedule.findIndex((item)=>item.is_active) || 0;
        setActiveEventIndex(activeIndex);

        if (carouselRef.current?.state.currentSlide === activeIndex) return;

        setTimeout(() => {

            if (carouselRef.current?.state.currentSlide! > activeIndex) {
                return carouselRef.current?.goToSlide(activeIndex)
            }
            
            carouselRef.current?.next(activeIndex)
        }, 900);

        return ()=>{
            socket.off('current-event');
        }
    }, [carouselRef.current, eventData.valueEventForum])


    return <div className={style.carousel}>
        
        {eventData?.valueEventForum.schedule && eventData.valueEventForum.schedule.length > 0 && <Carousel
            ref={carouselRef}
            arrows
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
                return <ItemCarousel img={item.item.img} time={item.timerange} name={item.item.subtitle} description={item.item.text} title={item.item.title}  key={item.id} isActive={activeEventIndex == index}/>
            })}

        </Carousel>}

    </div>;
    
};

export default CarouselWidget;