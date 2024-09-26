import axios, { Axios } from "axios";
import { EventForum } from "../contexts/eventContext";

const codeEvent = import.meta.env.VITE_CODE_EVENT ?? "AAAAA11";
const codeRoom = import.meta.env.VITE_CODE_ROOM ?? "avrora";
const srvURL = import.meta.env.VITE_BASE_URL ?? "https://test.wpdataforum.ru/";


class EventApi {
    private api: Axios;

    constructor(url: string) {
        this.api = new Axios({
            baseURL: url,
            withCredentials: false,
        });
    }

    public async getEvent() {
        return await this.api.get<string>(`/events/${codeEvent}/rooms/${codeRoom}`)
    }
}

export default new EventApi(srvURL);