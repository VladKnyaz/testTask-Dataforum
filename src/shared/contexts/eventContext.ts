import { createContext } from "react";
import { EStatusStream } from "../types";

export interface EventForum {
    id: number;
    event_id: string;
    name: string;
    slag: string;
    link: string;
    start_timestamp: string;
    elapsed_time: string;
    is_running: boolean;
    is_ended: boolean;
    date: string;
    title: string;
    schedule: Schedule[];
}

export interface Schedule {
    id: number;
    item: Item;
    is_active: boolean;
    room_id: string;
    timerange: string[];
}

export interface Item {
    title: string;
    subtitle: string;
    text: string;
    img: string;
}

interface IProps {
    setValueEventForum: React.Dispatch<React.SetStateAction<EventForum>>;
    valueEventForum: EventForum;
    streamStatus: EStatusStream | null;
}

export const EventContext = createContext<IProps>({
    setValueEventForum: () => { },
    valueEventForum: {
        id: 0,
        event_id: "",
        name: "",
        slag: "",
        link: "",
        start_timestamp: "",
        elapsed_time: "",
        is_running: false,
        is_ended: false,
        date: "",
        title: "",
        schedule: []
    },
    streamStatus: EStatusStream.waiting
})