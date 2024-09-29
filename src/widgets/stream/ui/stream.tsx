import { FC, useContext, useEffect, useState } from 'react';
import style from "./stream.module.scss"
import Chat from './chat/chat';
import { EventContext, EventForum } from '../../../shared/contexts/eventContext';
import classNames from 'classnames';
import { EStatusStream } from '../../../shared/types';


const Stream: FC = () => {
    const eventData = useContext(EventContext)

    const [statusStream, setStatusStream] = useState<EStatusStream>(EStatusStream.waiting)
    const [text, setText] = useState<string>('')

    useEffect(()=>{
        if (!eventData) return;

        const scheduleItem = eventData.valueEventForum.schedule.find((item)=>item.is_active)
        if (scheduleItem) {
            setText(scheduleItem?.item.title)
        }

        if(eventData.streamStatus) {
            setStatusStream(eventData.streamStatus);
            return
        }; 
       
        if (eventData.valueEventForum.is_running) return setStatusStream(EStatusStream.start);
        if (eventData.valueEventForum.is_ended) return setStatusStream(EStatusStream.stop);

        if (!eventData.valueEventForum.is_running && !eventData.valueEventForum.is_ended && eventData.valueEventForum.elapsed_time) return setStatusStream(EStatusStream.pause);

        if (!eventData.valueEventForum.is_running && !eventData.valueEventForum.is_ended && Number(eventData.valueEventForum.elapsed_time) == 0) return setStatusStream(EStatusStream.waiting);

    }, [eventData.valueEventForum, eventData.streamStatus])
    


    return <div className={style.stream}>
        <div className="container" style={{boxSizing: 'content-box'}}>
            <h3 className={style.title}>{eventData?.valueEventForum.title}</h3>
            <div className={style.stream__body}>
                <div className={style.video}>
                    <video controls>
                        {/* <source src="https://filesamples.com/samples/video/mp4/sample_960x540.mp4"/> */}
                        <source src={eventData?.valueEventForum.link}/>
                        <p>Ваш браузер не поддерживает видео</p>
                    </video>
                </div>
                <Chat/>
            </div>
            {eventData?.valueEventForum && <Indicator eventData={eventData?.valueEventForum} text={text} statusStream={statusStream}></Indicator>}
        </div>
    </div>;
};

export default Stream;


interface IPropsIndicator {
    eventData: EventForum;
    text: string;
    statusStream: EStatusStream
}

const Indicator: FC<IPropsIndicator> = ({text, statusStream}) => {

    switch(statusStream) {
        case EStatusStream.start: {
            return <h3 className={classNames(style.statusStream, style.green)}>Активная сессия: {text}</h3>
        }
        case EStatusStream.stop: {
            return <h3 className={classNames(style.statusStream, style.red)}>Трансляция закончена</h3>
        }
        case EStatusStream.waiting: {
            return <h3 className={classNames(style.statusStream)}>ТРАНСЛЯЦИЯ СКОРО НАЧНЕТСЯ</h3>
        }
        default: {
            return <h3 className={classNames(style.statusStream)}>ТРАНСЛЯЦИЯ ПРИОСТАНОВЛЕНА</h3>
        }

    }

};

export {Indicator};
